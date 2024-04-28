
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import scss from '@/styles/CreateTest.module.scss';
import { useRouter } from 'next/router';
import { db } from '@/pages/api/database/firebase';
import { addDoc, collection } from 'firebase/firestore';

const labtests = () => {
  const [labTestName, setlabTestName] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleTestNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setlabTestName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Store the test name here
    const response = await fetch('/api/newlabtest/NewLabTest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ labTestName }),
    });

    const data = await response.json();
    //console.log(data.message);
    // After creating the test
    const NewlabTest = { id: Date.now(), name: labTestName, date: new Date().toISOString() };
    let tests = JSON.parse(localStorage.getItem('labtests') || '[]');
    tests.push(NewlabTest);
    localStorage.setItem('labtests', JSON.stringify(tests));
    const testsCollection = collection(db, 'labtests');
    const docRef = await addDoc(testsCollection, {
      name: labTestName,
      date: new Date().toISOString(),
    });
    //console.log("Document written with ID: ", docRef.id);

    router.push('/dashboard/lab/labtests'); // Redirect the user to the tests page  };
  };
  return (
    <form onSubmit={handleSubmit} className={scss.createTestForm}>
      <TextField
        label="Lab Test Name"
        value={labTestName}
        onChange={handleTestNameChange}
      />
      <Button type="submit" variant="contained" color="primary" className={scss.createTestButton}>
        Create Lab Test
      </Button>
    </form>
  );
};

export default labtests;
