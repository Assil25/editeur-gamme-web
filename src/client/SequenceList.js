import React, { useState, useEffect } from 'react';
import TableWithSlider from './TableWithSlider/TableWithSlider';
import SequenceParametresList from './SequenceParametresList';

function SequenceList({ operationId }) {
  const [sequences, setSequences] = useState([]);
  const [selectedSequence, setSelectedSequence] = useState(null);

  // ✔ Correction 1 : fonction correctement fermée
  const fetchSequences = async () => {
    if (!operationId) return;

    try {
      const res = await fetch(`http://localhost:8081/api/sequences/operation/${operationId}`);
      const data = await res.json();
      setSequences(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✔ Correction 2 : useEffect correctement placé et syntaxe OK
  useEffect(() => {
    fetchSequences();
  }, [operationId]);

  const columns = [
    { key: 'Id', label: 'Id' },
    { key: 'CycleId', label: 'CycleId' },
    { key: 'TypeId', label: 'TypeId' },
    { key: 'SeqName', label: 'SeqName' },
    { key: 'SeqNr', label: 'SeqNr' },
  ];

  const updateSequence = async (row) => {
    try {
      const res = await fetch(`http://localhost:8081/api/sequences/${row.Id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          TypeId: row.TypeId,
          SeqName: row.SeqName,
          SeqNr: row.SeqNr,
        }),
      });

      if (res.ok) {
        alert('Sequence mise à jour avec succès');
        fetchSequences();
      } else {
        const err = await res.text();
        console.error('Erreur update:', err);
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
        data={sequences}
        columns={columns}
        width="100%"
        getRowId={(row) => row.Id}
        onSelect={(seq) => setSelectedSequence(seq)}
        onSaveRow={updateSequence}
        // onDeleteRow={deleteSequence} 
      />

      {selectedSequence && (
        <div style={{ marginTop: '5px' }}>
          <h3>Paramètres de la séquence "{selectedSequence.SeqName}"</h3>
          <SequenceParametresList
            sequenceId={selectedSequence.Id}
            typeId={selectedSequence.TypeId}
          />
        </div>
      )}
    </div>
  );
}

export default SequenceList;
