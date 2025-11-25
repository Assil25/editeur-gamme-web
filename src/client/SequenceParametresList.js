import React, { useState, useEffect } from 'react';

// Props : sequenceId et typeId
function SequenceParametresList({ sequenceId, typeId }) {
  const [params, setParams] = useState([]);

  useEffect(() => {
    if (!sequenceId || !typeId) return;

    // Déterminer la table correspondant au TypeId
    let tableName;
    switch (typeId) {
      case 1: tableName = 'ParametresComposant'; break;        // Scan Component
      case 2: tableName = 'ParametresCtrlTemperature'; break; // EnvironmentalCondition
      case 3: tableName = 'ParamatresVissage'; break;        // Screwing
      case 4: tableName = 'ParametresPrisedeVue'; break;      // PictureCapture
      case 5: tableName = 'ParamatresPresse'; break;          // Pressing
      case 6: tableName = 'ParametresPrint'; break;           // Print
      case 7: tableName = 'ParametresConsommationEnergie'; break; // EnergyConsumption
      case 8: tableName = 'ParametresRivetage'; break;        // Riveting
      case 9: tableName = 'ParametresToolIdentification'; break; // ToolIdentification
      case 10: tableName = 'ParametresPicking'; break;        // Picking Operator
      case 11: tableName = 'ParametresInstruction'; break;    // Instruction
      case 12: tableName = 'ParametresMoveRobot'; break;      // Move Robot
      case 13: tableName = 'ParametresChauffe'; break;       // Heating
      default: tableName = null;
    }

    if (!tableName) return;

    fetch(`http://localhost:8081/api/${tableName}/${sequenceId}`)
      .then(res => res.json())
      .then(data => setParams(data))
      .catch(err => console.error(err));
  }, [sequenceId, typeId]);

    if (!params || params.length === 0) return <p>Aucun paramètre pour cette séquence.</p>;

  return (
    <div style={{ marginTop: '10px' }}>
      <h3>Paramètres de la séquence</h3>
      <table border="1" cellPadding="5" style={{ width: '100%' }}>
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
