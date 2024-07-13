import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <Header />
    <main id="mainSection" className="usa-section">
      <Outlet />
    </main>
    <Footer />
  </QueryClientProvider>
);
