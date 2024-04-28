import * as React from "react";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/pages/api/database/firebase";
import { Box, Card, CardContent, Grid, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from "jspdf-autotable";
import scss from '@/styles/Patients.module.scss'

type DataType = {
    rows: Array<{ [key: string]: any }>;
    columns: Array<{ field: string; headerName: string; width: number }>;
} | null;



const patients = () => {
    const [data, setData] = useState<DataType>(null);
    const [currentImage, setCurrentImage] = useState<string | undefined>(undefined);
    const [modalOpen, setModalOpen] = useState(false);
    const [exportFormat, setExportFormat] = React.useState('xlsx');
    const [search, setSearch] = React.useState('');

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "patients"));
            const rows = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setData({ rows, columns: Object.keys(rows[0]).map((key) => ({ field: key, headerName: key, width: 150 })) });
        };

        fetchData();
    }, []);

    const handleExport = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (data) {
            const truncatedData = truncateLongFields(data.rows);
            const fileName = 'patients_data';

            switch (exportFormat) {
                case 'csv':
                    exportToCSV(truncatedData, fileName);
                    break;
                case 'xlsx':
                    exportToExcel(truncatedData, fileName);
                    break;
                case 'pdf':
                    exportToPDF(truncatedData, fileName);
                    break;
                default:
                    break;
            }
        }
    };

    // Export to CSV
    const exportToCSV = (csvData: Array<{ [key: string]: any }>, fileName: string) => {
        const fileType = 'text/csv;charset=utf-8;';
        const fileExtension = '.csv';

        const exportColumns = columns.filter(column => column.field !== 'image');
        const headers = exportColumns.map(column => column.field).join(',');
        const rows = csvData.map(obj => exportColumns.map(column => obj[column.field]).join(',')).join('\n');

        const csv = headers + '\n' + rows;
        const blob = new Blob([csv], { type: fileType });

        FileSaver.saveAs(blob, fileName + fileExtension);
    }

    // Export to Excel
    const exportToExcel = async (excelData: Array<{ [key: string]: any }>, fileName: string) => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('data');

        const exportColumns = columns.filter(column => column.field !== 'image');
        // Convert the data to an array of arrays
        const data = excelData.map(obj => exportColumns.map(column => obj[column.field]));
        // Add the headers to the start of the array
        data.unshift(exportColumns.map(column => column.headerName));

        worksheet.addRows(data);

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        FileSaver.saveAs(blob, fileName + '.xlsx');
    }

    // Export to PDF
    const exportToPDF = (pdfData: Array<{ [key: string]: any }>, fileName: string) => {
        const doc = new jsPDF();
        const exportColumns = columns.filter(column => column.field !== 'image');
        const headers = exportColumns.map(column => column.headerName);
        const data = pdfData.map(obj => exportColumns.map(column => obj[column.field]));
        autoTable(doc, { head: [headers], body: data });
        doc.save(fileName + '.pdf');
    }

    const truncateLongFields = (data: Array<{ [key: string]: any }>) => {
        return data.map(row => {
            const truncatedRow: { [key: string]: any } = {};
            for (const key in row) {
                if (typeof row[key] === 'string' && row[key].length > 32767) {
                    truncatedRow[key] = row[key].substring(0, 32767);
                } else {
                    truncatedRow[key] = row[key];
                }
            }
            return truncatedRow;
        });
    }


    const columns = [
        { field: 'patientId', headerName: 'Patient ID', width: 210 },
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerName: 'Last Name', width: 150 },
        { field: 'age', headerName: 'Age', width: 60 },
        { field: 'gender', headerName: 'Gender', width: 90 },
        { field: 'maritalstatus', headerName: 'Marital Status', width: 150 },
        { field: 'nationality', headerName: 'Nationality', width: 150 },
        { field: 'passportno', headerName: 'Passport No', width: 150 },
        { field: 'dateandplaceofissue', headerName: 'Date & Place Of Issue', width: 200 },
        { field: 'address', headerName: 'Address', width: 150 },
        { field: 'contact', headerName: 'Contact', width: 150 },
        { field: 'TypeOfExamination', headerName: 'Type Of Examination', width: 170 },
        { field: 'appliedcountry', headerName: 'Applied Country', width: 150 },
        { field: 'applieduniversity', headerName: 'Applied University', width: 150 },
        { field: 'appliedinsurance', headerName: 'Applied Insurance', width: 150 },
        {
            field: 'image',
            headerName: 'Image',
            width: 130,
            renderCell: (params: GridCellParams) => (
                <div>
                    <Button
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            event.preventDefault();
                            setModalOpen(true);
                            setCurrentImage(params.value as string);
                        }}
                    >
                        View Image
                    </Button>
                    <Modal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <Box sx={{ width: 400, height: 400, p: 4, my: 'auto', mx: 'auto', bgcolor: 'background.paper' }}>
                            <Typography id="simple-modal-title" variant="h6" component="h2">
                                Image
                            </Typography>
                            <img
                                src={currentImage}
                                alt=""
                                style={{ maxWidth: '100%', maxHeight: '100%', color: 'transparent' }}
                                onError={(e) => {
                                    console.error('Failed to load image: ', e);
                                    setCurrentImage('no-image-found-in-database');
                                }}
                            />
                        </Box>
                    </Modal>
                </div>
            ),
        },
    ];
    return (
        <Box className={scss.patients}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card className={scss.card}>
                        <CardContent className={scss.cardContent}>
                            <Typography variant="h5" component="div" className={scss.title}>
                                Patients List
                            </Typography>
                            <Typography color="text.secondary">
                                This list Contains every information collected from the patients who are registered in the system.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Button variant="contained" href={'/dashboard/patients/addpatient'}>Add Patients</Button>
                        </Grid>
                        <Grid item>
                            <Select
                                value={exportFormat}
                                onChange={(event) => setExportFormat(event.target.value)}
                            >
                                <MenuItem value={'csv'}>CSV</MenuItem>
                                <MenuItem value={'xlsx'}>Excel</MenuItem>
                                <MenuItem value={'pdf'}>PDF</MenuItem>
                            </Select>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleExport}
                                className={scss.exportButton}
                            >
                                Export
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <div className={scss.dataGrid}>
                        <DataGrid
                            slots={{
                                loadingOverlay: LinearProgress,
                            }}
                            loading={!data}
                            rows={data?.rows.filter((row) => row.firstName.includes(search) || row.patientId.includes(search) || row.passportno.includes(search)) || []}
                            columns={columns || []}
                            sortModel={[
                                {
                                    field: 'patientId',
                                    sort: 'desc',
                                }
                            ]}
                        />
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
}

export default patients;