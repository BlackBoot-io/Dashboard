import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "components/Auth";
import Panel from "components/Panel";
import routes from "config/routes";
import Login from "components/Auth/comps/Login";
import RecoverPasword from "components/Auth/comps/RecoverPasword";
import Signup from "components/Auth/comps/Signup";
import Transaction from "./Panel/Transaction/Index";
import BuyToken from "./Panel/BuyToken";
import WithdrawToken from "./Panel/WithdrawToken";
import Profile from "./Panel/Profile";
import Utils from "config/utils";
import storageKeys from "config/storageKeys";
import { dark } from "redux/theme";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (Utils.getStoredData(storageKeys.theme)) {
      document.getElementsByTagName("body")[0].classList.add("dark");
      dispatch(dark());
    }
  }, []);
  return (
    <Routes>
      <Route path={routes.auth} element={<Auth />}>
        <Route index path={routes.login} element={<Login />} />
        <Route path={routes.signup} element={<Signup />} />
        <Route path={routes.recoverPassword} element={<RecoverPasword />} />
      </Route>
      <Route element={<Panel />}>
        <Route index element={<Transaction />} />
        <Route path={routes.transactions} element={<Transaction />} />
        <Route path={routes.buyToken} element={<BuyToken />} />
        <Route path={routes.withdrawToken} element={<WithdrawToken />} />
        <Route path={routes.profile} element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
