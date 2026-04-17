import React from 'react';
import '../styles/global.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
