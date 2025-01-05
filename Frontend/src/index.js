import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './Context/ThemeContext';
import { UserProvider } from './Context/UserContext';
import { CaptainProvider } from './Context/CaptainContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <BrowserRouter basename="/ZyloDrive">
            <CaptainProvider>
                <UserProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </UserProvider>
            </CaptainProvider>
        </BrowserRouter>
    </StrictMode>
);
