
import { db } from '@/pages/api/database/firebase';
import { Button, LinearProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import scss from '@/styles/Agents.module.scss'

type DataType = {
  rows: Array<{ [key: string]: any }>;
  columns: Array<{ field: string; headerName: string; width: number }>;
} | null;

const Agents = () => {

  const [data, setData] = useState<DataType>(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "agents"));
      const rows = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData({ rows, columns: Object.keys(rows[0]).map((key) => ({ field: key, headerName: key, width: 150 })) });
    };

    fetchData();
  }, []);

const columns = [
  { field: 'agentName', headerName: 'Agent Name', width: 300 },
  { field: 'agentEmail', headerName: 'Agent Email', width: 250 },
  { field: 'agentContactNo', headerName: 'Agent Contact No.', width: 250 },
  { field: 'agentAddress', headerName: 'Agent Address', width: 250 },
];

  return (
    <div className={scss.container}>
      <Button variant="outlined" color="primary" onClick={() => window.location.href = "/dashboard/agents/createagent"} className={scss.createButton}>
        Create Agent
      </Button>
      <h1 className={scss.title}>Agents</h1>
      <div className={scss.dataGridContainer}>
        <DataGrid
          slots={{
            loadingOverlay: LinearProgress,
          }}
          loading={!data}
          rows={data?.rows || []}
          columns={columns || []}
        />
      </div>
    </div>
  );
};

export default Agents;
