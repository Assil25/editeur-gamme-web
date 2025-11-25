import React, { useState } from 'react';
import SequenceList from './SequenceList';
import AddSequenceForm from './AddSequenceForm';

function GestionSequence({ operationId, onSelectSequence }) {
  const [refresh, setRefresh] = useState(false);

  if (!operationId) return null;

  return (
    <div>
      <AddSequenceForm CycleId={operationId} onSequenceAdd={() => setRefresh(prev => !prev)} />
      <SequenceList 
        key={refresh}
        operationId={operationId} 
        onSelectOperation={onSelectSequence} />
      
    </div>
  );
}

export default GestionSequence;
