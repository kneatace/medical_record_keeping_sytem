// /api/usePatientId.ts
import { doc, getDoc, getFirestore } from '@firebase/firestore';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
//import { unstable_startTransition as startTransition } from 'react';

let existingId: string | null = null;

const checkIfIdExists = async (patientId: string) => {
    // Check if patientId is provided
    if (!patientId) {
        console.error('Patient ID is not provided');
        return false;
    }
    const db = getFirestore();
    const docRef = doc(db, "patients", patientId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return true;
    } else {
        return false;
    }
};

const generateId = async () => {
    
    console.log('Generating patient ID...');
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = date.getFullYear();

    let newNumber = 0; // Assign a default value
    let lastNumber = 0; // Assign a default value
    let lastDate;

    if (typeof window !== 'undefined' && window.localStorage) {
        const storedLastNumber = localStorage.getItem('lastNumber');
        if (storedLastNumber !== null) {
            lastNumber = Number(storedLastNumber);
        }
        lastDate = localStorage.getItem('lastDate');
    };

    const currentDate = `${day}/${month}/${year}`;

    if (currentDate !== lastDate) {
        newNumber = 1;
    } else {
        newNumber = (lastNumber % 999) + 1;
    }

    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('lastNumber', newNumber.toString());
        localStorage.setItem('lastDate', currentDate);
    }

    const serialNumber = (newNumber).toString().padStart(3, '0');

    const newId = `PPMC-${day}/${month}/${year}-${serialNumber}`;
    const idExists = await checkIfIdExists(newId);
    if (!idExists) {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('patientId', newId);
        }
        return newId;
    }
    return '';
};

const genPatientId = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
    const [patientId, setPatientId] = useState<string>('');
    const [isMounted, setIsMounted] = useState(false);
    const idRef = useRef<string>('');

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const fetchId = async () => {
            const id = await generateId();
            if (isMounted && id && id !== idRef.current) {
                idRef.current = id;
                setPatientId(id);
            }
        }
        if (isMounted) {
            fetchId();
        }
    }, [isMounted]);

    return [patientId, setPatientId];
};

export default genPatientId;