import React, { useState, useEffect } from 'react';
import TableWithSlider from './TableWithSlider/TableWithSlider';

function GammeList({ onSelectGamme }) {
  const [gammes, setGammes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/api/gammes')
      .then(res => res.json())
      .then(data => setGammes(data))
      .catch(err => console.error(err));
  }, []);

  const columns = [
    { key: 'Id', label: 'Id' },
    { key: 'ManufactRoutingCode', label: 'ManufactRoutingCode' },
    { key: 'ManufactRoutingVersion', label: 'ManufactRoutingVersion' },
    { key: 'PartReference', label: 'PartReference' },
    { key: 'PartDescription', label: 'PartDescription' },
  ];

  return (
    <div>
      <h2>Gammes</h2>
      <TableWithSlider
        data={gammes}
        columns={columns}
        height="40vh"  // hauteur du tableau (40% de la fenêtre)
        width="50vw"   // largeur du tableau (80% de la fenêtre)
        onSelect={(g) => onSelectGamme(g.Id)}
      />
    </div>
  );
}

export default GammeList;
