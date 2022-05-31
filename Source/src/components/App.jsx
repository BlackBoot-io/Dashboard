import { Routes, Route, BrowserRouter } from "react-router-dom";
import Auth from "components/Auth";
import Home from "components/Home";
import Layout from "components/Layout";
import routes from "config/routes";
import Login from "features/auth/components/Login";
import RecoverPasword from "features/auth/components/RecoverPasword";

function App() {
  return (
    <Routes>
      <Route element={<Auth />}>
        <Route index path={routes.login} element={<Login />} />
        <Route
          index
          path={routes.recoverPassword}
          element={<RecoverPasword />}
        />
      </Route>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route index path={routes.home} element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
