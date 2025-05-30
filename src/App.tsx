import './App.css';
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Layout from '@/components/Layout';
import Pedidos from '@/pages/Pedidos';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Layout>
        <Pedidos />
      </Layout>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;