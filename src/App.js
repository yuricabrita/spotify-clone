import { render } from "react-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { Link, Outlet } from "react-router-dom";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return code ? (
    <div>
      <Dashboard code={code} />
      <Outlet />
    </div>
  ) : (
    <Login />
  );
}
document.body.style = "background: rgba(20,20,255,0.1);";

export default App;
