import React, { useState } from 'react';
import './FormCommon.css';
function AddOperationForm({ gammeId, onOperationAdded }) {
  const [opManufacturingRoutingCode, setopManufacturingRoutingCode] = useState('');
  const [opManufacturingRoutingVersion, setopManufacturingRoutingVersion] = useState('');
  const [NumOP, setNumOP] = useState('');
  const [WorkstationId, setWorkstationId] = useState('');
  const [Position, setPosition] = useState('');
  if (!gammeId) return null; // ne rien afficher si aucune gamme sélectionnée

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!opManufacturingRoutingCode) return alert('Le code de routage manufacturier est obligatoire.');
    if (!opManufacturingRoutingVersion) return alert('La version de routage manufacturier est obligatoire.');

    try {
      const res = await fetch('http://localhost:8081/api/operations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Position,opManufacturingRoutingCode, opManufacturingRoutingVersion, NumOP, WorkstationId, gammeId})
      });

      if (res.ok) {
        alert('✅ Opération ajoutée avec succès !');
        setopManufacturingRoutingCode('');
        setopManufacturingRoutingVersion('');
        setNumOP('');
        setWorkstationId('');
        setPosition('');
        onOperationAdded(); // rafraîchir la liste
      } else {
        const data = await res.json();
        alert(`❌ Erreur lors de l’ajout de l’opération : ${data.error || ''}`);
      }
    } catch (err) {
      console.error('Erreur serveur:', err);
      alert('❌ Erreur serveur.');
    }



  };

  return (
    <form onSubmit={handleSubmit} className="common-form">
      {/* <h3>➕ Ajouter une opération</h3> */}
        <input
        type="number"
        placeholder="position"
        value={Position}
        onChange={(e) => setPosition(e.target.value)}
        required
      />
        <input
        type="text"
        placeholder="NUMOP"
        value={NumOP}
        onChange={(e) => setNumOP(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="opManufacturingRoutingCode"
        value={opManufacturingRoutingCode}
        onChange={(e) => setopManufacturingRoutingCode(e.target.value)}
        required
      />
      
      <input
        type="number"
        placeholder="opManufacturingRoutingVersion"
        value={opManufacturingRoutingVersion}
        onChange={(e) => setopManufacturingRoutingVersion(e.target.value)}
      />

      <input
        type="number"
        placeholder="WorkstationId"
        value={WorkstationId}
        onChange={(e) => setWorkstationId(e.target.value)}
      />
      
      <button type="submit">➕ Ajouter une opération</button>
      <div style={{ height: "1vh"}}></div> 
    </form>
    
  );
}

export default AddOperationForm;
