import React, { useState } from 'react';
import './TableWithSlider.css';

function TableWithSlider({ data, columns, height = '300px', width = '90%', onSelect, onSaveRow, getRowId }) {
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [contextMenu, setContextMenu] = useState(null);

  /** Clic droit : ouvrir menu */
  const handleRightClick = (e, row) => {
    e.preventDefault();
    setContextMenu({
      mouseX: e.clientX + 4,
      mouseY: e.clientY - 6,
      row,
    });
  };

  /** Lancer l'édition */
  const startEditing = (row, index) => {
    const id = getRowId ? getRowId(row) : row.Id ?? row.id ?? index;
    setEditingId(id);
    setEditValues({ ...row });
    setContextMenu(null);
  };
  // const deleteRow =(row,index) => {
  //   const id = getRowId ? getRowId(row) : row.Id ?? row?id ?? index;
  //   setDeletingId(id);
  //   setContextMenu(null);
  // }

  /** Gérer les modifications */
  const handleChange = (key, val) => {
  setEditValues(prev => ({ ...prev, [key]: val }));
  };

  /** Sauvegarder */
  const saveEdit = async () => {
    if (onSaveRow) await onSaveRow(editValues);
    
    setEditingId(null);
  };

  /** Annuler */
  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  return (
    <div className="table-container" style={{ height, width }}>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key}>{col.label}</th>
              ))}
              <th></th> {/* Colonne actions */}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => {
              const rowId = getRowId ? getRowId(row) : row.Id ?? row.id ?? index;
              const isEditing = editingId === rowId;

              return (
                <tr
                  key={rowId}
                  onClick={() => onSelect?.(row)}
                  onContextMenu={(e) => handleRightClick(e, row)}
                >
                  {columns.map(col => (
                    <td key={col.key}>
                      {isEditing ? (
                        <input
                          value={editValues[col.key]}
                          onChange={e => handleChange(col.key, e.target.value)}
                          style={{ width: "100%" }}
                        />
                      ) : (
                        row[col.key]
                      )}
                    </td>
                  ))}

                  {/* actions */}
                  <td style={{ width: 80 }}>
                    {isEditing ? (
                      <>
                        <button onClick={saveEdit}>💾</button>
                        <button onClick={cancelEdit}>✖</button>
                      </>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MENU CONTEXTUEL */}
      {contextMenu && (
        <ul
          style={{
            position: "fixed",
            top: contextMenu.mouseY,
            left: contextMenu.mouseX,
            background: "#fff",
            border: "1px solid #ccc",
            padding: 5,
            listStyle: "none",
            zIndex: 9999,
          }}
        >
          <li
            style={{ padding: "6px 20px", cursor: "pointer" }}
            onClick={() => startEditing(contextMenu.row, data.indexOf(contextMenu.row))}
          >
            ✏️ Éditer
          </li>
        </ul>
      )}
    </div>
  );
}

export default TableWithSlider;
