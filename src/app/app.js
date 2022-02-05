import LayoutComponent from 'components/layout';
import LoadingComponent from 'components/utils/loading';
import { ThemeContextProvider } from 'contexts/theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react/cjs/react.production.min';
import './app.scss';

const HomeScreen = lazy(() => import('screens/home'));
const LoginScreen = lazy(() => import('screens/login'));
const NotFoundScreen = lazy(() => import('screens/not-found'));

const screens = [
  {
    path: '/',
    element: <HomeScreen />,
  },
  {
    path: '/login',
    element: <LoginScreen />,
  },
];

function App() {
  return (
    <ThemeContextProvider>
      <LayoutComponent>
        <Router>
          <Suspense fallback={<LoadingComponent />}>
            <Routes>
              {screens.map(({ path, element }) => (
                <Route element={element} path={path} />
              ))}
              <Route element={<NotFoundScreen />} path='*' />
            </Routes>
          </Suspense>
        </Router>
      </LayoutComponent>
    </ThemeContextProvider>
  );
}

export default App;
