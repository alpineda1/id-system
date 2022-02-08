import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}





/*import LayoutComponent from 'components/layout';
import LoadingComponent from 'components/utils/loading';
import { ThemeContextProvider } from 'contexts/theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react/cjs/react.production.min';
import './app.scss';

const HomeScreen = lazy(() => import('screens/home'));
const LoginScreen = lazy(() => import('screens/LoginScreen'));
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

export default App;*/
