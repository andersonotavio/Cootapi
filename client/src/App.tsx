import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import QuemSomos from "./pages/QuemSomos";
import Contrate from "./pages/Contrate";
import Atuacao from "./pages/Atuacao";
import Noticias from "./pages/Noticias";
import Inscricao from "./pages/Inscricao";
import AreaCooperado from "./pages/AreaCooperado";
import Admin from "./pages/Admin";
import Layout from "./components/Layout";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/quem-somos" component={QuemSomos} />
        <Route path="/contrate" component={Contrate} />
        <Route path="/atuacao" component={Atuacao} />
        <Route path="/noticias" component={Noticias} />
        <Route path="/inscricao" component={Inscricao} />
        <Route path="/cooperado" component={AreaCooperado} />
        <Route path="/admin" component={Admin} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
