import "./App.css";
import "./css/styles.css";
import "./css/sb-admin-2.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Portal from "./portal/Portal";
import Products from "./products/Products";
import Mobile from "./billing/Mobile";
import Gas from "./billing/Gas";
import Broadband from "./billing/Broadband";
import Creditcard from "./billing/Creditcard";
import Donation from "./billing/Donation";
import Mybills from "./billing/Mybills";
import Login from "./login/Login";
import Registration from "./login/Registration";
import Forgotpassword from "./login/Forgotpassword";
import Resetpassword from "./login/Resetpassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/register" element={<Registration />}></Route>
        <Route path="/forgotpassword" element={<Forgotpassword />}></Route>
        <Route path="/passwordReset" element={<Resetpassword />}></Route>
        <Route path="/dashboard" element={<Portal />}>
          <Route path="products/:uId" element={<Products />} />
          <Route path="mobile-recharge/:uId" element={<Mobile />} />
          <Route path="gas-bill/:uId" element={<Gas />} />
          <Route path="broadband-recharge/:uId" element={<Broadband />} />
          <Route path="creditcard-bill/:uId" element={<Creditcard />} />
          <Route path="donation-payment/:uId" element={<Donation />} />
          <Route path="mybills/:uId" element={<Mybills />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
