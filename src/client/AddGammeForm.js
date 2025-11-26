import React, { useState } from 'react';
import './FormCommon.css';
function AddGammeForm({ onGammeAdded }) {
  const [ManufactRoutingCode, setManufactRoutingCode] = useState('');
  const [ManufactRoutingVersion, setManufactRoutingVersion] = useState('');
  const [PartReference, setPartReference] = useState('');
  const [PartDescription, setPartDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ManufactRoutingCode) return alert('Le code de routage manufacturier est obligatoire.');
    if (!ManufactRoutingVersion) return alert('La version de routage manufacturier est obligatoire.');
    if (!PartReference) return alert('La référence de la pièce est obligatoire.');
    if (!PartDescription) return alert('La description de la pièce est obligatoire.');

    const res = await fetch('http://localhost:8081/api/gammes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ManufactRoutingCode, ManufactRoutingVersion, PartReference, PartDescription}),
    });

    if (res.ok) {
      alert('Gamme ajoutée avec succès.');
      setManufactRoutingCode('');
      setManufactRoutingVersion('');
      setPartReference('');
      setPartDescription('');
      onGammeAdded(); // actualise la liste
    } else {
      alert('Erreur lors de l’ajout de la gamme.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="common-form">
      <h3>➕ Ajouter une gamme</h3>
      <input
        type="text"
        placeholder="ManufactRoutingCode"
        value={ManufactRoutingCode}
        onChange={(e) => setManufactRoutingCode(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="ManufactRoutingVersion"
        value={ManufactRoutingVersion}
        onChange={(e) => setManufactRoutingVersion(e.target.value)}
      />
      <input
        type="text"
        placeholder="PartReference"
        value={PartReference}
        onChange={(e) => setPartReference(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="PartDescription"
        value={PartDescription}
        onChange={(e) => setPartDescription(e.target.value)}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default AddGammeForm;
