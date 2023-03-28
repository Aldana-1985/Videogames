import { Route, Switch } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Home } from "./pages/Home"
import { Detail } from "./pages/Detail"
import { Form } from "./pages/Form"


function App() {
  return (
    <div>
        <Switch>
          <Route exact path={"/"} component={Landing}/>
          <Route exact path={"/home"} component={Home}/>
          <Route path={"/videogames/:id"} component={Detail}/>
          <Route exact path={"/form"} component={Form}/>
        </Switch>
    </div>
  );
}

export default App;
