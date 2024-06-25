// import {BrowserRouter, Routes, Route} from "react-router-dom";
// import ProductList from "./components/ProductList";
// import AddProduct from "./components/AddProduct";
// import EditProduct from "./components/EditProduct";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<ProductList/>}/>
//         <Route path="add" element={<AddProduct/>}/>
//         <Route path="edit/:id" element={<EditProduct/>}/>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

function App() {
  const [connectionMessage, setConnectionMessage] = useState('');

  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        const response = await fetch('https://calm-nature-production.up.railway.app/products'); // Assuming there's a health check endpoint
        if (response.ok) {
          setConnectionMessage('Successfully connected to the backend!');
        } else {
          setConnectionMessage('Failed to connect to the backend.');
        }
      } catch (error) {
        setConnectionMessage('Failed to connect to the backend.');
      }
    };

    checkBackendConnection();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <div>
          <p>{connectionMessage}</p>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="edit/:id" element={<EditProduct />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

