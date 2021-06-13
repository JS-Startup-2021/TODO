import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TodoPage from "./components/pages/TodoPage";
import ChartPage from "./components/pages/ChartPage";
function App() {
  return (
    <Router>
      <div>
        <ul className={"Navbar"}>
          <li>
            <Link className={"Nav"} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={"Nav"} to="/ChartPage">
              Chart
            </Link>
          </li>
        </ul>

        <Switch>
          <Route path="/chartPage">
            <ChartPage />
          </Route>
          <Route path="/">
            <TodoPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
