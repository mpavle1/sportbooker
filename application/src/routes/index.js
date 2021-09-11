import Dashboards from '../dashboards';
import CONST from '../constants';

const routes = [
  {
    path: CONST.navigation.HOME_URL,
    exact: true,
    component: Dashboards.Home
  },
  {
    path: CONST.navigation.LOGIN_URL,
    exact: true,
    component: Dashboards.Login
  },
  {
    path: CONST.navigation.REGISTER_URL,
    exact: true,
    component: Dashboards.Register
  },
];

export default routes;
