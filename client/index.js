import React from 'react';
import { createRoot } from 'react-dom/client';

import styles from './_styles.scss';
import App from './app/App.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
    <App />
);