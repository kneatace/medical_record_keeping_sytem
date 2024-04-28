import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import scss from '@/styles/Lab.module.scss';

const Lab: React.FC = () => {
    const router = useRouter();

    const handleLabTestsClick = () => {
        router.push('/dashboard/lab/labtests');
    };

    const handleLabReportsClick = () => {
        router.push('/dashboard/lab/labreports');
    };

    return (
        <div className={scss.container}>
            <Card className={scss.card}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Lab Tests
                    </Typography>
                    <Button className={scss.button} onClick={handleLabTestsClick}>Go to Lab Tests</Button>
                </CardContent>
            </Card>
            <Card className={scss.card}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Lab Reports
                    </Typography>
                    <Button className={scss.button} onClick={handleLabReportsClick}>Go to Lab Reports</Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Lab;
