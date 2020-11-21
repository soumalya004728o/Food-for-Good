import { useState } from "react";
import {
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { red, green } from "@material-ui/core/colors";
import { Link,useHistory } from "react-router-dom";
import banner from "../banner.png";
import { auth } from "../firebase";
const useStyles = makeStyles({
  root: {
    maxWidth: 346,
    marginTop:80 ,
    marginLeft: "auto",
    marginRight:"auto",
  },
  media: {
    height: 215,
  },
  input: {
    width: 300,
  },
});

export default function UserAuth() {
  const classes = useStyles();
  const history = useHistory();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(Email, Password)
      .then((auth) => {
        history.push("/home");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={banner}
            title="Food for Good"
          />
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Login
              </Typography>
              <FormControl>
                <InputLabel htmlFor="Email-input">Email address</InputLabel>
                <Input
                  id="Email-input"
                  className={classes.input}
                  aria-describedby="email-helper-text"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                />
                <FormHelperText id="email-helper-text">
                  We'll never share your email.
                </FormHelperText>
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="Password-input"> Password </InputLabel>
                <Input
                  id="Password-input"
                  className={classes.input}
                  aria-describedby="password-helper-text"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
                />
              </FormControl>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              style={{ color: green[500] }}
              onClick={login}
              type="submit"
            >
              Login
            </Button>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button size="small" style={{ color: red[500] }}>
              SignUp
            </Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
