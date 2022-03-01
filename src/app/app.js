import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/lexend/400.css';
import '@fontsource/lexend/500.css';
import '@fontsource/lexend/600.css';
import '@fontsource/lexend/700.css';
import '@fontsource/lexend/800.css';
import LayoutComponent from 'components/layout';
import ContainerComponent from 'components/utils/container';
import LoadingComponent from 'components/utils/loading';
import { AuthContextProvider } from 'contexts/auth';
import { SnackbarProvider } from 'contexts/snackbar';
import { ThemeContextProvider } from 'contexts/theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react/cjs/react.production.min';
import AdminRoute from 'routes/admin';
import HasIDRoute from 'routes/has-id';
import NonAuthRoute from 'routes/non-auth';
import PrivateRoute from 'routes/private';
import PublicRoute from 'routes/public';
import UserRoute from 'routes/user';
import './app.scss';

const HistoryScreen = lazy(() => import('screens/history'));
const IDFormScreen = lazy(() => import('screens/id-form'));
const IDPreviewScreen = lazy(() => import('screens/id-preview'));
const SignUpScreen = lazy(() => import('screens/signup'));
const HomeScreen = lazy(() => import('screens/home'));
const LoginScreen = lazy(() => import('screens/login'));
const NotFoundScreen = lazy(() => import('screens/not-found'));
const UsersScreen = lazy(() => import('screens/users'));

const screens = [
  {
    path: '/',
    element: <HomeScreen />,
    ScreenRoute: PrivateRoute,
    fullscreen: true,
  },
  {
    path: 'login',
    element: <LoginScreen />,
    ScreenRoute: NonAuthRoute,
    fullscreen: true,
  },
  {
    path: 'register',
    element: <SignUpScreen />,
    ScreenRoute: NonAuthRoute,
    fullscreen: true,
  },
  {
    path: 'preview',
    element: <IDPreviewScreen />,
    ScreenRoute: HasIDRoute,
    fullscreen: true,
  },
  {
    path: 'preview/:id',
    element: <IDPreviewScreen />,
    ScreenRoute: HasIDRoute,
    fullscreen: true,
  },
  {
    path: 'history',
    element: <HistoryScreen />,
    ScreenRoute: AdminRoute,
    fullscreen: false,
  },
  {
    path: 'form',
    element: <IDFormScreen />,
    ScreenRoute: UserRoute,
    fullscreen: true,
  },
  {
    path: 'students',
    element: <UsersScreen />,
    ScreenRoute: AdminRoute,
    fullscreen: false,
  },
  {
    path: 'students/:uid/:id',
    element: <UsersScreen />,
    ScreenRoute: AdminRoute,
    fullscreen: true,
  },
  {
    path: 'form/:id',
    element: <IDFormScreen />,
    ScreenRoute: UserRoute,
    fullscreen: true,
  },
];

const App = () => {
  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <SnackbarProvider>
          <Router>
            <Suspense fallback={<LoadingComponent />}>
              <LayoutComponent>
                <Routes>
                  {screens.map(
                    (
                      {
                        path,
                        element,
                        fullscreen = false,
                        ScreenRoute = PublicRoute,
                      },
                      index,
                    ) => (
                      <Route
                        key={index}
                        element={
                          <ScreenRoute>
                            <ContainerComponent fullscreen={fullscreen}>
                              {element}
                            </ContainerComponent>
                          </ScreenRoute>
                        }
                        path={path}
                      />
                    ),
                  )}
                  <Route element={<NotFoundScreen />} path='*' />
                </Routes>
              </LayoutComponent>
            </Suspense>
          </Router>
        </SnackbarProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  );
};

export default App;
