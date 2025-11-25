import React, { useState } from 'react';
import GammeList from './GammeList';
import AddGammeForm from './AddGammeForm';

function GestionGamme({ onSelectGamme }) {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <AddGammeForm onGammeAdded={() => setRefresh(prev => !prev)} />
      <GammeList
        key={refresh} // pour forcer le re-render
        onSelectGamme={onSelectGamme}
      />
    </div>
  );
}

export default GestionGamme;
