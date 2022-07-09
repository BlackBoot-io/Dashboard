const routes = {
  auth: "auth",
  login: "login",
  signup: "signup",
  splash:"splash",
  recoverPassword: "recoverPassword",
  profile: "profile",
  home: "home",
  dashboard: "dashboard",
  transactions: "transactions",
  crowdsaleSchedule: "crowdsale-schedule",
  buyToken: "buy-token",
  withdrawToken: "withdraw-token",
  notifications: "notifications",
};
export const navigateTo = Object.keys(routes).reduce(
  (acc, k) => ({ ...acc, [k]: `/${routes[k]}` }),
  {}
);
export default routes;
