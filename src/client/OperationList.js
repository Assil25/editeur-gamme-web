// src/client/OperationList.js
import React, { useState, useEffect } from 'react';
import TableWithSlider from './TableWithSlider/TableWithSlider';

function OperationList({ gammeId, onSelectOperation }) {
  const [operations, setOperations] = useState([]);

  // Charger les opérations d’une gamme
  const fetchOperations = async () => {
    if (!gammeId) return;
    try {
      const res = await fetch(`http://localhost:8081/api/operations/gamme/${gammeId}`);
      const data = await res.json();
      setOperations(data);
    } catch (err) {
      console.error('Erreur fetch opérations:', err);
    }
  };

  useEffect(() => {
    fetchOperations();
  }, [gammeId]);

  const columns = [
    { key: 'CycleId', label: 'CycleId' },
    { key: 'NumOP', label: 'NumOP' },
    { key: 'WorkstationId', label: 'WorkstationId' },
    { key: 'Position', label: 'Position' },
    { key: 'opManufacturingRoutingCode', label: 'RoutingCode' },
    { key: 'opManufacturingRoutingVersion', label: 'RoutingVersion' },
  ];

  // Fonction pour mettre à jour une opération
  const updateOperation = async (row) => {
    try {
      const res = await fetch(`http://localhost:8081/api/operations/${row.CycleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Position: row.Position,
          NumOP: row.NumOP,
          WorkstationId: row.WorkstationId,
          opManufacturingRoutingCode: row.opManufacturingRoutingCode,
          opManufacturingRoutingVersion: row.opManufacturingRoutingVersion,
          // reference de la gamme ne doit pas etre modifable
        }),
      });

      if (res.ok) {
        alert('Opération mise à jour avec succès');
        fetchOperations(); // recharger la liste
      } else {
        const err = await res.text();
        // console.error('Erreur update:', err);
        alert('Erreur lors de la mise à jour');
      }
    } catch (err) {
      console.error('Erreur serveur:', err);
      alert('Erreur serveur');
    }
  };

  return (
    <div>
      <TableWithSlider
        data={operations}
        columns={columns}
        width="100%"
        getRowId={(row) => row.CycleId} // identifiant unique
        onSelect={(op) => onSelectOperation(op.CycleId)}
        onSaveRow={updateOperation}     // bouton 💾
        // onDeleteRow={deleteOperation} 
      />
    </div>
  );
}

export default OperationList;
