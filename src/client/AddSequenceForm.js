import React, { useState, useEffect } from 'react';
import './FormCommon.css';
function AddSequenceForm({ CycleId, onSequenceAdd }) {
  const [TypeId, setTypeId] = useState('');
  const [SeqName, setSeqName] = useState('');
  const [SeqNr, setSeqNr] = useState('');
  const [types, setTypes] = useState([]); 
  if (!CycleId) return null; // ne rien afficher si aucune gamme sélectionnée

  useEffect(() => {
    fetch('http://localhost:8081/api/sequences/typeSequences')
      .then(res => res.json())
      .then(data => setTypes(data))
      .catch(err => console.error('Erreur lors du chargement des types :', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!TypeId) return alert('Le TypeId est obligatoire.');
    if (!SeqName) return alert('SeqName est obligatoire.');
    if (!SeqNr) return alert('Le SeqNr est obligatoire.');

    try {
      const res = await fetch('http://localhost:8081/api/sequences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ TypeId,SeqName, SeqNr, CycleId})
      });

      if (res.ok) {
        alert('✅ Sequence ajoutée avec succès !');
        setSeqName('');
        setSeqNr('');
        setTypeId('');
        onSequenceAdd(); // rafraîchir la liste
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
      {/* <h3>➕ Ajouter une séquence</h3> */}
        
      <select
        value={TypeId}
        onChange={(e) => setTypeId(e.target.value)}
        required
      >
        <option value="">-- Choisir un type --</option>
        {types.map(type => (
          <option key={type.Id} value={type.Id}>
            {type.SeqType}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="SeqName"
        value={SeqName}
        onChange={(e) => setSeqName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="SeqNr"
        value={SeqNr}
        onChange={(e) => setSeqNr(e.target.value)}
        required
      />
      
      <button type="submit">➕ Ajouter une séquence</button>
      <div style={{ height: "1vh"}}></div> 
    </form>
  );
}

export default AddSequenceForm;
