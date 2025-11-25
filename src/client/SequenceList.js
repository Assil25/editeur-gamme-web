import React, { useState, useEffect } from 'react';
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

  return (
    <div>
      <h2>Séquences</h2>
      <table border="1" style={{ margin: 'auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>CycleId</th>
            <th>TypeId</th>
            <th>SeqName</th>
            <th>SeqNr</th>
          </tr>
        </thead>
        <tbody>
          {sequences.map(seq => (
            <tr
              key={seq.Id}
              onClick={() => setSelectedSequence(seq)}
              style={{ cursor: 'pointer', backgroundColor: selectedSequence?.Id === seq.Id ? '#e0e0e0' : 'white' }}
            >
              <td>{seq.Id}</td>
              <td>{seq.CycleId}</td>
              <td>{seq.TypeId}</td>
              <td>{seq.SeqName}</td>
              <td>{seq.SeqNr}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
