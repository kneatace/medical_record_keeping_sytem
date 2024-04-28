// Part 1
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import scss from '@/styles/Tests.module.scss';


type Test = { // Define the Test type
    id: number;
    name: string;
    date: string;
};


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
}));



const Tests = () => {
    // Replace this with your actual data
    // Retrieve tests from local storage
    const [tests, setTests] = useState<Test[]>([]);

    const handleDelete = async (id: number) => {
        let storedTests = JSON.parse(localStorage.getItem('tests') || '[]');
        const testToDelete = storedTests.find((test: Test) => test.id === id);

        if (testToDelete) {
            const response = await fetch('/api/newtest/DeleteTest', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ testName: testToDelete.name }),
            });

            if (response.ok) {
                storedTests = storedTests.filter((test: Test) => test.id !== id);
                localStorage.setItem('tests', JSON.stringify(storedTests));
                setTests(storedTests);
            } else {
                console.error('Failed to delete test');
            }
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let storedTests = JSON.parse(localStorage.getItem('tests') || '[]');

            const directoriesToIgnore = ['createtest'];
            storedTests = storedTests.filter((test: Test) => !directoriesToIgnore.includes(test.name));

            setTests(storedTests);
        }
    }, []);


    return (
        <div className={scss.tests}>
            <h1>Tests</h1>
            <Button variant="outlined" href="/dashboard/tests/createtest" className={scss.createTestButton}>
                Create Test
            </Button>
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tests.map((test: Test) => (
                            <TableRow key={test.id} className={scss.testRow}>
                                <StyledTableCell>{test.id}</StyledTableCell>
                                <StyledTableCell>{test.name}</StyledTableCell>
                                <StyledTableCell>{test.date}</StyledTableCell>
                                <StyledTableCell>
                                    <Button variant="outlined" href={`/dashboard/tests/${test.name}`} className={scss.button}>
                                        Edit
                                    </Button>
                                    <Button variant="outlined" /*onClick={() => handleDelete(test.id)}*/ className={scss.button}>
                                        Delete
                                    </Button>
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Tests;