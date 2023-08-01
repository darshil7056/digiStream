import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { MoralisProvider } from 'react-moralis'
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import "bootstrap/dist/js/bootstrap.bundle.min";
// // import "font-awesome/css/font-awesome.min.css"; 
//    const moralisServerURL ="https://nrbbwcbnp5gu.grandmoralis.com:2053/server";
//   const moralisAppId ="ZvfYAjzru3QbHAEzhf2UydWE20TpwgMIBDB7IFfD";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     {/* <MoralisProvider appId={moralisAppId} serverUrl={moralisServerURL}> */}
    <App />
  {/* </MoralisProvider>, */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
