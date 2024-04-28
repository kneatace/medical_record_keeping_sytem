import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Transaction {
    id: number;
    amount: number;
    date: Date;
    patient: string;
}

const TransactionHistory: React.FC = () => {
    const transactions: Transaction[] = [
        { id: 1, amount: 100, date: new Date(), patient: 'John Doe' },
        { id: 2, amount: 200, date: new Date(), patient: 'Jane Smith' },
        { id: 3, amount: 300, date: new Date(), patient: 'Mike Johnson' },
    ];

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Transaction ID', width: 150 },
        { field: 'amount', headerName: 'Amount', width: 150 },
        { field: 'date', headerName: 'Date', width: 200 },
        { field: 'patient', headerName: 'Patient', width: 200 },
    ];

    const rows = transactions.map((transaction) => ({
        id: transaction.id,
        amount: transaction.amount,
        date: transaction.date.toISOString(),
        patient: transaction.patient,
    }));

    return (
        <div style={{ height: 400, width: '100%' }}>
            <h1>Transaction History</h1>
            <DataGrid rows={rows} columns={columns} />
        </div>
    );
};

export default TransactionHistory;
