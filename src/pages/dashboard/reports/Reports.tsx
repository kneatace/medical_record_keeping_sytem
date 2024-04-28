import { db } from '@/pages/api/database/firebase';
import { Divider, Grid, LinearProgress, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { DocumentData, collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import scss from "@/styles/Reports.module.scss"

type DataType = {
    rows: Array<{ [key: string]: any }>;
    columns: Array<{ field: string; headerName: string; width: number }>;
} | null;
type PatientData = {
    patientId: string;
    testName: string;
    // Add other properties here
};
const patients: { patientId: string; reportGenerated: boolean; testName: string }[] = [];
const Reports = () => {

    interface Patient {
        patientId: string;
        // Add other properties of the patient here
    }
    const [data, setData] = useState<DataType>(null);
    const [combinedData, setCombinedData] = useState<PatientData[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [reports, setReports] = useState<DocumentData[]>([]);
    const [generatedPatients, setGeneratedPatients] = useState<DocumentData[]>([]);
    const [search, setSearch] = useState('');
    const [search2, setSearch2] = useState('');
    const Router = useRouter();
    const createReport = (patientId: string) => {
        console.log(`Creating report for patient ID: ${patientId}`);
        // Add your report creation code here
        // Redirect the user
        Router.replace({
            pathname: '/dashboard/reports/createreport',
            query: { patientId },
        });
    };
    const generateReport = async (patientId: string, testName: string) => {
        console.log(`Generating report for patient ID: ${patientId}`);
        //console.log('Combined data:', combinedData);
        // Add your report generation code here
        // Find the patient data
        const patientData = combinedData.find(data => data.patientId === patientId);
        //console.log('Patient data:', patientData);

        // Redirect the user
        if (patientData) {
            await Router.replace({
                pathname: `/dashboard/tests/${patientData.testName}`,
                query: { patientId, testName },
            });

        } else {
            console.error('Patient data or testName is not available');
        }
    };

    const editReport = (patientId: string) => {
        console.log(`Editing report for patient ID: ${patientId}`);
        // Add your report editing code here
    };

    const printReport = async (patientId: string, testName: string) => {
        console.log(`Printing report for patient ID: ${patientId}`);
        // Add your report printing code here
        // Find the patient data
        const patientData = combinedData.find(data => data.patientId === patientId);

        //console.log('Patient data:', patientData);

        // Redirect the user
        if (patientData) {
            await Router.replace({
                pathname: `/dashboard/reports/printreport/${patientData.testName}`,
                query: { patientId, testName },
            });

        } else {
            console.error('Patient data or testName is not available');
        }
    };

    const GenerateReportCell = (params: GridCellParams) => {
        const [reportState, setReportState] = useState<'initial' | 'created' | 'generated'>('initial');

        useEffect(() => {
            const fetchGeneratedReports = async () => {
                const q = query(collection(db, "generatedreports"), where("patientId", "==", params.row.patientId));
                const querySnapshot = await getDocs(q);
                const reports = querySnapshot.docs.map(doc => doc.data());
                if (reports.length > 0) {
                    setReportState('generated');
                } else {
                    const q = query(collection(db, "reports"), where("patientId", "==", params.row.patientId));
                    const querySnapshot = await getDocs(q);
                    const reports = querySnapshot.docs.map(doc => doc.data());
                    if (reports.length > 0) {
                        setReportState('created');
                    }
                }
            };

            fetchGeneratedReports();
        }, [params.row.patientId]);

        return (
            //console.log(params.row),
            selectedPatient && params.row.patientId !== selectedPatient.patientId
                ? (console.error("The patientId in the row doesn't match the selected patient's ID"), null)
                : (
                    <div>
                        {reportState == 'initial' && (
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    createReport(params.row.patientId);
                                    setReportState('created');
                                }}
                            >
                                Create Report
                            </Button>
                        )}
                        {reportState == 'created' && (
                            <Button
                                variant="outlined"
                                onClick={async () => {
                                    await generateReport(params.row.patientId, params.row.testName);
                                    setReportState('generated');
                                }}
                            >
                                Generate Report
                            </Button>
                        )}
                        {reportState == 'generated' && (
                            <>
                                <Button variant="outlined" onClick={() => editReport(params.row.patientId)}>
                                    Edit Report
                                </Button>
                                <Button variant="outlined" onClick={() => printReport(params.row.patientId, params.row.testName)}>
                                    Print Report
                                </Button>
                            </>
                        )}
                    </div>
                )
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            const q3 = query(collection(db, "patients"));


            const snapshot3 = await getDocs(q3);


            const patientSnapshot = [...snapshot3.docs];
            const reportSnapshot = await getDocs(collection(db, "reports"));

            const patientData = Array.from(patientSnapshot.reduce((map, doc) => {
                const data = doc.data();
                    map.set(doc.id, {
                        id: doc.id,
                        patientId: data.patientId,
                        TypeOfExamination: data.TypeOfExamination,
                        ...data,
                        fullName: `${data.firstName} ${data.lastName}`
                    });
                return map;
            }, new Map()).values());


            const reportData = reportSnapshot.docs.map((doc) => doc.data());

            const combinedData = patientData.map((patient) => {
                const report = reportData.find((report) => report.patientId == patient.patientId || report.patientId == patient.id);
                return {
                    id: patient.id, // This is the document ID from the 'patients' collection
                    patientId: patient?.patientId, // Use patient.patientId instead of patient.id
                    patientName: report?.patientName,
                    testName: report?.testName,
                    TypeOfExamination: patient?.TypeOfExamination,
                    reportGenerated: false, // Add this line

                };
            });

            setData({
                rows: combinedData,
                columns: Object.keys(combinedData[0]).map((key) => ({ field: key, headerName: key, width: 150 }))
            });

            return combinedData; // Add this line

        };

        fetchData().then(patientData => {
            setCombinedData(patientData);
        });
    }, []);
    useEffect(() => {
        if (combinedData.length > 0) {
            setData(prevData => {
                if (prevData) {
                    return {
                        ...prevData,
                        columns: [
                            ...prevData.columns,
                            ...Object.keys(combinedData[0]).map((key) => ({ field: key, headerName: key, width: 150 })),
                        ],
                        rows: prevData.rows || [], // Ensure rows is always an array
                    };
                }
                return prevData;
            });
        }
    }, [combinedData]); // This effect runs whenever combinedData changes


    const columns = [
        // Define your columns here. For example:
        { field: 'patientId', headerName: 'Patient ID', width: 250 },
        { field: 'patientName', headerName: 'Patient Name', width: 250 },
        { field: 'TypeOfExamination', headerName: 'Type Of Examination', width: 300 },
        { field: 'testName', headerName: 'Test Name', width: 300 },
        {
            field: 'generateReport',
            headerName: 'Generate Report',
            width: 350,
            renderCell: (params: GridCellParams) => <GenerateReportCell {...params} />
        }
    ];



    return (
        <div className={scss.container} >
            <h1 className={scss.title}>Reports</h1>
            <h2 className={scss.subtitle}>Foreign Employment Medical Reports</h2>
            <Grid container direction="column" spacing={2}>

                <Grid item className={scss.searcgField}>
                    <TextField
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search by Patient Name or ID"
                    />
                </Grid>
            </Grid>
            <div className={scss.dataGrid}>
                <DataGrid
                    slots={{
                        loadingOverlay: LinearProgress,
                    }}
                    loading={!data}
                    rows={data?.rows.filter((row) =>
                        ((row.patientName ? row.patientName.includes(search) : false) ||
                        (row.patientId ? row.patientId.includes(search) : false)) &&
                        (row.TypeOfExamination == undefined || row.TypeOfExamination == 'Foreign Employment Medical Test' || row.TypeOfExamination == null)
                    ) || []}
                    columns={columns || []}
                    sortModel={[
                        {
                            field: 'patientId',
                            sort: 'desc',
                        }
                    ]}
                />
            </div>
            <Divider style={{ margin: '20px 0' }} />

            <h2 className={scss.subtitle}>Normal Medical Reports</h2>
            <Grid container direction="column" spacing={2}>

                <Grid item className={scss.searcgField}>
                    <TextField
                        value={search2}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search by Patient Name or ID"
                    />
                </Grid>
            </Grid>
            <div className={scss.dataGrid}>
                <DataGrid
                    slots={{
                        loadingOverlay: LinearProgress,
                    }}
                    loading={!data}
                    rows={data?.rows.filter((row) =>
                        ((row.patientName ? row.patientName.includes(search2) : false) ||
                        (row.patientId ? row.patientId.includes(search2) : false)) &&
                        (row.TypeOfExamination == 'Normal Medical Test')
                    ) || []}
                    columns={columns || []}
                    sortModel={[
                        {
                            field: 'patientId',
                            sort: 'desc',
                        }
                    ]}
                />
            </div>
        </div>
    )
}

export default Reports;

