import { createBrowserRouter } from 'react-router-dom';
import App from './App.js';
import { CreateProduct } from './pages/CreateProduct/CreateProduct.jsx';
import { Main } from './pages/Main/Main.jsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <Main/>
            },
            {
                path: 'add-product',
                element: <CreateProduct/>
            }
        ],
    }
]);