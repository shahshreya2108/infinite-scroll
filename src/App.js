import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Home } from "./components/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
