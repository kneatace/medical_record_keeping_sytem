import React, { useState, useEffect } from 'react';
import scss from '@/styles/foreign_employment_medical_test.module.scss' // Import the module.scss file
import { db } from '@/pages/api/database/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import 'firebase/firestore';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import QRCode from 'qrcode';

const foreign_employment_medical_test: React.FC = () => {
  // Define your state variables here
  const [reports, setReports] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  const finaltext = "Format Recommended by Ministry of Health and Population, Government of Nepal";



  /*const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;


  };*/

  const router = useRouter();
  const { patientId, testName } = router.query;

  const printReport = async () => {
    if (typeof window !== 'undefined') {
      const printableContent = document.getElementById('printableContent');
      if (printableContent) {

        const data = {
          reports: reports.map(report => ({
            govRegNo: '111111111',
            'Medical Centre Pvt. Ltd.':'Kathmandu, Nepal-44600', '+977-9777777, +977-9777777': 'helloworld@gmail.com', 'healthsyno.com': '',
            medicalExaminationReport: report.ClinicalImpression,
          })),
          patients: patients.map(patient => ({
            patientId: patientId,
            name: patient.firstName + " " + patient.lastName,
            sex: patient.gender,
            passportNo: patient.passportno,
            nationality: patient.nationality,
            // Add any other data you need
          })),
        };

        // Convert data to JSON
        const jsonData = JSON.stringify(data);

        // Generate QR code
        const qrCodeUrl = await QRCode.toDataURL(jsonData, { errorCorrectionLevel: 'H', scale: 12, version: 23 });

        // Set QR code URL state
        setQrCodeUrl(qrCodeUrl);

        domtoimage.toPng(printableContent)
          .then(function (dataUrl) {
            const img = new Image();
            img.src = dataUrl;
            img.onload = function () {
              const pdf = new jsPDF('p', 'mm', 'a4');
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = pdf.internal.pageSize.getHeight();
              const widthScaleFactor = pdfWidth / img.width;
              const heightScaleFactor = pdfHeight / img.height;
              const imageWidth = img.width * widthScaleFactor; // Width is scaled separately
              const imageHeight = img.height * heightScaleFactor; // Height is scaled separately
              pdf.addImage(dataUrl, 'PNG', 0, 0, imageWidth, imageHeight); // Image starts at the top left corner (0,0)
              if (patients[0]) {
                const { firstName, lastName } = patients[0];
                pdf.save(`${patientId}_${firstName}_${lastName}.pdf`);

                // Convert the PDF to a Blob
                const pdfBlob = pdf.output('blob');

                // Create an object URL from the Blob
                const pdfUrl = URL.createObjectURL(pdfBlob);

                // Create an iframe
                const iframe = document.createElement('iframe');

                // Set the iframe's src to the PDF URL
                iframe.src = pdfUrl;

                // Append the iframe to the body
                document.body.appendChild(iframe);

                // Wait for the iframe to load
                iframe.onload = function () {
                  // Check if contentWindow is not null
                  if (iframe.contentWindow) {
                    // Print the PDF
                    iframe.contentWindow.print();

                    // Remove the iframe after printing
                    iframe.contentWindow.onafterprint = function () {
                      document.body.removeChild(iframe);
                    };

                    // Redirect to /dashboard/reports
                    router.push('/dashboard/reports');
                  } else {
                    console.error('Failed to access iframe contentWindow');
                  }
                };
              } else {
                console.error('Patient data not found');
              }
            };
          })
          .catch(function (error) {
            console.error('Error generating image', error);
          });
      } else {
        console.error('Element with id "printableContent" not found');
      }
    }
  }

  const fetchData = async () => {
    const generatedReportsQuery = query(
      collection(db, "generatedreports"),
      where("patientId", "==", patientId),
      where("testName", "==", testName)
    );

    const patientsQuery = query(
      collection(db, "patients"),
      where("patientId", "==", patientId)
    );

    const generatedReportsSnapshot = await getDocs(generatedReportsQuery);
    const patientsSnapshot = await getDocs(patientsQuery);

    const generatedReportsData = generatedReportsSnapshot.docs.map(doc => doc.data());
    const patientsData = patientsSnapshot.docs.map(doc => doc.data());

    setReports(generatedReportsData);
    setPatients(patientsData);
  };

  useEffect(() => {
    if (patientId && testName) {
      fetchData();
    }
  }, [patientId, testName]);

  return (
    //save button
    <>
      <Button variant="outlined" color="primary" onClick={printReport} >
        Print
      </Button>
      <div id="printableContent">
        {reports.map((report, index) => (
          <div className={scss.borderedboxreport} key={index}>
            <div className={scss.topRight} style={{ whiteSpace: 'nowrap' }}>
              Gov.Reg.No:&nbsp;11111111
            </div>
            <div className={scss.centerText}>
              <h3 style={{ marginBottom: '0.5em' }}>Medical Centre Pvt.Ltd.</h3>
              <h6 style={{ marginTop: '0.5em', marginBottom: '0.5em' }}>KTM, Nepal-44600, Ph:+977-977777777, +977-977777777</h6>
              <h6 style={{ marginTop: '0.5em' }}>Email: helloworld@gmail.com , Website: healthsyno.com</h6>
            </div>
            <div className={scss.absoluteLeftSNo} style={{ whiteSpace: 'nowrap' }}>
              S.NO:&nbsp;{report.randomNumber}
            </div>
            <div className={scss.center}>
              <div className={scss.centerBoldBordered}>
                MEDICAL EXAMINATION REPORT
              </div>
            </div>
            {patients.map((patient, index) => (
              <div key={index}>
                <div className={scss.absoluteLeftPatientId} style={{ whiteSpace: 'nowrap' }}>Patient ID:&nbsp;{patientId}</div>
                <div className={scss.center}><div className={scss.centerBoldBordered2}>{(report.ClinicalImpression).toUpperCase()}</div></div>
                <table className={scss.tableStyle}>
                  <tbody>
                    <tr className={scss.tableRow}>
                      <td>Name:</td><td style={{ whiteSpace: 'nowrap' }}><strong>{patient.firstName.toUpperCase() + " " + patient.lastName.toUpperCase()}</strong></td>
                      <td>Age:</td><td><strong>{patient.age}</strong></td>
                      <td>Sex:</td><td><strong>{(patient.gender).toUpperCase()}</strong></td>

                    </tr>
                    <tr className={scss.tableRow}>
                      <td>Marital Status:</td><td>{(patient.maritalstatus).toUpperCase()}</td>
                      <td>Passport No:</td><td>{(patient.passportno).toUpperCase()}</td>
                      <td>Place & Date of issue:</td><td>{(patient.dateandplaceofissue).toUpperCase()}</td>
                    </tr>
                    <tr className={scss.tableRow}>
                      <td>Nationality:</td><td>{(patient.nationality).toUpperCase()}</td>
                      <td>Applied Country:</td><td>{(patient.appliedcountry).toUpperCase()}</td>
                      <td></td>
                    </tr>
                    <tr className={scss.tableRow}>
                      <td>Recruit Agency:</td><td>-</td>
                      <td>Medical Examination Date:</td><td>{report.medicalDate}</td>
                    </tr>
                  </tbody>
                </table>
                <div className={scss.centerBoldBordered}>
                  GENERAL EXAMINATION
                </div>
                <p><strong>Past history of serious illness, Major surgery, significant psychological problem including (Epilepsy and Depression):</strong>&nbsp;{report.patientHistory}</p>
                <p><strong>Past history of allergy:</strong>&nbsp;{report.patientAllergy}</p>
                <table className={scss.tableStylea}>
                  <tbody>
                    <tr className={scss.tableRow}>
                      <td>Height:</td><td>{report.Height}&nbsp;cm</td>
                      <td>Weight:</td><td>{report.Weight}&nbsp;KG</td>
                      <td>Pulse:</td><td>{report.Pulse}&nbsp;/MIN</td>
                      <td>Temperature:</td><td>{report.Temperature}&nbsp;&deg;F</td>
                    </tr>
                    <tr className={scss.tableRow}>
                      <td>BP:</td><td>{report.BP}&nbsp;mm/Hg</td>
                      <td>Jaundice:</td>
                      <td>
                        {report.Jaundice}
                      </td>
                      <td>Pallor:</td>
                      <td>
                        {report.Pallor}
                      </td>
                      <td>Cyanosis:</td>
                      <td>
                        {report.Cyanosis}
                      </td>
                    </tr>
                    <tr className={scss.tableRow}>
                      <td>Clubbing:</td>
                      <td>
                        {report.Clubbing}
                      </td>
                      <td>Oedema:</td>
                      <td>
                        {report.Oedema}
                      </td>
                      <td>Ascites:</td>
                      <td>
                        {report.Ascites}
                      </td>
                      <td>Lymph Node:</td>
                      <td>
                        {report.LymphNode}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className={scss.flexContainera}>
                  <div className={scss.centerBoldBordered}>
                    SYSTEMIC EXAMINATION
                  </div>
                  <div className={`${scss.centerBoldBordered} ${scss.alignRight} ${scss.marginLeft} ${scss.pushRight}`}>
                    LABORATORY EXAMINATION
                  </div>
                </div>
                <div className={scss.flexContainer}>
                  {/* Table1 */}
                  <table className={scss.tableStyle2}>
                    <thead>
                      <tr className={scss.tableRow}>
                        <th className={scss.columnLength}>Type of Medical Examination</th>
                        <th className={scss.columnLength2}>Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Rows of the first table */}
                      <tr>
                        <td>Cardiovascular</td>
                        <td>
                          {report.Cardiovascular}
                        </td>
                      </tr>
                      <tr>
                        <td>Pulmonary</td>
                        <td>
                          {report.Pulmonary}
                        </td>
                      </tr>
                      <tr>
                        <td>Gastroenterology</td>
                        <td>
                          {report.Gastroenterology}
                        </td>
                      </tr>
                      <tr>
                        <td>Neurology</td>
                        <td>
                          {report.Neurology}
                        </td>
                      </tr>
                      <tr>
                        <td>Musculoskeletal</td>
                        <td>
                          {report.Musculoskeletal}
                        </td>
                      </tr>
                      <tr>
                        <td>Genitourinary</td>
                        <td>
                          {report.Genitourinary}
                        </td>
                      </tr>
                      <tr>
                        <td>Oro-Dental</td>
                        <td>
                          {report.OroDental}
                        </td>
                      </tr>
                      <tr>
                        <td>Extermities/Deformities</td>
                        <td>
                          {report.ExtermitiesDeformities}
                        </td>
                      </tr>
                      <tr>
                        <td>Varicose Veins</td>
                        <td>
                          {report.VaricoseVeins}
                        </td>
                      </tr>
                      <tr>
                        <td>Hernia</td>
                        <td>
                          {report.Hernia}
                        </td>
                      </tr>
                      <tr>
                        <td>Hydrocele</td>
                        <td>
                          {report.Hydrocele}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>Eye(vision)</td>
                      </tr>
                      <tr>
                        <td className={scss.alignRight}>Left Eye</td>
                        <td>
                          {report.LeftEye}
                        </td>
                      </tr>
                      <tr>
                        <td className={scss.alignRight}>Right Eye</td>
                        <td>
                          {report.RightEye}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>Ear</td>

                      </tr>
                      <tr>
                        <td className={scss.alignRight}>Left Ear</td>
                        <td>
                          {report.LeftEar}
                        </td>
                      </tr>
                      <tr>
                        <td className={scss.alignRight}>Right Ear</td>
                        <td>
                          {report.RightEar}
                        </td>
                      </tr>
                      <tr>
                        <td>Radiological (chest X-Ray)</td>
                        <td>
                          {report.Radiological}
                        </td>
                      </tr>
                      <tr>
                        <td>Clinical impression</td>
                        <td>
                          {report.ClinicalImpression}
                        </td>
                      </tr>
                      <tr>
                        <td>Others</td>
                        <td>
                          {report.Others}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={2}>
                          <p>Dear sir/Ma'am,<br />The Above Mentioned Medical Report of <strong>{patient.firstName} {patient.lastName}</strong> is <strong>{report.ClinicalImpression ? report.ClinicalImpression.toUpperCase() : ''}</strong> for the mentioned job.</p>
                        </td>
                      </tr>
                    </tfoot>
                  </table>



                  {/* Table2 */}

                  <table className={scss.tableStyle2}>
                    <thead>
                      <tr className={scss.tableRow}>
                        <th>

                        </th>
                        <th className={scss.columnLength3}>Blood Examination</th>
                        <th className={scss.columnLength4}>Result</th>
                        <th className={scss.columnLength5}>Reference Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Rows of the second table */}
                      <tr>
                        <td className={scss.verticalHeader} rowSpan={11}>
                          Hematology
                        </td>
                        <td>Total WBC Count</td>
                        <td>{report.WBC}</td>
                        <td>4000-11000</td>
                      </tr>
                      <tr>

                        <td>Differential Count</td>

                      </tr>
                      <tr>

                        <td>Neutrophilis</td>
                        <td>{report.Neutrophilis}</td>
                        <td>45-74%</td>
                      </tr>
                      <tr>

                        <td>Lymphocytes</td>
                        <td>{report.Lymphocytes}</td>
                        <td>25-40%</td>
                      </tr>
                      <tr>

                        <td>Eosinophils</td>
                        <td>{report.Eosinophils}</td>
                        <td>1-6%</td>
                      </tr>
                      <tr>

                        <td>Monocytes</td>
                        <td>{report.Monocytes}</td>
                        <td>0-8%</td>
                      </tr>
                      <tr>

                        <td>Basophils</td>
                        <td>{report.Basophils}</td>
                        <td>0-3%</td>
                      </tr>
                      <tr>

                        <td>ESR</td>
                        <td>{report.ESR}</td>
                        <td>M&lt;10, F&lt;20</td>
                      </tr>
                      <tr>

                        <td>Hemoglobin</td>
                        <td>{report.Hemoglobin}</td>
                        <td>M: 12-17gm%, F: 11-14gm%</td>
                      </tr>
                      <tr>

                        <td>Malaria Parasite</td>
                        <td>
                          {report.MalariaParasite}
                        </td>
                        <td></td>
                      </tr>
                      <tr>

                        <td>Micro Filaria</td>
                        <td>
                          {report.MicroFilaria}
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={scss.verticalHeader} rowSpan={6}>
                          Biochemistry
                        </td>
                        <td>Random Blood Sugar</td>
                        <td>{report.RandomBloodSugar}</td>
                        <td>80-120 mg%</td>
                      </tr>
                      <tr>

                        <td>Urea</td>
                        <td>{report.Urea}</td>
                        <td>20-45 mg%</td>
                      </tr>
                      <tr>

                        <td>Creatinine</td>
                        <td>{report.Creatinine}</td>
                        <td>0.4-1.4 mg%</td>
                      </tr>
                      <tr>

                        <td>Bilrubin(Total/Direct)</td>
                        <td>{report.Bilrubin}</td>
                        <td>0.4-1 mg%</td>
                      </tr>
                      <tr>
                        <td>SGOT</td>
                        <td>{report.SGOT}</td>
                        <td>5-37 U/L</td>
                      </tr>
                      <tr>
                        <td>SGPT</td>
                        <td>{report.SGPT}</td>
                        <td>3-45 U/L</td>
                      </tr>
                      <tr>
                        <td className={scss.verticalHeader} rowSpan={6}>
                          Serology
                        </td>
                        <td>Anti-HIV(1&2)</td>
                        <td>
                          {report.AntiHIV}
                        </td>
                      </tr>
                      <tr>
                        <td>HBs-Ag</td>
                        <td>
                          {report.HBsAg}
                        </td>
                      </tr>
                      <tr>
                        <td>Anti-HCV</td>
                        <td>
                          {report.AntiHCV}
                        </td>
                      </tr>
                      <tr>
                        <td>VDRL/RPR</td>
                        <td>
                          {report.VDRLRPR}
                        </td>
                      </tr>
                      <tr>
                        <td>TPHA</td>
                        <td>
                          {report.TPHA}
                        </td>
                      </tr>
                      <tr>
                        <td>Blood Group(ABO/Rh)</td>
                        <td>
                          {report.BloodGroup}
                        </td>
                      </tr>
                      <tr>
                        <td className={scss.verticalHeader} rowSpan={4}>
                          Urine
                        </td>
                        <td>RBC</td>
                        <td>
                          {report.RBC}
                        </td>
                      </tr>
                      <tr>
                        <td>Pus Cells</td>
                        <td>
                          {report.PusCells}
                        </td>
                      </tr>
                      <tr>
                        <td>Epithelial Cells</td>
                        <td>
                          {report.EpithelialCells}
                        </td>
                      </tr>
                      <tr>
                        <td>Pregnancy Test(if female)</td>
                        <td>
                          {report.PregnancyTest}
                        </td>
                      </tr>
                      <tr>
                        <td>Others</td>
                        <td>Eg. Opiates</td>
                        <td>
                          {report.EgOpiates}
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Cannabies</td>
                        <td>
                          {report.Cannabies}
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Mantoux Test</td>
                        <td>
                          {report.MantouxTest}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <img src={patient.image} alt="Patient_Image" className={scss.patientImage} />
              </div>
            ))}
            <div className={scss.flexContainer3}>
              <div>
                <p className={scss.alignRight}>..............................</p>
                <p className={scss.alignRight}>Physician Signature</p>
              </div>
              <img src={qrCodeUrl} alt="QR Code" className={scss.qrcode} />

              <div className={scss.centerText2}>This Report is Valid for 2 months from the date of Medical Examination.<br />{finaltext}</div>
              <div>
                <p className={scss.alignLeft}>...............................</p>
                <p className={scss.alignLeft}>Authorized Signature</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default foreign_employment_medical_test;