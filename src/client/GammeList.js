// src/client/GammeList.js
import React, { useState, useEffect } from 'react';
import TableWithSlider from './TableWithSlider/TableWithSlider';

function GammeList({ onSelectGamme }) {
  const [gammes, setGammes] = useState([]);

  // Charger les gammes
  const fetchGammes = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/gammes');
      const data = await res.json();
      setGammes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGammes();
  }, []);

  const columns = [
    { key: 'Id', label: 'Id' },
    { key: 'ManufactRoutingCode', label: 'ManufactRoutingCode' },
    { key: 'ManufactRoutingVersion', label: 'ManufactRoutingVersion' },
    { key: 'PartReference', label: 'PartReference' },
    { key: 'PartDescription', label: 'PartDescription' },
  ];

  // Fonction pour mettre à jour une gamme
  const updateGamme = async (row) => {
    try {
      const res = await fetch(`http://localhost:8081/api/gammes/${row.Id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(row), // row contient Id + colonnes modifiées
      });

      if (res.ok) {
        alert('Gamme mise à jour avec succès');
        fetchGammes(); // recharger la liste
      } else {
        const err = await res.text();
        console.error('Erreur update:', err);
        alert('Erreur lors de la mise à jour');
      }
    } catch (err) {
      console.error('Erreur serveur:', err);
      alert('Erreur serveur');
    }
  };

  return (
    <div>
      <TableWithSlider
        data={gammes}
        columns={columns}
        width="100%"
        onSelect={(g) => onSelectGamme(g.Id)}
        onSaveRow={updateGamme} // bouton save relie ici
        getRowId={row => row.Id} // indique quelle clé est l'ID unique
        // onDeleteRow={deleteGamme} 
      />
    </div>
  );
}

export default GammeList;
