import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout.jsx';
import Login from "./pages/users/Login.jsx";
import Register from "./pages/users/Register.jsx";

const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout /> }>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App
