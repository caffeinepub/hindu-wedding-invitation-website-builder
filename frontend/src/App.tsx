import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import LandingPage from './pages/LandingPage';
import CreateInvitePage from './pages/CreateInvitePage';
import InvitePage from './pages/InvitePage';
import RSVPResponsesPage from './pages/RSVPResponsesPage';

const queryClient = new QueryClient();

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const createRoute_ = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create',
  component: CreateInvitePage,
});

const inviteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/invite/$id',
  component: InvitePage,
});

const rsvpResponsesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/invite/$id/responses',
  component: RSVPResponsesPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  createRoute_,
  inviteRoute,
  rsvpResponsesRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
