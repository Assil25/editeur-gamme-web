import React, { useState, useEffect } from 'react';

function OperationList({ gammeId, onSelectOperation }) {
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    if (!gammeId) return;

    fetch(`http://localhost:8081/api/operations/gamme/${gammeId}`)
      .then(res => res.json())
      .then(data => setOperations(data))
      .catch(err => console.error(err));
  }, [gammeId]);

  return (
    <div>
      <h2>Opérations</h2>
      <table border="1" style={{ margin: 'auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
             <th>CycleId</th>
            <th>NumOP</th>
            <th>WorkstationId</th>
            <th>Position</th>
            <th>opManufacturingRoutingCode</th>
            <th>opManufacturingRoutingVersion</th>
          </tr>
        </thead>
        <tbody>
          {operations.map((op, index) => (
            <tr 
              key={index} 
              onClick={() => onSelectOperation(op.CycleId)} 
              style={{ cursor: 'pointer' }}
            >
              <td>{op.CycleId}</td>
              <td>{op.NumOP}</td>
              <td>{op.WorkstationId}</td>
              <td>{op.Position}</td>
              <td>{op.opManufacturingRoutingCode}</td>
              <td>{op.opManufacturingRoutingVersion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OperationList;
