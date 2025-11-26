import React, { useState, useEffect } from 'react';
import TableWithSlider from './TableWithSlider/TableWithSlider';
import SequenceParametresList from './SequenceParametresList';

function SequenceList({ operationId }) {
  const [sequences, setSequences] = useState([]);
  const [selectedSequence, setSelectedSequence] = useState(null);

  useEffect(() => {
    if (!operationId) return;

    fetch(`http://localhost:8081/api/sequences/operation/${operationId}`)
      .then(res => res.json())
      .then(data => setSequences(data))
      .catch(err => console.error(err));
  }, [operationId]);

  const columns = [
    { key: 'Id', label: 'Id' },
    { key: 'CycleId', label: 'CycleId' },
    { key: 'TypeId', label: 'TypeId' },
    { key: 'SeqName', label: 'SeqName' },
    { key: 'SeqNr', label: 'SeqNr' },
  ];

  return (
    <div>
      <h2>Séquences</h2>
      <TableWithSlider
        data={sequences}
        columns={columns}
        height="40vh"  // hauteur du tableau (40% de la fenêtre)
        width="50vw"   // largeur du tableau (80% de la fenêtre)
        visibleCount={5}
        onSelect={(seq) => setSelectedSequence(seq)}
      />

      {selectedSequence && (
        <div style={{ marginTop: '20px' }}>
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
