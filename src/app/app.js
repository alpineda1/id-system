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
import LoadingComponent from 'components/utils/loading';
import { AuthContextProvider } from 'contexts/auth';
import { ThemeContextProvider } from 'contexts/theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react/cjs/react.production.min';
import NonAuthRoute from 'routes/non-auth';
import PrivateRoute from 'routes/private';
import PublicRoute from 'routes/public';
import SignUpScreen from 'screens/signup';
import './app.scss';

const HomeScreen = lazy(() => import('screens/home'));
const LoginScreen = lazy(() => import('screens/login'));
const NotFoundScreen = lazy(() => import('screens/not-found'));

const screens = [
  {
    path: '/',
    element: <HomeScreen />,
    ScreenRoute: PrivateRoute,
  },
  {
    path: '/login',
    element: <LoginScreen />,
    ScreenRoute: NonAuthRoute,
  },
  {
    path: '/register',
    element: <SignUpScreen />,
    ScreenRoute: NonAuthRoute,
  },
];

const App = () => {
  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <Router>
          <Suspense fallback={<LoadingComponent />}>
            <LayoutComponent>
              <Routes>
                {screens.map(
                  ({ path, element, ScreenRoute = PublicRoute }, index) => (
                    <Route
                      key={index}
                      element={<ScreenRoute>{element}</ScreenRoute>}
                      path={path}
                    />
                  ),
                )}
                <Route element={<NotFoundScreen />} path='*' />
              </Routes>
            </LayoutComponent>
          </Suspense>
        </Router>
      </ThemeContextProvider>
    </AuthContextProvider>
  );
};

export default App;
