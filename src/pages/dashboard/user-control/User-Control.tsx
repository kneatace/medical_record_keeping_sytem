import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const user_control = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const addUser = () => {
    const newUser: User = {
      id: users.length + 1,
      firstName,
      lastName,
      email,
    };
    setUsers([...users, newUser]);
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  const removeUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h2" align="center" gutterBottom>
        User Control
      </Typography>
      <TextField label="First Name" variant="outlined" fullWidth margin="normal" value={firstName} onChange={e => setFirstName(e.target.value)} />
      <TextField label="Last Name" variant="outlined" fullWidth margin="normal" value={lastName} onChange={e => setLastName(e.target.value)} />
      <TextField label="Email" variant="outlined" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
      <Button variant="contained" color="primary" fullWidth onClick={addUser}>
        Add User
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => removeUser(user.id)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default user_control;