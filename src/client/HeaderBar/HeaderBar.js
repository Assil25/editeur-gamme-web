import React from 'react';
import './HeaderBar.css';

function HeaderBar({ title }) {
  return (
    <header className="header-bar">
      <h1 className="header-title">{title}</h1>
    </header>
  );
}

export default HeaderBar;
