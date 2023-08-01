import React from 'react';
import NavBar from '../components/Navbar/index';

function Layout({ children }) {
  return (
    <div style={{backgroundColor: 'black', height: '100vh'}}>
      <section>
        <NavBar />
        {children}
      </section>
    </div>
  );
}

export default Layout;
