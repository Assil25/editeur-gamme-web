import React, { useState, useEffect } from 'react';
import TableWithSlider from './TableWithSlider/TableWithSlider'; // chemin vers ton composant

function OperationList({ gammeId, onSelectOperation }) {
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    if (!gammeId) return;

    fetch(`http://localhost:8081/api/operations/gamme/${gammeId}`)
      .then(res => res.json())
      .then(data => setOperations(data))
      .catch(err => console.error(err));
  }, [gammeId]);

  const columns = [
    { key: 'CycleId', label: 'CycleId' },
    { key: 'NumOP', label: 'NumOP' },
    { key: 'WorkstationId', label: 'WorkstationId' },
    { key: 'Position', label: 'Position' },
    { key: 'opManufacturingRoutingCode', label: 'RoutingCode' },
    { key: 'opManufacturingRoutingVersion', label: 'RoutingVersion' },
  ];

  return (
    <div>
      <h2>Opérations</h2>
      <TableWithSlider 
        data={operations} 
        columns={columns} 
        height="40vh"  // hauteur du tableau (40% de la fenêtre)
        width="40vw"   // largeur du tableau (80% de la fenêtre)
        visibleCount={5} 
        onSelect={(op) => onSelectOperation(op.CycleId)}
      />
    </div>
  );
}

export default OperationList;
