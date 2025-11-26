import React, { useState } from 'react';
import GammeList from './GammeList';
import AddGammeForm from './AddGammeForm';

function GestionGamme({ onSelectGamme }) {
  const [refresh, setRefresh] = useState(false);

  return (
    <div style={{ display: 'flex',flexDirection : 'column' }}>
      <div style={{ flex: 1 }}>
      <AddGammeForm onGammeAdded={() => setRefresh(prev => !prev)} />
         {/* <div style={{ height: "2vh"}}></div>  */}
      </div>
      <div style={{ flex: 1 }}>
      <GammeList
        key={refresh} // pour forcer le re-render
        onSelectGamme={onSelectGamme}/>
      </div>
    </div>
  );
}

export default GestionGamme;