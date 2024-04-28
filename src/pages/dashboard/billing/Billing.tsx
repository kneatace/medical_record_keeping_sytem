import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Button, Typography, Box } from '@mui/material';
import styles from '@/styles/Billing.module.scss';

const patients = [
  { id: 1, name: 'Patient 1' },
  // Add more patients as needed...
];

const services = [
  { id: 1, name: 'Service 1', cost: 100 },
  // Add more services as needed...
];

const Billing = () => {
  const [patientId, setPatientId] = useState('');
  const [serviceIds, setServiceIds] = useState<string[]>([]);
  const [billPreview, setBillPreview] = useState<any>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const patient = patients.find((p) => p.id === Number(patientId));
    const servicesForBill = services.filter((s) => serviceIds.includes(String(s.id)));
    const totalCost = servicesForBill.reduce((sum, s) => sum + s.cost, 0);

    setBillPreview({ patient, services: servicesForBill, totalCost });

    console.log({ patient, services: servicesForBill, totalCost });
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.title}>Billing</Typography>
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormControl className={styles.formControl}>
          <InputLabel id="patient-select-label">Patient</InputLabel>
          <Select
            labelId="patient-select-label"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value as string)}
          >
            {patients.map((patient) => (
              <MenuItem key={patient.id} value={patient.id}>{patient.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={styles.formControl}>
          <InputLabel id="service-select-label">Services</InputLabel>
          <Select
            labelId="service-select-label"
            multiple
            value={serviceIds}
            onChange={(e) => setServiceIds(e.target.value as string[])}
            renderValue={(selected) => selected.join(', ')}
          >
            {services.map((service) => (
              <MenuItem key={service.id} value={service.id}>
                <Checkbox checked={serviceIds.includes(String(service.id))} />
                <ListItemText primary={service.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" className={styles.submitButton}>Generate Bill</Button>
      </form>
      {billPreview && (
        <Box className={styles.billPreview}>
          <Typography variant="h6">Bill Preview</Typography>
          <Typography variant="body1">Patient: {billPreview.patient.name}</Typography>
          <Typography variant="body1">Services:</Typography>
          <ul>
            {billPreview.services.map((service: any) => (
              <li key={service.id}>{service.name} - ${service.cost}</li>
            ))}
          </ul>
          <Typography variant="body1">Total Cost: ${billPreview.totalCost}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Billing;