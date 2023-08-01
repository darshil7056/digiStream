import React, { useState } from 'react';

const Fiat = () => {
  return (
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <iframe
    style={{
      borderRadius: '4px',
      border: '1px solid #58585f',
      maxWidth: '420px',
      display: 'block'
    }}
    src="https://buy.onramper.com"
    height="630px"
    width="420px"
    title="Onramper widget"
    allow="accelerometer; autoplay; camera; gyroscope; payment"
  />
</div>

  );
};

export default Fiat;
