import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {FilterProvider} from './context/filter_context';
import {ProductsProvider} from './context/products_context';
import {CategoriesProvider} from './context/categories_context';

ReactDOM.render(
  <React.StrictMode>
    <CategoriesProvider>
      <ProductsProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </ProductsProvider>
    </CategoriesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

