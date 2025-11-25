import React, { useState, useEffect } from 'react';

// Composant GammeList
function GammeList({ onSelectGamme }) {
  const [gammes, setGammes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/api/gammes')
      .then(res => res.json())
      .then(data => setGammes(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Gammes</h2>
      <table border="1" style={{ margin: 'auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>ManufactRoutingCode</th>
            <th>ManufactRoutingVersion</th>
            <th>PartReference</th>
            <th>PartDescription</th>
          </tr>
        </thead>
        <tbody>
          {gammes.map(g => (
            <tr key={g.Id} onClick={() => onSelectGamme(g.Id)} style={{ cursor: 'pointer' }}>
              <td>{g.Id}</td>
              <td>{g.ManufactRoutingCode}</td>
              <td>{g.ManufactRoutingVersion}</td>
              <td>{g.PartReference}</td>
              <td>{g.PartDescription}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GammeList;
