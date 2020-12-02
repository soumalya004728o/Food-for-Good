import { useState } from "react";
import {
  Paper,
  Grid,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Typography,
  makeStyles,
  Button,
  useMediaQuery,
} from "@material-ui/core";
import { red, grey } from "@material-ui/core/colors";
import banner from "../banner.png";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  paper: {
    width: 450,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },
  paperSm: {
    marginTop: "16%",
    width: "95%",
    margin: "auto",
  },
  form: {
    marginLeft: "15%",
    alignItems: "center",
  },
  formSm:
  {
    marginLeft: "6%",
    alignItems: "center",
  },
  formhtml:{
    width: "100%",
  },
  title: {
    margin: "auto",
    textAlign: "center",
  },
  button: {
    textAlign: "center",
  },
  image: {
    width: "97.5%",
    objectFit: "contain",
    margin: 5,
  },
  imageSm: {
    width: "100%",
    margin: 0,
  },
  input: {
    width: 300,
  },
});
const SignUp = () => {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:576px)");
  const history = useHistory();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfPass, setConfPass] = useState("");
  const reset = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    setConfPass("");
  };
  const upload = (e) => {
    e.preventDefault();
    console.log("register");
    register();
  };
  const register = () => {
    auth
      .createUserWithEmailAndPassword(Email, ConfPass)
      .then((auth) => {
        if (auth) {
          history.push("/details");
        }
      })
      .catch((error) => alert(error.message));
  };
  const checkpass = () => {
    if (Password !== ConfPass) {
      alert("Password doesn't match");
    }
  };
  return (
    <Grid container>
      <Paper className={matches ? classes.paperSm : classes.paper}>
        <Grid item xs={12}>
          <img
            src={banner}
            alt="logo"
            className={matches ? classes.imageSm : classes.image}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" className={classes.title}>
            Sign Up
          </Typography>
        </Grid>
        <form className={classes.formhtml}>
          <Grid container>
            <Grid item xs={12}>
              <FormControl className={matches?classes.formSm:classes.form}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  aria-describedby="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={Email}
                  required={true}
                  className={classes.input}
                />
                <FormHelperText>Email will be kept Private</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={matches?classes.formSm:classes.form}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  aria-describedby="password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={Password}
                  required={true}
                  className={classes.input}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={matches?classes.formSm:classes.form}>
                <InputLabel htmlFor="password-conf">
                  Confirm Password
                </InputLabel>
                <Input
                  id="password-conf"
                  aria-describedby="password confirmation"
                  type="password"
                  onChange={(e) => setConfPass(e.target.value)}
                  onBlur={checkpass}
                  value={ConfPass}
                  required={true}
                  className={classes.input}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} className={classes.button}>
              <Button
                size="medium"
                style={{ color: grey[500] }}
                type="reset"
                onClick={reset}
              >
                Reset
              </Button>
              <Button
                size="medium"
                style={{ color: red[500] }}
                type="submit"
                onClick={upload}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};
export default SignUp;
