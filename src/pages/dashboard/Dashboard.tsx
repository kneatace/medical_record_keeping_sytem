// Part 1
import React from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import DataRibbon from '@/components/dashboard/dataribbon/DataRibbon';
import TransactionsPerDay from '@/components/dashboard/transactionperday';
import PatientsToday from '@/components/dashboard/patientstoday/PatientsToday';
import TransactionDoughnut from '@/components/dashboard/transactiondoughnut';
import TotalPatientsThisWeek from '@/components/dashboard/totalpatientsthisweek';
import TotalPatientsThisMonth from '@/components/dashboard/totalpatientsthismonth';
import ListOfAgents from '@/components/dashboard/listofagents';
import ListOfPatientsToday from '@/components/dashboard/listofpatientstoday';
import scss from '@/styles/Dashboard.module.scss';


const cardData = [
    { title: 'Patients Today', component: <PatientsToday /> },
    { title: 'Transactions Per Day', component: <TransactionsPerDay /> },
    { title: 'Data Ribbon', component: <DataRibbon /> },
    { title: 'Transaction Doughnut', component: <TransactionDoughnut /> },
    { title: 'Total Patients This Week', component: <TotalPatientsThisWeek /> },
    { title: 'Total Patients This Month', component: <TotalPatientsThisMonth /> },
    { title: 'List Of Agents', component: <ListOfAgents /> },
    { title: 'List Of Patients Today', component: <ListOfPatientsToday /> },
  ];
  
  const Dashboard = () => {
    return (
      <Box className={scss.dashboardContainer}>
        <Grid container spacing={1} marginTop={2}>
          {cardData.map((data, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Card className={scss.card}>
                <CardContent className={scss.cardContent}>
                  <Typography variant="h5" component="div" className={scss.title}>
                    {data.title}
                  </Typography>
                  {data.component}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

export default Dashboard;