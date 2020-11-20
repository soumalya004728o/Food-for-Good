import "./App.css";
import { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import MiniDrawer from "./Components/Header";
import Content from "./Components/Content";
import Alert from "./Components/Alert";
import Cart from "./Components/Cart";
import Delivery from "./Components/Delivery";
import UserAuth from "./Components/UserAuth";
import WishList from "./Components/WishList";
import SignUp from "./Components/SignUp";
import UserDetails from "./Components/UserDetails";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  const [{user}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        dispatch({
          type: 'SET_USER',
          user: null,
        });
        //Very much needed to change the userName I need to force update it
        MiniDrawer.forceUpdate();
      }
    });
  }, [dispatch]);
  return (
    <Router>
      <div className="App">
        <CssBaseline />
        <MiniDrawer>
          <Switch>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/delivery">
              <Delivery />
            </Route>
            <Route path="/user_auth">
              <UserAuth />
            </Route>
            <Route path="/alert">
              <Alert />
            </Route>
            <Route path="/wishlist">
              <WishList />
            </Route>
            <Route path="/signup">
              <SignUp/>
            </Route>
            <Route path="/details">
              {user?<UserDetails/>:<UserAuth/>}
            </Route>
            <Route path="/">
              <Content />
            </Route>
          </Switch>
        </MiniDrawer>
      </div>
    </Router>
  );
}

export default App;
