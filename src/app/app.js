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
      <Router>
        <LayoutComponent>
          <Suspense fallback={<LoadingComponent />}>
            <Routes>
              {screens.map(({ path, element }, index) => (
                <Route key={index} element={element} path={path} />
              ))}
              <Route element={<NotFoundScreen />} path='*' />
            </Routes>
          </Suspense>
        </LayoutComponent>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
