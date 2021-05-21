import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';
import ProtectedRoute from './helpers/protected.route';
import IsUserLoggedIn from './helpers/is-usr-logged-in';

// eslint-disable-next-line import/no-unresolved
const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const NotFound = lazy(() => import('./pages/not-found'));
const Dashboard = lazy(() => import('./pages/dashboard'));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading......</p>}>
          <Switch>
            <IsUserLoggedIn loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN} user={user}>
              <Login />
            </IsUserLoggedIn>

            <IsUserLoggedIn loggedInPath={ROUTES.DASHBOARD} path={ROUTES.SIGN_UP} user={user}>
              <SignUp />
            </IsUserLoggedIn>
            <Route path={ROUTES.PROFILE} component={Profile} />
            <ProtectedRoute path={ROUTES.DASHBOARD} user={user} exact>
              <Dashboard />
            </ProtectedRoute>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
