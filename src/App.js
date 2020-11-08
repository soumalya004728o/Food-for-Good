import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import MiniDrawer from "./Components/Header";
import Content from "./Components/Content";
import Alert from "./Components/Alert";
import Cart from "./Components/Cart";
import Delivery from "./Components/Delivery";
import UserAuth from "./Components/UserAuth";
import WishList from "./Components/WishList";
import { auth } from "./firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <CssBaseline />
        <MiniDrawer>
          <Switch>
            <Route path="/cart">
              <Cart/>
            </Route>
            <Route path="/delivery">
              <Delivery/>
            </Route>
            <Route path="/user_auth">
              <UserAuth/>
            </Route>
            <Route path="/alert">
              <Alert/>
            </Route>
            <Route path="/wishlist">
              <WishList/>
            </Route>
            <Route path="/" >
              <Content />
            </Route>
          </Switch>
        </MiniDrawer>
      </div>
    </Router>
  );
}

export default App;
