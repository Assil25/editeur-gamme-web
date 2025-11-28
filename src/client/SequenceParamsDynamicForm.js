// src/client/SequenceParamsDynamicForm.js
import React, { useEffect, useState } from 'react';

function SequenceParamsDynamicForm({ sequenceId, typeId, onSaved }) {
  const [columns, setColumns] = useState([]);
  const [tableName, setTableName] = useState(null);   // <-- AJOUT
  const [values, setValues] = useState({});

  useEffect(() => {
    if (!typeId || !sequenceId) return;

    fetch(`http://localhost:8081/api/params/structure/${typeId}`)
      .then(r => r.json())
      .then(data => {
        // data = { tableName: "...", columns: [...] }
        const colNames = data.columns || [];
        setTableName(data.tableName);                 // <-- AJOUT

        const filtered = colNames.filter(c => c.toLowerCase() !== 'id');
        setColumns(filtered);

        const init = {};
        filtered.forEach(c => {
          init[c] = c === 'SequenceId' ? sequenceId : "";
        });

        setValues(init);
      })
      .catch(err => console.error("Erreur get columns:", err));
  }, [typeId, sequenceId]);

  if (!typeId || !sequenceId) return null;
  if (!columns.length || !tableName) return <p>Chargement du formulaire...</p>;

  const handleChange = (col, val) => {
    setValues(prev => ({ ...prev, [col]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      tableName,     // <-- ENVOYÉ AU BACKEND
      data: {}       // <-- les paramètres dedans
    };

    columns.forEach(c => {
      payload.data[c] = c === 'SequenceId' ? sequenceId : values[c];
    });

    try {
      const res = await fetch(`http://localhost:8081/api/ParamSequence/${sequenceId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Paramètres enregistrés avec succès.');
        if (onSaved) onSaved();
      } else {
        const e = await res.json().catch(() => null);
        console.error("Erreur save params", e);
        alert("Erreur lors de l'enregistrement.");
      }

    } catch (err) {
      console.error("Erreur fetch save params", err);
      alert("Erreur serveur.");
    }
  };

return (
  <div style={{ marginTop: 12 }}>
    <h4>Remplir les paramètres (Type {typeId}) — {tableName}</h4>

    <form onSubmit={handleSubmit}>
      <div className="table-container" style={{ overflowX: 'auto', marginTop: '10px' }}>
        <table>
          <thead>
            <tr>
              {columns.map(col =>
                col !== "SequenceId" && <th key={col}>{col}</th>
              )}
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              {columns.map(col => {
                if (col === "SequenceId") {
                  return <input key={col} type="hidden" value={sequenceId} />;
                }

                return (
                  <td key={col}>
                    <input
                      value={values[col] || ""}
                      onChange={(e) => handleChange(col, e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0px",
                        border: "1px solid #ccc",
                        // borderRadius: "4px"
                      }}
                    />
                  </td>
                );
              })}

              <td>
                <button type="submit">Enregistrer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  </div>
);


}

export default SequenceParamsDynamicForm;
