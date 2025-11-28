import React, { useState } from 'react';
import OperationList from './OperationList';
import AddOperationForm from './AddOperationForm';

function GestionOperation({ gammeId, onSelectOperation }) {
  const [refresh, setRefresh] = useState(false);

  if (!gammeId) return null;

  return (
    <div style={{ display: 'flex',flexDirection : 'column' }}>
      <h2 style={{marginBottom :"0vh"}}>Opérations</h2>
       <div >
      <AddOperationForm gammeId={gammeId} onOperationAdded={() => setRefresh(prev => !prev)} />
       </div>
       <div >
      <OperationList
        key={refresh}
        gammeId={gammeId}
        onSelectOperation={onSelectOperation}
      />
       </div>
    </div>
  );
}

export default GestionOperation;