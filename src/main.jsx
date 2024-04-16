import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import { MaterialTailwindControllerProvider } from '@/context';
import '../public/css/tailwind.css';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apollo';
import App from './App';
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <SnackbarProvider maxSnack={10}>
            <MaterialTailwindControllerProvider>
              <App />
            </MaterialTailwindControllerProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  </ApolloProvider>
);
