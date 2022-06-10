import { Routes, Route } from "react-router-dom";
import Auth from "components/Auth";
import Home from "components/Panel/Home";
import Panel from "components/Panel";
import routes from "config/routes";
import Login from "components/Auth/comps/Login";
import RecoverPasword from "components/Auth/comps/RecoverPasword";
import Signup from "components/Auth/comps/Signup";
import Transaction from "./Panel/Transaction/transaction";
import BuyToken from "./Panel/BuyToken/buyToken";
import WithdrawToken from "./Panel/WithdrawToken/withdrawToken";
import Profile from "./Panel/Profile";

function App() {
    return (
        <Routes>
            <Route path={routes.auth} element={<Auth />}>
                <Route index path={routes.login} element={<Login />} />
                <Route path={routes.signup} element={<Signup />} />
                <Route path={routes.recoverPassword} element={<RecoverPasword />} />
            </Route>
            <Route element={<Panel />}>
                <Route index element={<Home />} />
                <Route path={routes.home} element={<Home />} />
                <Route path={routes.transactions} element={<Transaction />} />
                <Route path={routes.buyToken} element={<BuyToken />} />
                <Route path={routes.withdrawToken} element={<WithdrawToken />} />
                <Route path={routes.profile} element={<Profile />} />
            </Route>
        </Routes>
    );
}

export default App;
