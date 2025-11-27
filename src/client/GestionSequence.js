import React, { useState } from 'react';
import SequenceList from './SequenceList';
import AddSequenceForm from './AddSequenceForm';

function GestionSequence({ operationId, onSelectSequence }) {
  const [refresh, setRefresh] = useState(false);

  if (!operationId) return null;

  return (
    <div style={{ display: 'flex',flexDirection : 'column' }}>
      <h2 style={{marginBottom :"0vh"}}>Séquences</h2>
      <div style={{ flex: 1 }}>
      <AddSequenceForm CycleId={operationId} onSequenceAdd={() => setRefresh(prev => !prev)} />
      </div>
      <div style={{ flex: 1 }}>
      <SequenceList 
        key={refresh}
        operationId={operationId} 
        onSelectOperation={onSelectSequence} />
      </div>
    </div>
  );
}

export default GestionSequence;
