import React, { useState, useEffect } from 'react';
import './TableWithSlider/TableWithSlider.css'; // ton style existant

function SequenceParametresList({ sequenceId, typeId }) {
  const [params, setParams] = useState([]);

  useEffect(() => {
    if (!sequenceId || !typeId) return;

    let tableName;
    switch (typeId) {
      case 1: tableName = 'ParametresComposant'; break;
      case 2: tableName = 'ParametresCtrlTemperature'; break;
      case 3: tableName = 'ParamatresVissage'; break;
      case 4: tableName = 'ParametresPrisedeVue'; break;
      case 5: tableName = 'ParamatresPresse'; break;
      case 6: tableName = 'ParametresPrint'; break;
      case 7: tableName = 'ParametresConsommationEnergie'; break;
      case 8: tableName = 'ParametresRivetage'; break;
      case 9: tableName = 'ParametresToolIdentification'; break;
      case 10: tableName = 'ParametresPicking'; break;
      case 11: tableName = 'ParametresInstruction'; break;
      case 12: tableName = 'ParametresMoveRobot'; break;
      case 13: tableName = 'ParametresChauffe'; break;
      default: tableName = null;
    }

    if (!tableName) return;

    fetch(`http://localhost:8081/api/${tableName}/${sequenceId}`)
      .then(res => res.json())
      .then(data => setParams(data))
      .catch(err => console.error(err));
  }, [sequenceId, typeId]);

  if (!params || params.length === 0) 
    return <p>Aucun paramètre pour cette séquence.</p>;

  return (
    <div className="table-container" style={{ height: '7vh', overflow: 'auto', marginTop: '10px' }}>
      <table>
        <thead>
          <tr>
            {Object.keys(params[0]).map(col => <th key={col}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {params.map((row, idx) => (
            <tr key={idx}>
              {Object.values(row).map((val, i) => <td key={i}>{val}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SequenceParametresList;
