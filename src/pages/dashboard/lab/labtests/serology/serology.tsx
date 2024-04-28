import React from 'react';
import scss from '@/styles/Serology.module.scss';
import { useRouter } from 'next/router';

const Serology = () => {
  // console.log('Rendering Serology...'); // Add this line
  const [RA, setRA] = React.useState('');
  const [ASOT, setASOT] = React.useState('');
  const [CRP, setCRP] = React.useState('');
  const [RPR, setRPR] = React.useState('');
  const [TPH, setTPH] = React.useState('');
  const [HAV, setHAV] = React.useState('');
  const [ELISAHCV, setELISAHCV] = React.useState('');
  const [ELISAHIV, setELISAHIV] = React.useState('');
  const [ELISAHBS, setELISAHBS] = React.useState('');
  const [salmonellaO, setsalmonellaO] = React.useState('');
  const [salmonellaH, setsalmonellaH] = React.useState('');
  const [salmonellaB, setsalmonellaB] = React.useState('');
  const [salmonellaC, setsalmonellaC] = React.useState('');
  const [Dengu, setDengu] = React.useState('');
  const [Dengu2, setDengu2] = React.useState('');
  const router = useRouter();
  const { patientId, selectLabTest } = router.query;

  return (
    <form>
      <div className={scss.container_main}>
        <div className={scss.container}>
          <h2 className={scss.centerText}>Serology Report</h2>
          <div className={scss.table}>
            <table className={scss.tableClass}>
              <thead className={scss.theadClass}>
                <tr>
                  <th>
                    <h2>Test</h2>
                  </th>
                  <th>
                    <h2>Result</h2>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={scss.right}>RA <b>(latex agglutination)</b> : </td>
                  <td><input className={scss.inputClass} placeholder="-" type="text" value={RA} onChange={(e) => setRA(e.target.value)} /></td>
                </tr>
                <tr>
                  <td className={scss.right}>ASOT<b>(Turbidimetric/latex agglutination)</b> : </td>
                  <td><input className={scss.inputClass} placeholder="-" type="text" value={ASOT} onChange={(e) => setASOT(e.target.value)} /></td>
                </tr>
                <tr>
                  <td className={scss.right}>CRP <b>(Latex agglutination)</b> : </td>
                  <td><input className={scss.inputClass} placeholder="-" type="text" value={CRP} onChange={(e) => setCRP(e.target.value)} /></td>
                </tr>
                <tr>
                  <td className={scss.right}>VDRL <b>(RPR)</b> : </td>
                  <td><input className={scss.inputClass} placeholder="-" type="text" value={RPR} onChange={(e) => setRPR(e.target.value)} /></td>
                </tr>
                <tr>
                  <td className={scss.right}>TPHA : </td>
                  <td><input className={scss.inputClass} placeholder="-" type="text" value={TPH} onChange={(e) => setTPH(e.target.value)} /></td>
                </tr>
                <tr>
                  <td className={scss.right}>Anti-HAV : </td>
                  <td><input className={scss.inputClass} placeholder="-" type="text" value={HAV} onChange={(e) => setHAV(e.target.value)} /></td>
                </tr>
                <tr>
                  <td className={scss.right}>HBsAG <b>(ELISA/spot)</b> : </td>
                  <td><input className={scss.inputClass} placeholder="-" type="text" value={ELISAHBS} onChange={(e) => setELISAHBS(e.target.value)} /></td>
                </tr>
                <tr>
                  <td className={scss.right}>Anti-HCV <b>(ELISA/spot)</b> : </td>
                  <td><input className={scss.inputClass} placeholder="-" type="text" value={ELISAHCV} onChange={(e) => setELISAHCV(e.target.value)} /></td>
                </tr>
                <tr>
                  <td className={scss.right}>HIV antibody 1&2 <b>(ELISA/spot)</b> : </td>
                  <td><input className={scss.inputClass} placeholder="-" type="text" value={ELISAHIV} onChange={(e) => setELISAHIV(e.target.value)} /></td>
                </tr>
                <tr>
                  <td colSpan={2}><br /></td>
                </tr>
                <tr>
                  <td className={scss.centerText} colSpan={2}><b>*</b>Widal <b>(salmonella agglutination)</b></td>
                </tr>
                <tr>
                  <td className={scss.right}>salmonella typhi <b>'O'</b> : </td>
                  <td><input className={scss.inputClass} placeholder="-" type="text" value={salmonellaO} onChange={(e) => setsalmonellaO(e.target.value)} /></td>
                </tr>
                <tr>
                  <td className={scss.right}>salmonella typhi <b>'H'</b> : </td>
                  <td><input className={scss.inputClass} placeholder="-" type="text" value={salmonellaH} onChange={(e) => setsalmonellaH(e.target.value)} /></td>
                </tr>
                <tr>
                  <td className={scss.right}>salmonella typhi <b>'AH'</b> : </td>
                  <td><input className={scss.inputClass} placeholder="-" type="text" value={salmonellaB} onChange={(e) => setsalmonellaB(e.target.value)} /></td>
                </tr>
                <tr>
                  <td className={scss.right}>salmonella typhi <b>'BH'</b> : </td>
                  <td><input className={scss.inputClass} placeholder="-" type="text" value={salmonellaC} onChange={(e) => setsalmonellaC(e.target.value)} /></td>
                </tr>
                <tr>
                  <td colSpan={2}><br /></td>
                </tr>
                <tr>
                  <td className={scss.right}>Dengue <b>(NS1 Antigen)</b> : </td>
                  <td className={scss.center}><select value={Dengu} onChange={(e) => setDengu(e.target.value)}>
                    <option value="positive">Positive</option>
                    <option value="negative">Negative</option>
                  </select>
                  </td>
                </tr>
                <tr>
                  <td className={scss.right}>Dengue <b>(IgM/igG Antibody)</b> : </td>
                  <td className={scss.center}><select value={Dengu2} onChange={(e) => setDengu2(e.target.value)}>
                    <option value="positive">Positive</option>
                    <option value="negative">Negative</option>
                  </select>
                  </td>
                </tr>
                <tr>
                  <td className={scss.center} colSpan={2}><br />
                    <hr /><b>Notes : *</b>Titer equal to or more than 1:80 is significant <br />
                    <hr />
                  </td>
                </tr>

                <tr>
                  <td colSpan={2}>
                    <hr /><br />
                    <hr />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={scss.footer}>
            <div className={scss.lab_info}>
              <br /><hr /><br />
              <br />Medical Lab. Technologist
              <br />Miss Rosy Dangol
              <br />A.2220 MLT(PU)
            </div>
            <div className={scss.signature}>
              <br /><hr /><br />Medical Lab. Technician
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Serology;
