import React, { useState, useEffect } from 'react';
import TableWithSlider from './TableWithSlider/TableWithSlider';

function SequenceParametresList({ sequenceId, typeId }) {
  const [params, setParams] = useState([]);
  const [columns, setColumns] = useState([]);

  const tableMap = {
    1: 'ParametresComposant',
    2: 'ParametresCtrlTemperature',
    3: 'ParamatresVissage',
    4: 'ParametresPrisedeVue',
    5: 'ParamatresPresse',
    6: 'ParametresPrint',
    7: 'ParametresConsommationEnergie',
    8: 'ParametresRivetage',
    9: 'ParametresToolIdentification',
    10: 'ParametresPicking',
    11: 'ParametresInstruction',
    12: 'ParametresMoveRobot',
    13: 'ParametresChauffe'
  };

  const resolvedTableName = tableMap[typeId];

  const fetchData = async () => {
    if (!sequenceId || !typeId) return;

    try {
      const res = await fetch(`http://localhost:8081/api/${resolvedTableName}/${sequenceId}`);
      const data = await res.json();

      if (data.length > 0) {
        // Colonnes visibles sauf Id et SequenceId
        const visibleCols = Object.keys(data[0])
          .filter(c => c !== "Id" && c !== "SequenceId")
          .map(c => ({ key: c, label: c }));

        setColumns(visibleCols);
        setParams(data);
        return;
      }

      // Table vide → charger structure
      const resStruct = await fetch(`http://localhost:8081/api/params/structure/${typeId}`);
      const struct = await resStruct.json();

      const visibleCols = struct.columns
        .filter(c => c !== "Id" && c !== "SequenceId")
        .map(c => ({ key: c, label: c }));

      setColumns(visibleCols);

      // Ligne vide avec SequenceId auto assigné
      const emptyRow = {};
      struct.columns.forEach(col => {
        if (col === "SequenceId") emptyRow[col] = sequenceId;
        else emptyRow[col] = "";
      });

      setParams([emptyRow]);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sequenceId, typeId]);

  const saveParams = async (row) => {
  try {
    // On n'a plus besoin de vérifier Id, car on fait toujours un update
    const res = await fetch(`http://localhost:8081/api/params/${sequenceId}`, {
      method: 'PUT',  // <-- ici on change POST en PUT
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tableName: resolvedTableName,
        data: row
      })
    });

    if (res.ok) {
      alert("Paramètres mis à jour !");
      fetchData(); // recharger les données après update
    } else {
      const errText = await res.text();
      alert("Erreur lors de la mise à jour : " + errText);
    }

  } catch (err) {
    console.error(err);
    alert("Erreur serveur lors de la mise à jour");
  }
};

  return (
    <div style={{ marginTop: "10px" }}>
      <TableWithSlider
        data={params}
        columns={columns} 
        width="100%"
        getRowId={(row) => row.Id || "new"}
        onSaveRow={saveParams}
      />
    </div>
  );
}

export default SequenceParametresList;
