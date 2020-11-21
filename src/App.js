import "./App.css";
import { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import MiniDrawer from "./Components/Header";
import Content from "./Components/Content";
import Alert from "./Components/Alert";
import Cart from "./Components/Cart";
import Delivery from "./Components/Delivery";
import Login from "./Components/Login";
import WishList from "./Components/WishList";
import SignUp from "./Components/SignUp";
import UserDetails from "./Components/UserDetails";
import Footer from "./Components/Footer";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);
  return (
    <Router>
      <div className="App">
        <CssBaseline />
        <Switch>
          <Route path="/cart">
            <MiniDrawer>
              <Cart />
            </MiniDrawer>
          </Route>
          <Route path="/delivery">
            <MiniDrawer>
              <Delivery />
            </MiniDrawer>
          </Route>
          <Route path="/user_auth">
            <Login />
          </Route>
          <Route path="/alert">
            <MiniDrawer>
              <Alert />
            </MiniDrawer>
          </Route>
          <Route path="/wishlist">
            <MiniDrawer>
              <WishList />
            </MiniDrawer>
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/details">{user ? <UserDetails /> : <Login />}</Route>
          <Route path="/">
            <MiniDrawer>
              <Content />
            </MiniDrawer>
          </Route>
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
