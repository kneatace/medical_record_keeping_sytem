import React, { useState, ChangeEvent, Suspense, memo } from "react";
import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography, Box, Grid, TextField, Checkbox, FormControlLabel } from '@mui/material';
import scss from "@/styles/AddPatient.module.scss"
import { useRouter } from "next/router";
import { db } from "@/pages/api/database/firebase";
import { addDoc, collection } from "firebase/firestore";
import Webcam from "react-webcam";
import genPatientId from "@/hooks/patientid/genpatientid";

const addpatient = memo(() => {
    const [initialPatientId] = genPatientId();
    const [patientData, setPatientData] = useState<{
        firstName: string;
        lastName: string;
        age: number | null;
        gender: string;
        maritalstatus: string;
        nationality: string;
        passportno: string;
        dateandplaceofissue: string;
        address: string;
        contact: string;
        appliedcountry: string;
        applieduniversity: string;
        appliedinsurance: string;
        placeOfIssue: string;
        date: string;
        patientId: string;
        camEnabled: boolean;
        image: string | null;
        checkbox1: boolean;
        checkbox2: boolean;
        checkbox3: boolean;
        selectLabTest: string;
        TypeOfExamination: string[];
    }>({
        firstName: "",
        lastName: "",
        age: null,
        gender: "",
        maritalstatus: "",
        nationality: "",
        passportno: "",
        dateandplaceofissue: "",
        address: "",
        contact: "",
        appliedcountry: "",
        applieduniversity: "",
        appliedinsurance: "",
        placeOfIssue: "",
        date: "",
        selectLabTest: "",
        TypeOfExamination: [],
        patientId: initialPatientId,
        camEnabled: false,
        image: null,
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
    });
    React.useEffect(() => {
        if (initialPatientId) {
            setPatientData(prevState => ({ ...prevState, patientId: initialPatientId }));
        }
    }, [initialPatientId]);
    const webcamRef = React.useRef<Webcam>(null);
    const router = useRouter();
    const capture = React.useCallback(() => {
        const webcam = webcamRef.current;
        if (!webcam) return;

        const imageSrc = webcam.getScreenshot();
        if (!imageSrc) return;

        const img = new Image();
        img.onload = () => handleImageLoad(img);
        img.src = imageSrc;
    }, [webcamRef]);
    const handleImageLoad = (img: HTMLImageElement) => {
        const croppedImageSrc = cropImage(img);
        if (croppedImageSrc) {
            setPatientData(prevState => ({ ...prevState, image: croppedImageSrc }));
            setPatientData(prevState => ({ ...prevState, camEnabled: false })); // Stop the camera after capturing the photo
        }
    }
    // Extract the image cropping logic into a separate function
    const cropImage = (img: HTMLImageElement): string | null => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;
        const cropPercent = 0.20; // Crop 25% from each side
        const cropWidth = img.width * cropPercent;
        const cropHeight = img.height * cropPercent;
        const x = cropWidth;
        const y = cropHeight;
        const width = img.width - 2 * cropWidth;
        const height = img.height - 2 * cropHeight;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
        return canvas.toDataURL('image/jpeg');
    }
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPatientData(prevState => ({ ...prevState, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // handle form submission here
        // Form validation
        if (!patientData.firstName || !patientData.lastName || !patientData.age || !patientData.gender || !patientData.maritalstatus || !patientData.nationality || !patientData.passportno || !patientData.dateandplaceofissue || !patientData.address || !patientData.contact || !patientData.TypeOfExamination || !patientData.image) {
            alert('Please fill out all fields');
            return;
        }
        setPatientData(prevState => ({ ...prevState, loading: true }));
        addDoc(collection(db, 'patients'), patientData)
            .then(() => {
                console.log('Patient added successfully');
                router.push('/dashboard/patients');
            })
            .catch((error: any) => {
                console.error('Error adding patient: ', error);
                alert('Error adding patient');
            })
            .finally(() => {
                setPatientData(prevState => ({ ...prevState, loading: false }));
            });

    };
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <form onSubmit={handleSubmit} className={scss.addPatientForm}>
                <FormControl variant="outlined" className={scss.textField}>
                    <InputLabel htmlFor="patient-id">Patient ID</InputLabel>
                    <OutlinedInput
                        id="patient-id"
                        type="text"
                        value={patientData.patientId || ''}
                        onChange={(e) => setPatientData(prevState => ({ ...prevState, patientId: e.target.value }))}
                        label="Patient ID"
                        required
                        disabled
                    />
                </FormControl>
                <FormControl variant="outlined" className={scss.textField}>
                    <InputLabel htmlFor="first-name">First Name</InputLabel>
                    <OutlinedInput
                        id="first-name"
                        type="text"
                        value={patientData.firstName || ''}
                        onChange={(e) => setPatientData(prevState => ({ ...prevState, firstName: e.target.value }))}
                        label="First Name"
                        required
                    />
                </FormControl>
                <FormControl variant="outlined" className={scss.textField}>
                    <InputLabel htmlFor="last-name">Last Name</InputLabel>
                    <OutlinedInput
                        id="last-name"
                        type="text"
                        value={patientData.lastName || ''}
                        onChange={(e) => setPatientData(prevState => ({ ...prevState, lastName: e.target.value }))}
                        label="Last Name"
                        required
                    />
                </FormControl>
                <FormControl variant="outlined" className={scss.textField}>
                    <InputLabel htmlFor="age">Age</InputLabel>
                    <OutlinedInput
                        id="age"
                        type="number"
                        value={patientData.age || ''}
                        onChange={(e) => setPatientData(prevState => ({ ...prevState, age: Number(e.target.value) }))}
                        label="Age"
                        required
                    />
                </FormControl>

                <FormControl variant="outlined" className={scss.textField}>
                    <InputLabel htmlFor="gender">Gender</InputLabel>
                    <Select
                        label="Gender"
                        id="gender"
                        value={patientData.gender || ''}
                        onChange={(e) => setPatientData(prevState => ({ ...prevState, gender: e.target.value }))}
                        required
                    >
                        <MenuItem value="">Select Gender</MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={scss.textField}>
                    <InputLabel htmlFor="marital-status">Marital Status</InputLabel>
                    <Select
                        label="Marital Status"
                        id="marital-status"
                        value={patientData.maritalstatus || ''}
                        onChange={(e) => setPatientData(prevState => ({ ...prevState, maritalstatus: e.target.value }))}
                        required
                    >
                        <MenuItem value="">Select Marital Status</MenuItem>
                        <MenuItem value="single">Single</MenuItem>
                        <MenuItem value="married">Married</MenuItem>
                        <MenuItem value="divorced">Divorced</MenuItem>
                        <MenuItem value="widowed">Widowed</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="outlined" className={scss.textField}>
                    <InputLabel htmlFor="nationality">Nationality</InputLabel>
                    <OutlinedInput
                        id="nationality"
                        type="text"
                        value={patientData.nationality || ''}
                        onChange={(e) => setPatientData(prevState => ({ ...prevState, nationality: e.target.value }))}
                        label="Nationality"
                        required
                    />
                </FormControl>
                <FormControl variant="outlined" className={scss.textField}>
                    <InputLabel htmlFor="passport-no">Passport No.</InputLabel>
                    <OutlinedInput
                        id="passport-no"
                        type="string"
                        value={patientData.passportno || ''}
                        onChange={(e) => setPatientData(prevState => ({ ...prevState, passportno: e.target.value }))}
                        label="Passport No."
                    />
                </FormControl>
                <FormControl variant='outlined' className={scss.textField}>
                    <Grid container spacing={3} style={{ width: '100%' }}>
                        <Grid item xs={4} style={{ width: '100%' }}>
                            <TextField
                                id="date"
                                type="date"
                                value={patientData.date || ''}
                                onChange={(e) => {
                                    setPatientData(prevState => ({ ...prevState, date: e.target.value, dateandplaceofissue: e.target.value + ' & ' + patientData.placeOfIssue }));
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                style={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={4} style={{ width: '100%' }}>
                            <TextField
                                id="placeofissue"
                                type="text"
                                value={patientData.placeOfIssue || ''}
                                onChange={(e) => {
                                    setPatientData(prevState => ({ ...prevState, placeOfIssue: e.target.value, dateandplaceofissue: patientData.date + ' & ' + e.target.value }));
                                }}
                                label="Place Of Issue"
                                variant="outlined"
                                style={{ width: '100%' }}
                            />
                        </Grid>
                    </Grid>
                </FormControl>
                <FormControl variant="outlined" className={scss.textField}>
                    <InputLabel htmlFor="address">Address</InputLabel>
                    <OutlinedInput
                        id="address"
                        type="text"
                        value={patientData.address || ''}
                        onChange={(e) => setPatientData(prevState => ({ ...prevState, address: e.target.value }))}
                        label="Address"
                        required
                    />
                </FormControl>
                <FormControl variant="outlined" className={scss.textField}>
                    <InputLabel htmlFor="contact">Contact</InputLabel>
                    <OutlinedInput
                        id="contact"
                        type="string"
                        value={patientData.contact || ''}
                        onChange={(e) => setPatientData(prevState => ({ ...prevState, contact: e.target.value }))}
                        label="Contact"
                        required
                    />
                </FormControl>
                <FormControlLabel
                    className={scss.checkboxContainer}
                    control={
                        <Checkbox
                            className={scss.checkbox}
                            checked={patientData.checkbox1 || false}
                            onChange={(e) => {
                                setPatientData((prevState) => {
                                    const updatedExaminations = [...prevState.TypeOfExamination];
                                    if (e.target.checked) {
                                        updatedExaminations.push('Foreign Employment Medical Test');
                                    } else {
                                        const index = updatedExaminations.indexOf('Foreign Employment Medical Test');
                                        if (index > -1) {
                                            updatedExaminations.splice(index, 1);
                                        }
                                    }
                                    return {
                                        ...prevState,
                                        checkbox1: e.target.checked,
                                        TypeOfExamination: updatedExaminations,
                                    };
                                });
                            }}
                        />
                    }
                    label="Foreign Employment Medical Test"
                />
                <FormControlLabel
                    className={scss.checkboxContainer}
                    control={
                        <Checkbox
                            className={scss.checkbox}
                            checked={patientData.checkbox2 || false}
                            onChange={(e) => {
                                setPatientData((prevState) => {
                                    const updatedExaminations = [...prevState.TypeOfExamination];
                                    if (e.target.checked) {
                                        updatedExaminations.push('Lab Test');
                                    } else {
                                        const index = updatedExaminations.indexOf('Lab Test');
                                        if (index > -1) {
                                            updatedExaminations.splice(index, 1);
                                        }
                                    }
                                    return {
                                        ...prevState,
                                        checkbox2: e.target.checked,
                                        TypeOfExamination: updatedExaminations,
                                    };
                                });
                            }}
                        />
                    }
                    label="Lab Test"
                />
                <FormControlLabel
                    className={scss.checkboxContainer}
                    control={
                        <Checkbox
                            className={scss.checkbox}
                            checked={patientData.checkbox3 || false}
                            onChange={(e) => {
                                setPatientData((prevState) => {
                                    const updatedExaminations = [...prevState.TypeOfExamination];
                                    if (e.target.checked) {
                                        updatedExaminations.push('Normal Medical Test');
                                    } else {
                                        const index = updatedExaminations.indexOf('Normal Medical Test');
                                        if (index > -1) {
                                            updatedExaminations.splice(index, 1);
                                        }
                                    }
                                    return {
                                        ...prevState,
                                        checkbox3: e.target.checked,
                                        TypeOfExamination: updatedExaminations,
                                    };
                                });
                            }}
                        />
                    }
                    label="Normal Medical Test"
                />
                {patientData.checkbox1 && (
                    <FormControl variant="outlined" className={scss.textField}>
                        <InputLabel id="appliedcountry">Applied Country</InputLabel>
                        <Select
                            labelId="appliedcountry"
                            label="Applied Country"
                            value={patientData.appliedcountry || ''}
                            onChange={(e) => setPatientData(prevState => ({ ...prevState, appliedcountry: e.target.value }))}
                        >
                            <MenuItem value="">Select Country</MenuItem>
                            <MenuItem value="afghanistan">Afghanistan</MenuItem>
                            <MenuItem value="albania">Albania</MenuItem>
                            <MenuItem value="algeria">Algeria</MenuItem>
                            <MenuItem value="andorra">Andorra</MenuItem>
                            <MenuItem value="angola">Angola</MenuItem>
                            <MenuItem value="antiguaandbarbuda">Antigua and Barbuda</MenuItem>
                            <MenuItem value="argentina">Argentina</MenuItem>
                            <MenuItem value="armenia">Armenia</MenuItem>
                            <MenuItem value="australia">Australia</MenuItem>
                            <MenuItem value="austria">Austria</MenuItem>
                            <MenuItem value="azerbaijan">Azerbaijan</MenuItem>
                            <MenuItem value="bahamas">Bahamas</MenuItem>
                            <MenuItem value="bahrain">Bahrain</MenuItem>
                            <MenuItem value="bangladesh">Bangladesh</MenuItem>
                            <MenuItem value="barbados">Barbados</MenuItem>
                            <MenuItem value="belarus">Belarus</MenuItem>
                            <MenuItem value="belgium">Belgium</MenuItem>
                            <MenuItem value="belize">Belize</MenuItem>
                            <MenuItem value="benin">Benin</MenuItem>
                            <MenuItem value="bhutan">Bhutan</MenuItem>
                            <MenuItem value="bolivia">Bolivia</MenuItem>
                            <MenuItem value="bosniaandherzegovina">Bosnia and Herzegovina</MenuItem>
                            <MenuItem value="botswana">Botswana</MenuItem>
                            <MenuItem value="brazil">Brazil</MenuItem>
                            <MenuItem value="brunei">Brunei</MenuItem>
                            <MenuItem value="bulgaria">Bulgaria</MenuItem>
                            <MenuItem value="burkinafaso">Burkina Faso</MenuItem>
                            <MenuItem value="burundi">Burundi</MenuItem>
                            <MenuItem value="cambodia">Cambodia</MenuItem>
                            <MenuItem value="cameroon">Cameroon</MenuItem>
                            <MenuItem value="canada">Canada</MenuItem>
                            <MenuItem value="capeverde">Cape Verde</MenuItem>
                            <MenuItem value="centralafricanrepublic">Central African Republic</MenuItem>
                            <MenuItem value="chad">Chad</MenuItem>
                            <MenuItem value="chile">Chile</MenuItem>
                            <MenuItem value="china">China</MenuItem>
                            <MenuItem value="colombia">Colombia</MenuItem>
                            <MenuItem value="comoros">Comoros</MenuItem>
                            <MenuItem value="costarica">Costa Rica</MenuItem>
                            <MenuItem value="cotedivoire">Cote d'Ivoire</MenuItem>
                            <MenuItem value="croatia">Croatia</MenuItem>
                            <MenuItem value="cuba">Cuba</MenuItem>
                            <MenuItem value="cyprus">Cyprus</MenuItem>
                            <MenuItem value="czechrepublic">Czech Republic</MenuItem>
                            <MenuItem value="denmark">Denmark</MenuItem>
                            <MenuItem value="djibouti">Djibouti</MenuItem>
                            <MenuItem value="dominica">Dominica</MenuItem>
                            <MenuItem value="dominicanrepublic">Dominican Republic</MenuItem>
                            <MenuItem value="ecuador">Ecuador</MenuItem>
                            <MenuItem value="egypt">Egypt</MenuItem>
                            <MenuItem value="elsalvador">El Salvador</MenuItem>
                            <MenuItem value="equatorialguinea">Equatorial Guinea</MenuItem>
                            <MenuItem value="eritrea">Eritrea</MenuItem>
                            <MenuItem value="estonia">Estonia</MenuItem>
                            <MenuItem value="eswatini">Eswatini</MenuItem>
                            <MenuItem value="ethiopia">Ethiopia</MenuItem>
                            <MenuItem value="fiji">Fiji</MenuItem>
                            <MenuItem value="finland">Finland</MenuItem>
                            <MenuItem value="france">France</MenuItem>
                            <MenuItem value="gabon">Gabon</MenuItem>
                            <MenuItem value="gambia">Gambia</MenuItem>
                            <MenuItem value="georgia">Georgia</MenuItem>
                            <MenuItem value="germany">Germany</MenuItem>
                            <MenuItem value="ghana">Ghana</MenuItem>
                            <MenuItem value="greece">Greece</MenuItem>
                            <MenuItem value="grenada">Grenada</MenuItem>
                            <MenuItem value="guatemala">Guatemala</MenuItem>
                            <MenuItem value="guinea">Guinea</MenuItem>
                            <MenuItem value="guineabissau">Guinea-Bissau</MenuItem>
                            <MenuItem value="guyana">Guyana</MenuItem>
                            <MenuItem value="haiti">Haiti</MenuItem>
                            <MenuItem value="honduras">Honduras</MenuItem>
                            <MenuItem value="hungary">Hungary</MenuItem>
                            <MenuItem value="iceland">Iceland</MenuItem>
                            <MenuItem value="india">India</MenuItem>
                            <MenuItem value="indonesia">Indonesia</MenuItem>
                            <MenuItem value="iran">Iran</MenuItem>
                            <MenuItem value="iraq">Iraq</MenuItem>
                            <MenuItem value="ireland">Ireland</MenuItem>
                            <MenuItem value="israel">Israel</MenuItem>
                            <MenuItem value="italy">Italy</MenuItem>
                            <MenuItem value="jamaica">Jamaica</MenuItem>
                            <MenuItem value="japan">Japan</MenuItem>
                            <MenuItem value="jordan">Jordan</MenuItem>
                            <MenuItem value="kazakhstan">Kazakhstan</MenuItem>
                            <MenuItem value="kenya">Kenya</MenuItem>
                            <MenuItem value="kiribati">Kiribati</MenuItem>
                            <MenuItem value="kosovo">Kosovo</MenuItem>
                            <MenuItem value="kuwait">Kuwait</MenuItem>
                            <MenuItem value="kyrgyzstan">Kyrgyzstan</MenuItem>
                            <MenuItem value="laos">Laos</MenuItem>
                            <MenuItem value="latvia">Latvia</MenuItem>
                            <MenuItem value="lebanon">Lebanon</MenuItem>
                            <MenuItem value="lesotho">Lesotho</MenuItem>
                            <MenuItem value="liberia">Liberia</MenuItem>
                            <MenuItem value="libya">Libya</MenuItem>
                            <MenuItem value="liechtenstein">Liechtenstein</MenuItem>
                            <MenuItem value="lithuania">Lithuania</MenuItem>
                            <MenuItem value="luxembourg">Luxembourg</MenuItem>
                            <MenuItem value="madagascar">Madagascar</MenuItem>
                            <MenuItem value="malawi">Malawi</MenuItem>
                            <MenuItem value="malaysia">Malaysia</MenuItem>
                            <MenuItem value="maldives">Maldives</MenuItem>
                            <MenuItem value="mali">Mali</MenuItem>
                            <MenuItem value="malta">Malta</MenuItem>
                            <MenuItem value="marshallislands">Marshall Islands</MenuItem>
                            <MenuItem value="mauritania">Mauritania</MenuItem>
                            <MenuItem value="mauritius">Mauritius</MenuItem>
                            <MenuItem value="mexico">Mexico</MenuItem>
                            <MenuItem value="micronesia">Micronesia</MenuItem>
                            <MenuItem value="moldova">Moldova</MenuItem>
                            <MenuItem value="monaco">Monaco</MenuItem>
                            <MenuItem value="mongolia">Mongolia</MenuItem>
                            <MenuItem value="montenegro">Montenegro</MenuItem>
                            <MenuItem value="morocco">Morocco</MenuItem>
                            <MenuItem value="mozambique">Mozambique</MenuItem>
                            <MenuItem value="myanmar">Myanmar</MenuItem>
                            <MenuItem value="namibia">Namibia</MenuItem>
                            <MenuItem value="nauru">Nauru</MenuItem>
                            <MenuItem value="nepal">Nepal</MenuItem>
                            <MenuItem value="netherlands">Netherlands</MenuItem>
                            <MenuItem value="newzealand">New Zealand</MenuItem>
                            <MenuItem value="nicaragua">Nicaragua</MenuItem>
                            <MenuItem value="niger">Niger</MenuItem>
                            <MenuItem value="nigeria">Nigeria</MenuItem>
                            <MenuItem value="northkorea">North Korea</MenuItem>
                            <MenuItem value="northmacedonia">North Macedonia</MenuItem>
                            <MenuItem value="norway">Norway</MenuItem>
                            <MenuItem value="oman">Oman</MenuItem>
                            <MenuItem value="pakistan">Pakistan</MenuItem>
                            <MenuItem value="palau">Palau</MenuItem>
                            <MenuItem value="palestine">Palestine</MenuItem>
                            <MenuItem value="panama">Panama</MenuItem>
                            <MenuItem value="papuanewguinea">Papua New Guinea</MenuItem>
                            <MenuItem value="paraguay">Paraguay</MenuItem>
                            <MenuItem value="peru">Peru</MenuItem>
                            <MenuItem value="philippines">Philippines</MenuItem>
                            <MenuItem value="poland">Poland</MenuItem>
                            <MenuItem value="portugal">Portugal</MenuItem>
                            <MenuItem value="qatar">Qatar</MenuItem>
                            <MenuItem value="romania">Romania</MenuItem>
                            <MenuItem value="russia">Russia</MenuItem>
                            <MenuItem value="rwanda">Rwanda</MenuItem>
                            <MenuItem value="saintkittsandnevis">Saint Kitts and Nevis</MenuItem>
                            <MenuItem value="saintlucia">Saint Lucia</MenuItem>
                            <MenuItem value="saintvincentandthegrenadines">Saint Vincent and the Grenadines</MenuItem>
                            <MenuItem value="samoa">Samoa</MenuItem>
                            <MenuItem value="sanmarino">San Marino</MenuItem>
                            <MenuItem value="saotomeandprincipe">Sao Tome and Principe</MenuItem>
                            <MenuItem value="saudiarabia">Saudi Arabia</MenuItem>
                            <MenuItem value="senegal">Senegal</MenuItem>
                            <MenuItem value="serbia">Serbia</MenuItem>
                            <MenuItem value="seychelles">Seychelles</MenuItem>
                            <MenuItem value="sierraleone">Sierra Leone</MenuItem>
                            <MenuItem value="singapore">Singapore</MenuItem>
                            <MenuItem value="slovakia">Slovakia</MenuItem>
                            <MenuItem value="slovenia">Slovenia</MenuItem>
                            <MenuItem value="solomonislands">Solomon Islands</MenuItem>
                            <MenuItem value="somalia">Somalia</MenuItem>
                            <MenuItem value="southafrica">South Africa</MenuItem>
                            <MenuItem value="southkorea">South Korea</MenuItem>
                            <MenuItem value="southsudan">South Sudan</MenuItem>
                            <MenuItem value="spain">Spain</MenuItem>
                            <MenuItem value="srilanka">Sri Lanka</MenuItem>
                            <MenuItem value="sudan">Sudan</MenuItem>
                            <MenuItem value="suriname">Suriname</MenuItem>
                            <MenuItem value="sweden">Sweden</MenuItem>
                            <MenuItem value="switzerland">Switzerland</MenuItem>
                            <MenuItem value="syria">Syria</MenuItem>
                            <MenuItem value="taiwan">Taiwan</MenuItem>
                            <MenuItem value="tajikistan">Tajikistan</MenuItem>
                            <MenuItem value="tanzania">Tanzania</MenuItem>
                            <MenuItem value="thailand">Thailand</MenuItem>
                            <MenuItem value="timorleste">Timor-Leste</MenuItem>
                            <MenuItem value="togo">Togo</MenuItem>
                            <MenuItem value="tonga">Tonga</MenuItem>
                            <MenuItem value="trinidadandtobago">Trinidad and Tobago</MenuItem>
                            <MenuItem value="tunisia">Tunisia</MenuItem>
                            <MenuItem value="turkey">Turkey</MenuItem>
                            <MenuItem value="turkmenistan">Turkmenistan</MenuItem>
                            <MenuItem value="tuvalu">Tuvalu</MenuItem>
                            <MenuItem value="uganda">Uganda</MenuItem>
                            <MenuItem value="uk">UK</MenuItem>
                            <MenuItem value="ukraine">Ukraine</MenuItem>
                            <MenuItem value="uae">UAE</MenuItem>
                            <MenuItem value="uruguay">Uruguay</MenuItem>
                            <MenuItem value="usa">USA</MenuItem>
                            <MenuItem value="uzbekistan">Uzbekistan</MenuItem>
                            <MenuItem value="vanuatu">Vanuatu</MenuItem>
                            <MenuItem value="vatican">Vatican City</MenuItem>
                            <MenuItem value="venezuela">Venezuela</MenuItem>
                            <MenuItem value="vietnam">Vietnam</MenuItem>
                            <MenuItem value="yemen">Yemen</MenuItem>
                            <MenuItem value="zambia">Zambia</MenuItem>
                            <MenuItem value="zimbabwe">Zimbabwe</MenuItem>
                        </Select>
                    </FormControl>
                )}
                {patientData.checkbox2 && (
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="selectLabTest">Select Lab Test</InputLabel>
                        <Select
                            labelId="LabTest"
                            id="selectLabTest"
                            value={patientData.selectLabTest || ''}
                            onChange={(e) => setPatientData(prevState => ({ ...prevState, selectLabTest: e.target.value }))}
                            label="Select Lab Test"
                        >
                            <MenuItem value="">Select Lab Test</MenuItem>
                            <MenuItem value="serology">Serology</MenuItem>
                            <MenuItem value="urine">Urine</MenuItem>
                            <MenuItem value="stool">Stool</MenuItem>
                            <MenuItem value="hematology">Hematology</MenuItem>
                            <MenuItem value="biochemistry">Biochemestry</MenuItem>
                            <MenuItem value="microbiology">Microbiology</MenuItem>
                        </Select>
                    </FormControl>
                )}
                {patientData.checkbox3 && (
                    <>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="applieduniversity">Applied University</InputLabel>
                            <Select
                                labelId="applieduniversity"
                                id="applieduniversity"
                                value={patientData.applieduniversity || ''}
                                onChange={(e) => setPatientData(prevState => ({ ...prevState, applieduniversity: e.target.value }))}
                                label="Applied University"
                            >
                                <MenuItem value="">
                                    <em>Select University or Institute</em>
                                </MenuItem>
                                <MenuItem value="Tribhuvan University">Tribhuvan University(TU)</MenuItem>
                                <MenuItem value="Kathmandu University">Kathmandu University(KU)</MenuItem>
                                <MenuItem value="Pokhara University">Pokhara University(PU)</MenuItem>
                                <MenuItem value="Purbanchal University">Purbanchal University(pu)</MenuItem>
                                <MenuItem value="Mid-Western University">Mid-Western University</MenuItem>
                                <MenuItem value="Far-Western University">Far-Western University</MenuItem>
                                <MenuItem value="Nepal Open University">Nepal Open University</MenuItem>
                                <MenuItem value="Lumbini Buddhist University">Lumbini Buddhist University</MenuItem>
                                <MenuItem value="Nepal Sanskrit University">Nepal Sanskrit University</MenuItem>
                                <MenuItem value="Agriculture and Forestry University">Agriculture and Forestry University</MenuItem>
                                <MenuItem value="Rajarshi Janak University">Rajarshi Janak University</MenuItem>
                                <MenuItem value="Manmohan Technical University">Manmohan Technical University</MenuItem>
                                <MenuItem value="Madhesh Agriculture University">Madhesh Agriculture University</MenuItem>
                                <MenuItem value="Madhesh University">Madhesh University</MenuItem>
                                <MenuItem value="Madan Bhandari University of Science and Technology">Madan Bhandari University of Science and Technology</MenuItem>
                                <MenuItem value="Gandaki University">Gandaki University</MenuItem>
                                <MenuItem value="Lumbini Technological University">Lumbini Technological University</MenuItem>
                                <MenuItem value="B.P. Koirala Institute of Health Sciences">B.P. Koirala Institute of Health Sciences</MenuItem>
                                <MenuItem value="Patan Academy of Health Science">Patan Academy of Health Science</MenuItem>
                                <MenuItem value="Karnali Academy of Health Sciences">Karnali Academy of Health Sciences</MenuItem>
                                <MenuItem value="Madhesh Institute of Health Sciences">Madhesh Institute of Health Sciences</MenuItem>
                                {/* Add more universities here */}
                                {/* Add more MenuItem components for more options */}
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={scss.textField}>
                            <InputLabel id="applied-insurance-label">Applied Insurance</InputLabel>
                            <Select
                                labelId="applied-insurance-label"
                                id="applied-insurance"
                                value={patientData.appliedinsurance || ''}
                                onChange={(e) => setPatientData(prevState => ({ ...prevState, appliedinsurance: e.target.value }))}
                                label="Applied Insurance"
                            >
                                <MenuItem value="">
                                    <em>Select Insurance Company</em>
                                </MenuItem>
                                <MenuItem value="Rastriya Beema Sansthan">Rastriya Beema Sansthan</MenuItem>
                                <MenuItem value="National Life Insurance Company Limited">National Life Insurance Company Limited</MenuItem>
                                <MenuItem value="Nepal Life Insurance Company Limited">Nepal Life Insurance Company Limited</MenuItem>
                                <MenuItem value="Life Insurance Corporation (Nepal) Limited">Life Insurance Corporation (Nepal) Limited</MenuItem>
                                <MenuItem value="MetLife (ALICO)">MetLife (ALICO)</MenuItem>
                                <MenuItem value="SuryaJyoti Life Insurance Company Limited">SuryaJyoti Life Insurance Company Limited</MenuItem>
                                <MenuItem value="Himalayan Life Insurance Limited">Himalayan Life Insurance Limited</MenuItem>
                                <MenuItem value="Asian Life Insurance Company Limited">Asian Life Insurance Company Limited</MenuItem>
                                <MenuItem value="IME Life Insurance Company Limited">IME Life Insurance Company Limited</MenuItem>
                                <MenuItem value="Reliable Nepal Life Insurance Company Limited">Reliable Nepal Life Insurance Company Limited</MenuItem>
                                <MenuItem value="Sanima Reliance Life Insurance Limited">Sanima Reliance Life Insurance Limited</MenuItem>
                                <MenuItem value="Citizen Life Insurance Limited">Citizen Life Insurance Limited</MenuItem>
                                <MenuItem value="Sun Nepal Life Insurance Company Limited">Sun Nepal Life Insurance Company Limited</MenuItem>
                                <MenuItem value="Prabhu Mahalaxmi Life Insurance Limited">Prabhu Mahalaxmi Life Insurance Limited</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                <FormControl variant="outlined" className={scss.textField}>
                    <InputLabel htmlFor="upload-photo">Upload Photo</InputLabel>
                    <OutlinedInput
                        id="upload-photo"
                        type="file"
                        onChange={handleImageChange}
                    />
                    <Button variant="outlined" onClick={() => setPatientData(prevState => ({ ...prevState, camEnabled: !prevState.camEnabled }))}>
                        {patientData.camEnabled ? "Stop Camera" : "Start Camera"}
                    </Button>
                    {patientData.camEnabled && (
                        <div>
                            <div>
                                <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
                                <div className={scss.overlay} />
                            </div>
                            <Button variant="outlined" onClick={capture}>Capture photo</Button>
                        </div>
                    )}
                </FormControl>
                {patientData.image && (
                    <Box sx={{ width: '100%', height: '100%', mt: 2 }}>
                        <Typography variant="body2">Image Preview:</Typography>
                        <img src={patientData.image.toString()} alt="Preview" style={{ width: '250px', height: '250px' }} />
                    </Box>
                )}
                <Button variant="outlined" type="submit" className={scss.button}>Add Patient</Button>
            </form>
        </Suspense>
    );
});

export default addpatient;
