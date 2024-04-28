import React, { useState, useEffect } from 'react';
import { DataGrid, GridValueGetterParams } from '@mui/x-data-grid';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/pages/api/database/firebase';
import { Button, CircularProgress } from '@mui/material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import scss from '@/styles/PatientsToday.module.scss';

type Patient = {
  id: string;
  patientId: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  TypeOfExamination: string;
  passportno: string;
};

const PatientsToday = () => {

  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to midnight

    // Create a new date for tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Format dates as 'dd/mm/yyyy'
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading 0 and slice last 2 digits
      const day = ('0' + date.getDate()).slice(-2); // Add leading 0 and slice last 2 digits
      return `${day}/${month}/${year}`;
    };


    const patientsRef = collection(db, 'patients');

    const fetchPatients = async () => {
      setIsLoading(true);
      const snapshot = await getDocs(patientsRef);
      const todayPatients = snapshot.docs.filter(doc => {
        const patientId = doc.data().patientId;
        const datePart = patientId.split('-')[1]; // Extract the date part from the patientId
        // Convert datePart to a Date object
        const [day, month, year] = datePart.split('/');
        const patientDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

        return patientDate >= today && patientDate < tomorrow;
      });
      setPatients(todayPatients.map(doc => {
        const patientData = doc.data();
        return {
          id: doc.id,
          patientId: patientData.patientId,
          firstName: patientData.firstName,
          lastName: patientData.lastName,
          age: patientData.age,
          gender: patientData.gender,
          TypeOfExamination: patientData.TypeOfExamination,
          passportno: patientData.passportno,
          appliedcountry: patientData.appliedcountry, // Add this line
          applieduniversity: patientData.applieduniversity, // Add this line
        };
      }));
      setIsLoading(false);
    };

    fetchPatients();
  }, []);

  const columns = [
    { field: 'patientId', headerName: 'Patient ID', width: 170 },
    {
      field: 'name',
      headerName: 'Patient Name',
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      width: 170,
    },
    { field: 'age', headerName: 'Age', width: 50 },
    { field: 'gender', headerName: 'Gender', width: 70 },
    { field: 'TypeOfExamination', headerName: 'Type of Examination', width: 150 },
    // { field: 'passportno', headerName: 'Passport No.', width: 150 },
  ];

  const exportToExcel = async () => {
    const filename = window.prompt('Enter today\'s date for record file');
    if (!filename || patients.length === 0) return; // If the user didn't enter a filename or if there are no patients, don't proceed

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Patients");

    worksheet.columns = [
      { header: 'Patient ID', key: 'patientId', width: 50 },
      { header: 'First Name', key: 'firstName', width: 50 },
      { header: 'Last Name', key: 'lastName', width: 50 },
      { header: 'Age', key: 'age', width: 5 },
      { header: 'Gender', key: 'gender', width: 15 },
      { header: 'Type of Examination', key: 'TypeOfExamination', width: 150 },
      { header: 'Passport No.', key: 'passportno', width: 50 },
      { header: 'Applied Country', key: 'appliedcountry', width: 50 },
      { header: 'Applied University/College', key: 'applieduniversity', width: 50 },
    ];

    patients.forEach(patient => {
      worksheet.addRow(patient);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, `${filename}.xlsx`);
  };

  const exportToPdf = () => {
    const filename = window.prompt('Enter the filename for the PDF file');
    if (!filename || patients.length === 0) return; // If the user didn't enter a filename or if there are no patients, don't proceed

    const doc = new jsPDF();
    autoTable(doc, { head: [Object.keys(patients[0])], body: patients.map(Object.values) });
    doc.save(`${filename}.pdf`);
  };

  return (
    <div className={scss.container}>
      <Button className={scss.button} onClick={exportToExcel}>Export to Excel</Button>
      <Button className={scss.button} onClick={exportToPdf}>Export to PDF</Button>
      {isLoading ? (
        <CircularProgress
          className={scss.loading}
          color="secondary"
        />
      ) : (
        <DataGrid
          rows={patients}
          columns={columns}
        />
      )}
    </div>
  );
}


export default PatientsToday;
