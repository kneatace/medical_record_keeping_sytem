
import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Select, MenuItem } from '@mui/material';

import scss from '@/styles/CreateReport.module.scss';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/pages/api/database/firebase';
import { useRouter } from 'next/router';

type Patient = {
    patientId: string;
    firstName: string;
    lastName: string;
    fullName: string;
};

const CreateReport: React.FC = () => {

    const [patients, setPatients] = useState<{ patientId: string; id: string; firstName: string; lastName: string; fullName: string; selectLabTest: string; }[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<{ patientId: string; firstName: string; lastName: string; fullName: string; selectLabTest: string; } | undefined>();
    const [tests, setTests] = useState<{ id: string; selectLabTest: string; }[]>([]);
    const [selectedTest, setSelectedTest] = useState<{ id: string; selectLabTest: string; } | undefined>();
    const router = useRouter();

    useEffect(() => {
        if (router.query.patientId) {
            setSelectedPatient(patients.find(patient => patient.patientId === router.query.patientId));
        }
    }, [router.query.patientId, patients]);

    useEffect(() => {
        const fetchPatients = async () => {
            const querySnapshot = await getDocs(collection(db, "patients"));
            const patients = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    patientId: data.patientId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    fullName: `${data.firstName} ${data.lastName}`,
                    selectLabTest: data.selectLabTest,
                };
            });
            setPatients(patients);
        };

        const fetchTests = async () => {
            const querySnapshot = await getDocs(collection(db, "labtests"));
            const tests = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    selectLabTest: data.name,
                };
            });
            setTests(tests);
        };

        fetchTests();

        fetchPatients();
    }, []);
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Handle form submission logic here

        if (!selectedPatient || !tests) {
            // Handle the case where selectedPatient or test is undefined
            //console.log("Please select a patient and a test");
            return;
        }
        if (!selectedPatient || !selectedTest) {
            // Handle the case where selectedPatient or selectedTest is undefined
            //console.log("Please select a patient and a test");
            return;
        }

        // Create a new document in the 'reports' collection
        const docRef = await addDoc(collection(db, "labreports"), {
            patientId: selectedPatient.patientId,
            patientName: selectedPatient.fullName,
            selectLabTest: selectedTest.selectLabTest,
            // Add any other form fields here
        });

        console.log("Document written with ID: ", docRef.id);
        router.push('/dashboard/lab/labtests');

    };

    return (
        <Container className={scss.container}>
            <Typography variant="h4" component="h1" gutterBottom>
                Check Lab Details
            </Typography>
            <form className={scss.form} onSubmit={handleSubmit}>
                <TextField
                    value={selectedPatient?.fullName || ''}
                    disabled
                />
                <Select
                    value={selectedTest?.id}
                    onChange={(event) => {
                        const selectedId = event.target.value;
                        const selected = patients.find((test: { id: string; selectLabTest: string; }) => test.id === selectedId);
                        setSelectedTest(selected);
                    }}
                    required
                >
                    {patients.map((test: { id: string; selectLabTest: string; }) => (
                        <MenuItem key={test.id} value={test.id}>
                            {test.selectLabTest}
                        </MenuItem>
                    ))}
                </Select>
                <Button
                    className={scss.submitButton}
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default CreateReport;
