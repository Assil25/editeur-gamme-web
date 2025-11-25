import React, { useState } from 'react';
import GestionGamme from './GestionGamme';
import GestionOperation from './GestionOperation';
import GestionSequence from './GestionSequence';

function App() {
  const [selectedGammeId, setSelectedGammeId] = useState(null);
  const [selectedOperationId, setSelectedOperationId] = useState(null);
  const [selectedSequenceId, setSelectedSequenceId] = useState(null);
  return (
    <div style={{ padding: '20px' }}>
      <h1>Éditeur de Gammes</h1>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <GestionGamme onSelectGamme={id => {
            setSelectedGammeId(id);
            setSelectedOperationId(null);
          }} />
        </div>

        <div style={{ flex: 2 }}>
          <GestionOperation
            gammeId={selectedGammeId}
            onSelectOperation={id => setSelectedOperationId(id)}
          />
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <GestionSequence 
          operationId={selectedOperationId} 
          onSelectSequence={id => setSelectedSequenceId(id)} />
      </div>
    </div>
  );
}

export default App;
