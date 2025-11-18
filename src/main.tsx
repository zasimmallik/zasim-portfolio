import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from 'next-themes';
import { ErrorBoundary } from '@/components/shared';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

createRoot(rootElement).render(
  <ErrorBoundary>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <StrictMode>
        <App />
      </StrictMode>
    </ThemeProvider>
  </ErrorBoundary>,
);


