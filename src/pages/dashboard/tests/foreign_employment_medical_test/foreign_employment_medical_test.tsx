import React, { useState, useEffect, useRef } from 'react';
import scss from '@/styles/foreign_employment_medical_test.module.scss' // Import the module.scss file
import { db } from '@/pages/api/database/firebase';
import { addDoc, collection, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import 'firebase/firestore';
import NepaliDate from "nepali-date-converter";

const foreign_employment_medical_test: React.FC = () => {
  // Define your state variables here
  const [randomNumber, setRandomNumber] = useState<string | null>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [patientHistory, setpatientHistory] = useState('');
  const [patientAllergy, setpatientAllergy] = useState('');
  const [Height, setHeight] = useState('');
  const [Weight, setWeight] = useState('');
  const [Pulse, setPulse] = useState('');
  const [Temperature, setTemperature] = useState('');
  const [BP, setBP] = useState('');
  const [Jaundice, setJaundice] = useState('Absent');
  const [Pallor, setPallor] = useState('Absent');
  const [Cyanosis, setCyanosis] = useState('Absent');
  const [Clubbing, setClubbing] = useState('Absent');
  const [Oedema, setOedema] = useState('Absent');
  const [Ascites, setAscites] = useState('Absent');
  const [LymphNode, setLymphNode] = useState('Absent');
  const [Cardiovascular, setCardiovascular] = useState('NAD');
  const [Pulmonary, setPulmonary] = useState('NAD');
  const [Gastroenterology, setGastroenterology] = useState('NAD');
  const [Neurology, setNeurology] = useState('NAD');
  const [Musculoskeletal, setMusculoskeletal] = useState('NAD');
  const [Genitourinary, setGenitourinary] = useState('NAD');
  const [OroDental, setOroDental] = useState('Normal');
  const [ExtermitiesDeformities, setExtermitiesDeformities] = useState('NAD');
  const [VaricoseVeins, setVaricoseVeins] = useState('Absent');
  const [Hernia, setHernia] = useState('Absent');
  const [Hydrocele, setHydrocele] = useState('Absent');
  const [LeftEye, setLeftEye] = useState('6/6');
  const [RightEye, setRightEye] = useState('6/6');
  const [LeftEar, setLeftEar] = useState('Normal');
  const [RightEar, setRightEar] = useState('Normal');
  const [Radiological, setRadiological] = useState('Normal');
  const [ClinicalImpression, setClinicalImpression] = useState('Fit');
  const [Others, setOthers] = useState('Normal');
  const [WBC, setWBC] = useState('');
  const [Neutrophilis, setNeutrophilis] = useState('');
  const [Lymphocytes, setLymphocytes] = useState('');
  const [Eosinophils, setEosinophils] = useState('');
  const [Monocytes, setMonocytes] = useState('');
  const [Basophils, setBasophils] = useState('');
  const [ESR, setESR] = useState('');
  const [Hemoglobin, setHemoglobin] = useState('');
  const [MalariaParasite, setMalariaParasite] = useState('Not Found');
  const [MicroFilaria, setMicroFilaria] = useState('Not Found');
  const [RandomBloodSugar, setRandomBloodSugar] = useState('');
  const [Urea, setUrea] = useState('');
  const [Creatinine, setCreatinine] = useState('');
  const [Bilrubin, setBilrubin] = useState('');
  const [SGOT, setSGOT] = useState('');
  const [SGPT, setSGPT] = useState('');
  const [AntiHIV, setAntiHIV] = useState('Non Reactive');
  const [HBsAg, setHBsAg] = useState('Negative');
  const [AntiHCV, setAntiHCV] = useState('Non Reactive');
  const [VDRLRPR, setVDRLRPR] = useState('Non Reactive');
  const [TPHA, setTPHA] = useState('Non Reactive');
  const [BloodGroup, setBloodGroup] = useState('');
  const [RBC, setRBC] = useState('Absent');
  const [isCustomRBC, setIsCustomRBC] = useState(false);
  const [PusCells, setPusCells] = useState('Absent');
  const [isCustomPusCells, setIsCustomPusCells] = useState(false);
  const [EpithelialCells, setEpithelialCells] = useState('Absent');
  const [isCustomEpithelialCells, setIsCustomEpithelialCells] = useState(false);
  const [PregnancyTest, setPregnancyTest] = useState('Negative');
  const [EgOpiates, setEgOpiates] = useState('Negative');
  const [Cannabies, setCannabies] = useState('Negative');
  const [MantouxTest, setMantouxTest] = useState('Negative');
  const [medicalDate, setMedicalDate] = useState('');

  const router = useRouter();
  const { patientId, testName } = router.query;
  const incrementedRef = useRef(false);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setPatients({
      ...patients,
      [name]: value
    });
  };

  const storeData = async () => {
    try {
      const docRef = await addDoc(collection(db, "generatedreports"), {
        patientId,
        randomNumber,
        medicalDate,
        patientHistory,
        patientAllergy,
        Height,
        Weight,
        Pulse,
        Temperature,
        BP,
        Jaundice,
        Pallor,
        Cyanosis,
        Clubbing,
        Oedema,
        Ascites,
        LymphNode,
        Cardiovascular,
        Pulmonary,
        Gastroenterology,
        Neurology,
        Musculoskeletal,
        Genitourinary,
        OroDental,
        ExtermitiesDeformities,
        VaricoseVeins,
        Hernia,
        Hydrocele,
        LeftEye,
        RightEye,
        LeftEar,
        RightEar,
        Radiological,
        ClinicalImpression,
        Others,
        WBC,
        Neutrophilis,
        Lymphocytes,
        Eosinophils,
        Monocytes,
        Basophils,
        ESR,
        Hemoglobin,
        MalariaParasite,
        MicroFilaria,
        RandomBloodSugar,
        Urea,
        Creatinine,
        Bilrubin,
        SGOT,
        SGPT,
        AntiHIV,
        HBsAg,
        AntiHCV,
        VDRLRPR,
        TPHA,
        BloodGroup,
        RBC,
        PusCells,
        EpithelialCells,
        PregnancyTest,
        EgOpiates,
        Cannabies,
        MantouxTest,
        testName,
        // Add other data you want to store


      });
      console.log("Document written with ID: ", docRef.id);

      // Update the 'reportGenerated' field to true
      await updateDoc(docRef, {
        reportGenerated: true
      });
      // Get the updated document data
      const docData = (await getDoc(docRef)).data();
      console.log('Updated document data:', docData);



    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const storeDataAndRedirect = async () => {
    await storeData();
    router.push('/dashboard/reports');
  };

  // Define your useEffect hooks here
  useEffect(() => {
    const date = new NepaliDate();
    const year = date.format('YYY'); // get last two digits of year
    const month = date.format('MM'); // get month
    const day = date.format('DD'); // get day
    let serialNumber = localStorage.getItem('serialNumber');
    if (!incrementedRef.current) {
      if (!serialNumber) {
        serialNumber = '0001';
      } else {
        let num = parseInt(serialNumber, 10);
        num++;
        serialNumber = num.toString().padStart(4, '0');
      }
      localStorage.setItem('serialNumber', serialNumber);
      incrementedRef.current = true;
    }

    const randomNumber = year + month + day + serialNumber;
    setRandomNumber(randomNumber);

    // Fetch the patientId from Firebase
    const fetchPatients = async () => {
      const patientSnapshot = await getDocs(collection(db, "patients"));
      const patientsData: any[] = [];
      patientSnapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (data && data.patientId === patientId) {
          patientsData.push(data);
        }
      });
      setPatients(patientsData);
    };

    fetchPatients();
  }, []);
  return (
    //save button
    <>
      <Button variant="outlined" color="primary" onClick={storeDataAndRedirect} >
        Save
      </Button>
      <div className={scss.borderedboxreport}>
        <div className={scss.topRight}>
          Gov.Reg. No:.11111111
        </div>
        <div className={scss.centerText}>
          <h3>Medical Centre Pvt.Ltd.</h3>
          <h6>KTM, Nepal-44600, Ph:+977-97777777, +977-977777777</h6>
          <h6>Email: helloworld@gmail.com , Website: healthsyno.com</h6>
        </div>
        <div className={scss.absoluteLeftSNo}>
          S.NO: {randomNumber}
        </div>
        <div className={scss.center}>
          <div className={scss.centerBoldBordered}>
            MEDICAL EXAMINATION REPORT
          </div>
        </div>
        {patients.map((patient, index) => (
          <div key={index}>
            <div className={scss.absoluteLeftPatientId}>Patient ID: {patientId}</div>
            <table className={scss.tableStyle}>
              <tbody>
                <tr className={scss.tableRow}>
                  <td>Name:</td><td>{patient.firstName + " " + patient.lastName}</td>
                  <td>Age:</td><td>{patient.age}</td>
                  <td>Sex:</td><td>{patient.gender}</td>
                  {index === 0 && <td rowSpan={4}><img src={patient.image} alt="Patient" width="150" height="150" /></td>}

                </tr>

                <tr className={scss.tableRow}>
                  <td>Marital Status:</td><td>{patient.maritalstatus}</td>
                  <td>Passport No:</td><td>{patient.passportno}</td>
                  <td>Place & Date of issue:</td><td>{patient.dateandplaceofissue}</td>

                </tr>
                <tr className={scss.tableRow}>
                  <td>Nationality:</td><td>{patient.nationality}</td>
                  <td>Applied Country:</td><td>{patient.appliedcountry}</td>

                  <td></td>
                </tr>
                <tr className={scss.tableRow}>
                  <td>Recruit Agency:</td><td>-</td>
                  <td>Medical Examination Date:</td><td><input type="date" value={medicalDate} onChange={(e) => setMedicalDate(e.target.value)} /></td>
                </tr>
              </tbody>
            </table>
            <div className={scss.centerBoldBordered}>
              GENERAL EXAMINATION
            </div>
            <p><strong>Past history of serious illness, Major surgery, significant psychological problem including (Epilepsy and Depression):</strong></p>
            <form>
              <input type="radio" id="none" name="history" value="None" onChange={(e) => setpatientHistory(e.target.value.toUpperCase())} />
              <label htmlFor="none">None</label><br />
              <input type="radio" id="yes" name="history" value="Yes" onChange={(e) => setpatientHistory(e.target.value.toUpperCase())} />
              <label htmlFor="yes">Yes</label>
            </form>
            <p><strong>Past history of allergy:</strong></p>
            <form>
              <input type="radio" id="allergy-none" name="allergy" value="None" onChange={(e) => setpatientAllergy(e.target.value.toUpperCase())} />
              <label htmlFor="allergy-none">None</label><br />
              <input type="radio" id="allergy-yes" name="allergy" value="Yes" onChange={(e) => setpatientAllergy(e.target.value.toUpperCase())} />
              <label htmlFor="allergy-yes">Yes</label>
            </form>
            <table className={scss.tableStylea}>
              <tbody>
                <tr className={scss.tableRow}>
                  <td>Height:</td><td><input type="text" name="height" value={Height} onChange={(e) => setHeight(e.target.value)} />cm</td>
                  <td>Weight:</td><td><input type="text" name="weight" value={Weight} onChange={(e) => setWeight(e.target.value)} />KG</td>
                  <td>Pulse:</td><td><input type="text" name="pulse" value={Pulse} onChange={(e) => setPulse(e.target.value)} />/MIN</td>
                  <td>Temperature:</td><td><input type="text" name="temperature" value={Temperature} onChange={(e) => setTemperature(e.target.value)} />&deg;F</td>
                </tr>
                <tr className={scss.tableRow}>
                  <td>BP:</td><td><input type="text" name="bp" value={BP} onChange={(e) => setBP(e.target.value)} />mm/Hg</td>
                  <td>Jaundice:</td>
                  <td>
                    <select name="jaundice" value={Jaundice} onChange={(e) => setJaundice(e.target.value)}>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </td>
                  <td>Pallor:</td>
                  <td>
                    <select name="pallor" value={Pallor} onChange={(e) => setPallor(e.target.value)}>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </td>
                  <td>Cyanosis:</td>
                  <td>
                    <select name="cyanosis" value={Cyanosis} onChange={(e) => setCyanosis(e.target.value)}>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </td>
                </tr>
                <tr className={scss.tableRow}>
                  <td>Clubbing:</td>
                  <td>
                    <select name="clubbing" value={Clubbing} onChange={(e) => setClubbing(e.target.value)}>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </td>
                  <td>Oedema:</td>
                  <td>
                    <select name="oedema" value={Oedema} onChange={(e) => setOedema(e.target.value)}>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </td>
                  <td>Ascites:</td>
                  <td>
                    <select name="ascites" value={Ascites} onChange={(e) => setAscites(e.target.value)}>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </td>
                  <td>Lymph Node:</td>
                  <td>
                    <select name="lymphNode" value={LymphNode} onChange={(e) => setLymphNode(e.target.value)}>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={scss.centerBoldBordered}>
              SYSTEMIC EXAMINATION
            </div>
            <div className={`${scss.centerBoldBordered} ${scss.alignRight} ${scss.marginLeft}`}>
              LABORATORY EXAMINATION
            </div>
            <div className={scss.flexContainer}>
              {/* Table1 */}
              <table className={scss.tableStyle2}>
                <thead>
                  <tr className={scss.tableRow}>
                    <th className={scss.columnLength}>Type of Medical Examination</th>
                    <th className={scss.columnLength2}>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Rows of the first table */}
                  <tr>
                    <td>Cardiovascular</td>
                    <td>
                      <select name='Cardiovascular' value={Cardiovascular} onChange={(e) => setCardiovascular(e.target.value)}>
                        <option value="NAD">NAD</option>
                        <option value="Present">Present</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Pulmonary</td>
                    <td>
                      <select name='Pulmonary' value={Pulmonary} onChange={(e) => setPulmonary(e.target.value)}>
                        <option value="NAD">NAD</option>
                        <option value="Present">Present</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Gastroenterology</td>
                    <td>
                      <select name='Gastroenterology' value={Gastroenterology} onChange={(e) => setGastroenterology(e.target.value)}>
                        <option value="NAD">NAD</option>
                        <option value="Present">Present</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Neurology</td>
                    <td>
                      <select name='Neurology' value={Neurology} onChange={(e) => setNeurology(e.target.value)}>
                        <option value="NAD">NAD</option>
                        <option value="Present">Present</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Musculoskeletal</td>
                    <td>
                      <select name='Musculoskeletal' value={Musculoskeletal} onChange={(e) => setMusculoskeletal(e.target.value)}>
                        <option value="NAD">NAD</option>
                        <option value="Present">Present</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Genitourinary</td>
                    <td>
                      <select name='Genitourinary' value={Genitourinary} onChange={(e) => setGenitourinary(e.target.value)}>
                        <option value="NAD">NAD</option>
                        <option value="Present">Present</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Oro-Dental</td>
                    <td>
                      <select name='OroDental' value={OroDental} onChange={(e) => setOroDental(e.target.value)}>
                        <option value="Normal">Normal</option>
                        <option value="Abnormal">Abnormal</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Extermities/Deformities</td>
                    <td>
                      <select name='ExtermitiesDeformities' value={ExtermitiesDeformities} onChange={(e) => setExtermitiesDeformities(e.target.value)}>
                        <option value="NAD">NAD</option>
                        <option value="Present">Present</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Varicose Veins</td>
                    <td>
                      <select name='VaricoseVeins' value={VaricoseVeins} onChange={(e) => setVaricoseVeins(e.target.value)}>
                        <option value="Absent">Absent</option>
                        <option value="Present">Present</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Hernia</td>
                    <td>
                      <select name='Hernia' value={Hernia} onChange={(e) => setHernia(e.target.value)}>
                        <option value="Absent">Absent</option>
                        <option value="Present">Present</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Hydrocele</td>
                    <td>
                      <select name='Hydrocele' value={Hydrocele} onChange={(e) => setHydrocele(e.target.value)}>
                        <option value="Absent">Absent</option>
                        <option value="Present">Present</option>
                        <option value="Not-Applicable">Not Applicable</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Eye(vision)</td>


                  </tr>
                  <tr>
                    <td className={scss.alignRight}>Left Eye</td>
                    <td>
                      <select name='LeftEye' value={LeftEye} onChange={(e) => setLeftEye(e.target.value)}>
                        <option value="6/6">6/6</option>
                        <option value="6/9">6/9</option>
                        <option value="6/12">6/12</option>
                        <option value="6/18">6/18</option>
                        <option value="6/24">6/24</option>
                        <option value="6/36">6/36</option>
                        <option value="6/60">6/60</option>
                        <option value="1/60">1/60</option>
                        <option value="No perception of light">No perception of light</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className={scss.alignRight}>Right Eye</td>
                    <td>
                      <select name='RightEye' value={RightEye} onChange={(e) => setRightEye(e.target.value)}>
                        <option value="6/6">6/6</option>
                        <option value="6/9">6/9</option>
                        <option value="6/12">6/12</option>
                        <option value="6/18">6/18</option>
                        <option value="6/24">6/24</option>
                        <option value="6/36">6/36</option>
                        <option value="6/60">6/60</option>
                        <option value="1/60">1/60</option>
                        <option value="No perception of light">No perception of light</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Ear</td>

                  </tr>
                  <tr>
                    <td className={scss.alignRight}>Left Ear</td>
                    <td>
                      <select name='LeftEar' value={LeftEar} onChange={(e) => setLeftEar(e.target.value)}>
                        <option value="Normal">Normal</option>
                        <option value="Abnormal">Abnormal</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className={scss.alignRight}>Right Ear</td>
                    <td>
                      <select name='RightEar' value={RightEar} onChange={(e) => setRightEar(e.target.value)}>
                        <option value="Normal">Normal</option>
                        <option value="Abnormal">Abnormal</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Radiological (chest X-Ray)</td>
                    <td>
                      <select name='Radiological' value={Radiological} onChange={(e) => setRadiological(e.target.value)}>
                        <option value="Normal">Normal</option>
                        <option value="Abnormal">Abnormal</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Clinical impression</td>
                    <td>
                      <select name='ClinicalImpression' value={ClinicalImpression} onChange={(e) => setClinicalImpression(e.target.value)}>
                        <option value="fit">Fit</option>
                        <option value="unfit">Unfit</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Others</td>
                    <td>
                      <select name='Others' value={Others} onChange={(e) => setOthers(e.target.value)}>
                        <option value="Normal">Normal</option>
                        <option value="Abnormal">Abnormal</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2}>
                      <p>Dear sir/Ma'am,<br />The Above Mentioned Medical Report of {patient.firstName} {patient.lastName} is {patient.status} for the mentioned job.</p>
                    </td>
                  </tr>
                </tfoot>
              </table>



              {/* Table2 */}

              <table className={scss.tableStyle2}>
                <thead>
                  <tr className={scss.tableRow}>
                    <th>

                    </th>
                    <th className={scss.columnLength3}>Blood Examination</th>
                    <th className={scss.columnLength4}>Result</th>
                    <th className={scss.columnLength5}>Reference Range</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Rows of the second table */}
                  <tr>
                    <td className={scss.verticalHeader} rowSpan={11}>
                      Hematology
                    </td>
                    <td>Total WBC Count</td>
                    <td><input type="number" step="0.01" onChange={(e) => setWBC(e.target.value)} /></td>
                    <td>4000-11000</td>
                  </tr>
                  <tr>

                    <td>Differential Count</td>

                  </tr>
                  <tr>

                    <td>Neutrophilis</td>
                    <td><input type="number" step="0.01" onChange={(e) => setNeutrophilis(e.target.value)} /></td>
                    <td>45-74%</td>
                  </tr>
                  <tr>

                    <td>Lymphocytes</td>
                    <td><input type="number" step="0.01" onChange={(e) => setLymphocytes(e.target.value)} /></td>
                    <td>25-40%</td>
                  </tr>
                  <tr>

                    <td>Eosinophils</td>
                    <td><input type="number" step="0.01" onChange={(e) => setEosinophils(e.target.value)} /></td>
                    <td>1-6%</td>
                  </tr>
                  <tr>

                    <td>Monocytes</td>
                    <td><input type="number" step="0.01" onChange={(e) => setMonocytes(e.target.value)} /></td>
                    <td>0-8%</td>
                  </tr>
                  <tr>

                    <td>Basophils</td>
                    <td><input type="number" step="0.01" onChange={(e) => setBasophils(e.target.value)} /></td>
                    <td>0-3%</td>
                  </tr>
                  <tr>

                    <td>ESR</td>
                    <td><input type="number" step="0.01" onChange={(e) => setESR(e.target.value)} /></td>
                    <td>M&lt;10, F&lt;20</td>
                  </tr>
                  <tr>

                    <td>Hemoglobin</td>
                    <td><input type="number" step="0.01" onChange={(e) => setHemoglobin(e.target.value)} /></td>
                    <td>M: 12-17gm%, F: 11-14gm%</td>
                  </tr>
                  <tr>

                    <td>Malaria Parasite</td>
                    <td>
                      <select name='MalariaParasite' value={MalariaParasite} onChange={(e) => setMalariaParasite(e.target.value)}>
                        <option value="Found">Found</option>
                        <option value="Not-Found">Not Found</option>
                      </select>
                    </td>
                    <td></td>
                  </tr>
                  <tr>

                    <td>Micro Filaria</td>
                    <td>
                      <select name='MicroFilaria' value={MicroFilaria} onChange={(e) => setMicroFilaria(e.target.value)}>
                        <option value="Found">Found</option>
                        <option value="Not-Found">Not Found</option>
                      </select>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className={scss.verticalHeader} rowSpan={6}>
                      Biochemistry
                    </td>
                    <td>Random Blood Sugar</td>
                    <td><input type="number" step="0.01" onChange={(e) => setRandomBloodSugar(e.target.value)} /></td>
                    <td>80-120 mg%</td>
                  </tr>
                  <tr>

                    <td>Urea</td>
                    <td><input type="number" step="0.01" onChange={(e) => setUrea(e.target.value)} /></td>
                    <td>20-45 mg%</td>
                  </tr>
                  <tr>

                    <td>Creatinine</td>
                    <td><input type="number" step="0.01" onChange={(e) => setCreatinine(e.target.value)} /></td>
                    <td>0.4-1.4 mg%</td>
                  </tr>
                  <tr>

                    <td>Bilrubin(Total/Direct)</td>
                    <td><input type="string" step="0.01" onChange={(e) => setBilrubin(e.target.value)} /></td>
                    <td>0.4-1 mg%</td>
                  </tr>
                  <tr>
                    <td>SGOT</td>
                    <td><input type="number" step="0.01" onChange={(e) => setSGOT(e.target.value)} /></td>
                    <td>5-37 U/L</td>
                  </tr>
                  <tr>
                    <td>SGPT</td>
                    <td><input type="number" step="0.01" onChange={(e) => setSGPT(e.target.value)} /></td>
                    <td>3-45 U/L</td>
                  </tr>
                  <tr>
                    <td className={scss.verticalHeader} rowSpan={6}>
                      Serology
                    </td>
                    <td>Anti-HIV(1&2)</td>
                    <td>
                      <select name='AntiHIV' value={AntiHIV} onChange={(e) => setAntiHIV(e.target.value)}>
                        <option value="Reactive">Reactive</option>
                        <option value="Non-Reactive">Non Reactive</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>HBs-Ag</td>
                    <td>
                      <select name='HBsAg' value={HBsAg} onChange={(e) => setHBsAg(e.target.value)}>
                        <option value="Positive">Positive</option>
                        <option value="Negative">Negative</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Anti-HCV</td>
                    <td>
                      <select name='AntiHCV' value={AntiHCV} onChange={(e) => setAntiHCV(e.target.value)}>
                        <option value="Reactive">Reactive</option>
                        <option value="Non-Reactive">Non Reactive</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>VDRL/RPR</td>
                    <td>
                      <select name='VDRLRPR' value={VDRLRPR} onChange={(e) => setVDRLRPR(e.target.value)}>
                        <option value="Reactive">Reactive</option>
                        <option value="Non-Reactive">Non Reactive</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>TPHA</td>
                    <td>
                      <select name='TPHA' value={TPHA} onChange={(e) => setTPHA(e.target.value)}>
                        <option value="Reactive">Reactive</option>
                        <option value="Non-Reactive">Non Reactive</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Blood Group(ABO/Rh)</td>
                    <td>
                      <select name='BloodGroup' value={BloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="Rh+">Rh+</option>
                        <option value="Rh-">Rh-</option>
                        <option value="Bombay">Bombay (hh)</option>
                        <option value="INRA">INRA</option>
                        <option value="INRB">INRB</option>
                        <option value="Langereis">Langereis</option>
                        <option value="Junior">Junior</option>
                        <option value="ChidoRodgers">Chido/Rodgers</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className={scss.verticalHeader} rowSpan={4}>
                      Urine
                    </td>
                    <td>RBC</td>
                    <td>
                      {!isCustomRBC ? (
                        <select name='RBC' value={RBC} onChange={(e) => {
                          if (e.target.value === "custom") {
                            setIsCustomRBC(true);
                          } else {
                            setRBC(e.target.value);
                          }
                        }}>
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="NIL">Nil</option>
                          <option value="custom">Custom...</option>
                        </select>
                      ) : (
                        <input name='RBC' type="text" value={RBC} onChange={(e) => setRBC(e.target.value)} />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Pus Cells</td>
                    <td>
                      {!isCustomPusCells ? (
                        <select name='PusCells' value={PusCells} onChange={(e) => {
                          if (e.target.value === "custom") {
                            setIsCustomPusCells(true);
                          } else {
                            setPusCells(e.target.value);
                          }
                        }}>
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="custom">Custom...</option>
                        </select>
                      ) : (
                        <input name='PusCells' type="text" value={PusCells} onChange={(e) => setPusCells(e.target.value)} />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Epithelial Cells</td>
                    <td>
                      {!isCustomEpithelialCells ? (
                        <select name='EpithelialCells' value={EpithelialCells} onChange={(e) => {
                          if (e.target.value === "custom") {
                            setIsCustomEpithelialCells(true);
                          } else {
                            setEpithelialCells(e.target.value);
                          }
                        }}>
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="custom">Custom...</option>
                        </select>
                      ) : (
                        <input name='EpithelialCells' type="text" value={EpithelialCells} onChange={(e) => setEpithelialCells(e.target.value)} />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Pregnancy Test(if female)</td>
                    <td>
                      <select name='PregnancyTest' value={PregnancyTest} onChange={(e) => setPregnancyTest(e.target.value)}>
                        <option value="Positive">Positive</option>
                        <option value="Negative">Negative</option>
                        <option value="Not-Applicable">Not Applicable</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Others</td>
                    <td>Eg. Opiates</td>
                    <td>
                      <select name='EgOpiates' value={EgOpiates} onChange={(e) => setEgOpiates(e.target.value)}>
                        <option value="Positive">Positive</option>
                        <option value="Negative">Negative</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Cannabies</td>
                    <td>
                      <select name='Cannabies' value={Cannabies} onChange={(e) => setCannabies(e.target.value)}>
                        <option value="Positive">Positive</option>
                        <option value="Negative">Negative</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Mantoux Test</td>
                    <td>
                      <select name='MantouxTest' value={MantouxTest} onChange={(e) => setMantouxTest(e.target.value)}>
                        <option value="Positive">Positive</option>
                        <option value="Negative">Negative</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
        <div className={scss.flexContainer3}>
          <div>
            <p className={scss.alignRight}>..............................</p>
            <p className={scss.alignRight}>Physician Signature</p>
          </div>
          <div>This Report is Valid for 2 months from the date of Medical Examination.<br />Format Recommended by Ministry of Health and Population, Government of Nepal</div>
          <div>
            <p className={scss.alignLeft}>...............................</p>
            <p className={scss.alignLeft}>Authorized Signature</p>
          </div>

        </div>
      </div></>

  );
};

export default foreign_employment_medical_test;