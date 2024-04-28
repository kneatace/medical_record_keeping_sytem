
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import scss from '@/styles/CreateTest.module.scss';
import { useRouter } from 'next/router';
import { db } from '@/pages/api/database/firebase';
import { addDoc, collection } from 'firebase/firestore';

const CreateTest = () => {
  const [testName, setTestName] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleTestNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTestName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Store the test name here
    const response = await fetch('/api/newtest/NewTest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ testName }),
    });

    const data = await response.json();
    console.log(data.message);
    // After creating the test
    const newTest = { id: Date.now(), name: testName, date: new Date().toISOString() };
    let tests = JSON.parse(localStorage.getItem('tests') || '[]');
    tests.push(newTest);
    localStorage.setItem('tests', JSON.stringify(tests));
    const testsCollection = collection(db, 'tests');
    const docRef = await addDoc(testsCollection, {
      name: testName,
      date: new Date().toISOString(),
    });
    console.log("Document written with ID: ", docRef.id);

    router.push('/dashboard/tests'); // Redirect the user to the tests page  };
  };
  return (
    <form onSubmit={handleSubmit} className={scss.createTestForm}>
      <TextField
        label="Test Name"
        value={testName}
        onChange={handleTestNameChange}
      />
      <Button type="submit" variant="contained" color="primary" className={scss.createTestButton}>
        Create Test
      </Button>
    </form>
  );
};

export default CreateTest;
