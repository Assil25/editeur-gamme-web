import React, { useState } from 'react';
import GestionGamme from './GestionGamme';
import GestionOperation from './GestionOperation';
import GestionSequence from './GestionSequence';
import HeaderBar from './HeaderBar/HeaderBar';

function App() {
  const [selectedGammeId, setSelectedGammeId] = useState(null);
  const [selectedOperationId, setSelectedOperationId] = useState(null);
  const [selectedSequenceId, setSelectedSequenceId] = useState(null);
  return (
    <div style={{ padding: '10px' }}>
      <HeaderBar title="Éditeur de Gammes" />
      {/* <h1>Éditeur de Gammes</h1> */}
<div style={{ display: 'flex', flexDirection: 'column', maxHeight: "100vh"}}>
  <div style={{ flex: 1,marginBottom: '0px' }}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <GestionGamme onSelectGamme={id => {
            setSelectedGammeId(id);
            setSelectedOperationId(null);
          }} />
        </div>

        <div style={{ flex: 1 , marginLeft: '20px' }}>
          <GestionOperation
            gammeId={selectedGammeId}
            onSelectOperation={id => setSelectedOperationId(id)}
          />
        </div>
      </div>
 </div>
 <div style={{ flex: 1 }}>
        <GestionSequence 
          operationId={selectedOperationId} 
          onSelectSequence={id => setSelectedSequenceId(id)} />
 </div>
</div>
    </div>
  );
}

export default App;
