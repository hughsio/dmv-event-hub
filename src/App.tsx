import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import { ClerkProviderWrapper } from './providers/ClerkProvider';
import AppRoutes from './routes';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ClerkProviderWrapper>
        <TooltipProvider>
          <UserProvider>
            <Toaster />
            <AppRoutes />
          </UserProvider>
        </TooltipProvider>
      </ClerkProviderWrapper>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
