import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import router from 'next/router';
import { db } from '@/pages/api/database/firebase';
import { addDoc, collection } from 'firebase/firestore';
import scss from '@/styles/CreateAgent.module.scss';

const CreateAgent = () => {
  const [agentName, setAgentName] = useState('');
  const [agentEmail, setAgentEmail] = useState('');
  const [agentContactNo, setAgentContactNo] = useState('');
  const [agentAddress, setAgentAddress] = useState('');

  const handleAgentNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgentName(event.target.value);
  };

  const handleAgentEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgentEmail(event.target.value);
  };

  const handleAgentContactNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgentContactNo(event.target.value);
  };

  const handleAgentAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgentAddress(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Perform create agent logic here

    const agentData = {
      agentName,
      agentEmail,
      agentContactNo,
      agentAddress,
    };

    addDoc(collection(db, 'agents'), agentData)
        .then(() => {
            console.log('Agent added successfully');
            router.push('/dashboard/agents');
        })
        .catch((error: any) => {
            console.error('Error adding agent: ', error);
        });
  };

  return (
    <form onSubmit={handleSubmit} className={scss.form}>
      <TextField
        label="Agent Name"
        variant="outlined"
        value={agentName}
        onChange={handleAgentNameChange}
        fullWidth
        margin="normal"
        className={scss.textField}
      />
      <TextField
        label="Agent Email"
        variant="outlined"
        value={agentEmail}
        onChange={handleAgentEmailChange}
        fullWidth
        margin="normal"
        className={scss.textField}
      />
      <TextField
        label="Agent Contact No"
        variant="outlined"
        value={agentContactNo}
        onChange={handleAgentContactNoChange}
        fullWidth
        margin="normal"
        className={scss.textField}
      />
      <TextField
        label="Agent Address"
        variant="outlined"
        value={agentAddress}
        onChange={handleAgentAddressChange}
        fullWidth
        margin="normal"
        className={scss.textField}
      />

      <Button type="submit" variant="contained" color="primary" className={scss.submitButton}>
        Create Agent
      </Button>
    </form>
  );
};

export default CreateAgent;
