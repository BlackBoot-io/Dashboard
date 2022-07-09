import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import routes, { navigateTo } from "config/routes";
import Utils from "config/utils";
import storageKeys from "config/storageKeys";
import { dark } from "redux/theme";
import Splash from "./Splash";
const Auth = lazy(() => import("components/Auth"));
const Panel = lazy(() => import("components/Panel"));
const Login = lazy(() => import("components/Auth/comps/Login"));
const RecoverPasword = lazy(() =>
  import("components/Auth/comps/RecoverPasword")
);
const Signup = lazy(() => import("components/Auth/comps/Signup"));
const Transaction = lazy(() => import("components/Panel/Transaction"));
const BuyToken = lazy(() => import("components/Panel/BuyToken"));
const WithdrawToken = lazy(() => import("components/Panel/WithdrawToken"));
const CrowdsaleSchedule = lazy(() =>
  import("components/Panel/CrowdsaleSchedule")
);
const Profile = lazy(() => import("components/Panel/Profile"));
const Dashboard = lazy(() => import("components/Panel/Dashboard"));
const Notifications = lazy(() => import("components/Panel/Notifications"));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (Utils.getStoredData(storageKeys.theme)) {
      document.getElementsByTagName("body")[0].classList.add("dark");
      dispatch(dark());
    }
  }, []);
  return (
    <Suspense fallback={<Splash doNothing={true}/>}>
      <Routes>
        <Route path={routes.auth} element={<Auth />}>
          <Route index path={routes.login} element={<Login />} />
          <Route path={routes.signup} element={<Signup />} />
          <Route path={routes.recoverPassword} element={<RecoverPasword />} />
        </Route>
        <Route element={<Panel />}>
          <Route index element={<Dashboard />} />
          <Route path={routes.dashboard} element={<Dashboard />} />
          <Route path={routes.transactions} element={<Transaction />} />
          <Route path={routes.buyToken} element={<BuyToken />} />
          <Route path={routes.withdrawToken} element={<WithdrawToken />} />
          <Route
            path={routes.crowdsaleSchedule}
            element={<CrowdsaleSchedule />}
          />
          <Route path={routes.profile} element={<Profile />} />
          <Route path={routes.notifications} element={<Notifications />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
