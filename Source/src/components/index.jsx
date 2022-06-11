import { Routes, Route } from "react-router-dom";
import Auth from "components/Auth";
import Panel from "components/Panel";
import routes from "config/routes";
import Login from "components/Auth/comps/Login";
import RecoverPasword from "components/Auth/comps/RecoverPasword";
import Signup from "components/Auth/comps/Signup";
import Transaction from "./Panel/Transaction/transaction";
import BuyToken from "./Panel/BuyToken";
import WithdrawToken from "./Panel/WithdrawToken/withdrawToken";

function App() {
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
            </Route>
        </Routes>
    );
}

export default App;
