import "./App.css";
import Editor from "./components/Editor";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { v4 as uuid } from "uuid";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to={`/docs/${uuid()}`} />
        </Route>
        <Route path="/docs/:id">
          <Editor />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
