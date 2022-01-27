import LoadingComponent from 'components/utils/loading';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react/cjs/react.production.min';
import './app.scss';

const LoginScreen = lazy(() => import('screens/login'));
const NotFoundScreen = lazy(() => import('screens/not-found'));

const screens = [
  {
    path: '/login',
    element: <LoginScreen />,
  },
];

function App() {
  return (
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
  );
}

export default App;
