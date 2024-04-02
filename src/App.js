import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import CoachesPage from './pages/CoachesPage';
import CalendarPage from './pages/CalendarPage';
import SlotsPage from './pages/SlotsPage';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <CoachesPage />,
  },
  {
    path: '/coaches/:coachId/calendar',
    element: <CalendarPage />,
  },
  {
    path: '/coaches/:coachId/calendar/:date',
    element: <SlotsPage />,
  },
]);

const App = () => (
  <div className="App">
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  </div>
);

export default App;
