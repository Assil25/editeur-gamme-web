import React from 'react';
import './TableWithSlider.css';

function TableWithSlider({ data, columns, height = '300px', width = '90%', onSelect }) {
  // height et width peuvent être en px, %, vh, vw, etc.
  return (
    <div 
      className="table-container" 
      style={{ height, width }}
    >
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} onClick={() => onSelect?.(row)}>
                {columns.map(col => (
                  <td key={col.key}>{row[col.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableWithSlider;
