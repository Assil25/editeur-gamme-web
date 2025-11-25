import React, { useState } from 'react';
import OperationList from './OperationList';
import AddOperationForm from './AddOperationForm';

function GestionOperation({ gammeId, onSelectOperation }) {
  const [refresh, setRefresh] = useState(false);

  if (!gammeId) return null;

  return (
    <div>
      <AddOperationForm gammeId={gammeId} onOperationAdded={() => setRefresh(prev => !prev)} />
      <OperationList
        key={refresh}
        gammeId={gammeId}
        onSelectOperation={onSelectOperation}
      />
    </div>
  );
}

export default GestionOperation;
