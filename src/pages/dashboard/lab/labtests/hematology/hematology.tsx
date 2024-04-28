
import React, {useState} from 'react';
import scss from '@/styles/Hematology.module.scss';

const hematology = () => {
  const [totalWBCCount, setTotalWBCCount] = React.useState('');
  const [lymphocytes, setLymphocytes] = React.useState('');
  const [monocytes, setMonocytes] = React.useState('');
  const [eosinophils, setEosinophils] = React.useState('');
  const [basophils, setBasophils] = React.useState('');
  const [neutrophils, setNeutrophils] = React.useState('');
  const [hemoglobin, setHemoglobin] = React.useState('');
  const [hematocrit, setHematocrit] = React.useState('');
  const [MCV, setMCV] = React.useState('');
  const [MCH, setMCH] = React.useState('');
  const [MCHC, setMCHC] = React.useState('');
  const [RBCCount, setRBCCount] = React.useState('');
  const [PlateletesCount, setPlateletesCount] = React.useState('');
  const [ReticsCount, setReticsCount] = React.useState('');
  const [ESR, setESR] = React.useState('');
  const [BloodGroup, setBloodGroup] = React.useState('');
  const [BT, setBT] = React.useState('');
  const [CT, setCT] = React.useState('');
  const [MalaraiParasite, setMalaraiParasite] = React.useState('');
  const [Microfilaria, setMicrofilaria] = React.useState('');
  const [others, setOthers] = React.useState('');
  return (
    <div className="container-main">
      <div className="container">
        <h2>Hematology Report</h2>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>
                  <h2>Test</h2>
                </th>
                <th>
                  <h2>Result</h2>
                </th>
                <th>
                  <h2>Normal Range</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="right">Total WBC Count : </td>
                <td><input placeholder="-" type="text" /></td>
                <td className="center">4000-11000 /cumm</td>
              </tr>
              <tr>
                <td className="right">Differential Count &#160;</td>
                
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className="right">Neutrophils : </td>
                <td><input placeholder="-" type="text" /></td>
                <td className="center">40 - 75 %</td>
              </tr>
              <tr>
                <td className="right">Lymphocytes : </td>
                <td><input placeholder="-" type="text" /></td>
                <td className="center">20 - 45 %</td>
              </tr>
              <tr>
                <td className="right">Eosinophils : </td>
                <td><input placeholder="-" type="text" /></td>
                <td className="center">01 - 06 %</td>
              </tr>
              <tr>
                <td className="right">Monocytes : </td>
                <td><input placeholder="-" type="text" /></td>
                <td className="center">02 - 10 %</td>
              </tr>
              <tr>
                <td className="right">Basophils : </td>
                <td><input placeholder="-" type="text" /></td>
                <td className="center">00 - 01 %</td>
              </tr>
              <tr>
                <td className="right">Hemoglobin : </td>
                <td><input placeholder="-" type="text" /></td>
                <td className="center">M: 13.5 - 18.0 gm%</td>
              </tr>
              <tr>
                <td className="right">Hematocrit(PCV) : </td>
                <td><input placeholder="-" type="text" /></td>
                <td className="center">M: 40 - 54 %</td>
              </tr>
              <tr>
                <td className="right">MCV  : </td>
                <td><input placeholder="-" type="text" /></td>
                <td className="center"></td>
              </tr>
              <tr>
                <td className="right">MCH  : </td>
                <td><input placeholder="-" type="text" /></td>
                <td className="center"></td>
              </tr>
              <tr>
                <td className="right">MCHC  : </td>
                <td><input placeholder="-" type="text" /></td>
                <td className="center"></td>
              </tr>
              <tr>
                <td className="right">RBC Count : </td>
                <td><input placeholder="-" type="text" /></td>
                <td className="center">M: 4.5 - 60 million/cumm</td>
              </tr>
              <tr>
                <td className="right">Plateletes Count : </td>
                <td><input placeholder="-" type="text" /></td>
                <td className="center">150000 - 400000 /cumm</td>
              </tr>
              <tr>
                <td className="right">Retics Count : </td>
                <td><input placeholder="-" type="text" /></td>
                <td className="center"> 0 - 2 %</td>
              </tr>
              <tr>
                <td className="right">ESR : </td>
                <td><input placeholder="-" type="text" /></td>
                <td className="center">M: 00 - 10 mm/1st hr</td>
              </tr>
              <tr>
                <td className="right">Blood Group : </td>
                <td className="center"><select>
                  <option value="A-positive">A+</option>
                  <option value="A-negative">A-</option>
                  <option value="B-positive">B+</option>
                  <option value="B-negative">B-</option>
                  <option value="AB-positive">AB+</option>
                  <option value="AB-negative">AB-</option>
                  <option value="O-positive">O+</option>
                  <option value="O-negative">O-</option>
                  <option value="Rh-positive">Rh+</option>
                  <option value="Rh-negative">Rh-</option>
                </select></td>
              </tr>
              <tr>
                <td className="right">BT : </td>
                <td><input type="text" /></td>
                <td className="center">2 - 8 minutes</td>
              </tr>
              <tr>
                <td className="right">CT : </td>
                <td><input type="text" /></td>
                <td className="center">5 - 8 minutes</td>
              </tr>
              <tr>
                <td className="right">Malarai Parasite(MP) : </td>
                <td className="center" colSpan={2}><input className="long-input" type="text" /></td>
              </tr>
              <tr>
                <td className="right">Microfilaria(MF) : </td>
                <td className="center" colSpan={2}><input className="long-input" type="text" /></td>
              </tr>
              <tr>
                <td className="left"><u>Others</u> &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160;
                  &#160;
                  &#160;
                  &#160; &#160; : </td>
                <td className="center" colSpan={2}><input className="long-input" placeholder="-" type="text" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="footer">
          <div className="lab-info">
            <br /><hr /><br />
            <br />Medical Lab. Technologist
            <br />Miss Rosy Dangol
            <br />A.2220 MLT(PU)
          </div>
          <div className="signature">
            <br /><hr />
            <br />Medical Lab. Technician
          </div>
        </div>
      </div>
    </div>
  );
};

export default hematology;
