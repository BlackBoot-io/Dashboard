import { Routes, Route } from "react-router-dom";
import Auth from "components/Auth";
import Home from "components/Home";
import Layout from "components/comps/Layout";
import routes from "config/routes";
import Login from "components/Auth/comps/Login";
import RecoverPasword from "components/Auth/comps/RecoverPasword";
import Signup from "components/Auth/comps/Signup";

function App() {
  return (
    <Routes>
      <Route element={<Auth />}>
        <Route index path={routes.login} element={<Login />} />
        <Route path={routes.signup} element={<Signup />} />
        <Route path={routes.recoverPassword} element={<RecoverPasword />} />
      </Route>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route index path={routes.home} element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
