import { useState } from "react";
import {
  Paper,
  Grid,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  TextField,
  Typography,
  makeStyles,
  Button,
  useMediaQuery,
  Box,
  Avatar,
} from "@material-ui/core";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { db, storage } from "../firebase";
import { green, grey } from "@material-ui/core/colors";
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  paper: {
    width: 450,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  paperSm: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "7%",
    width: "90%",
  },
  form: {
    margin: 20,
    alignItems: "center",
  },
  title: {
    margin: "auto",
    textAlign: "center",
  },
  button: {
    textAlign: "center",
  },
  large: {
    marginTop: 20,
    marginBottom: 5,
    width: 150,
    height: 150,
  },
  inputPlace: {
    marginLeft: "15%",
  },
  inputPlaceSm: {
    marginLeft: "5%",
  },
  inputSm: {
      width: 250,
  }
});
const UserDetails = () => {
  const classes = useStyles();
  const history = useHistory();
  const matches = useMediaQuery("(max-width:576px)");
  const [{ user }] = useStateValue();
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [dob, setdob] = useState("");
  const [ImgAsFile, setImgAsFile] = useState(undefined);
  //to reset the file input value
  const [key, setkey] = useState(true);
  // Used to change date format from yyyy-mm-dd to dd-mm-yyyy
  // const handledate = e =>{
  //   let d = e.target.value;
  //   d = d.split("-").reverse().join("-");
  //   setdob(d);
  //   console.log(dob);
  // }
  const reset = () => {
    setdob("");
    setImgAsFile("");
    // setImgUrl('');
    //changing this key will force a re render making the file name disappear
    setkey(false);
  };
  const upload = (e) => {
    e.preventDefault();
    console.log("upload");
    firebaseUpload();
  };
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setkey(true);
    setImgAsFile((imageFile) => image);
  };
  const firebaseUpload = () => {
    console.log("Photo upload start");
    if (ImgAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    const uploadTask = storage
      .ref(`/images/${user?.uid}/${Name}`)
      .put(ImgAsFile);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        storage
          .ref(`images/${user?.uid}`)
          .child(Name)
          .getDownloadURL()
          .then(() => {
            userDetailUpload();
          });
      }
    );
  };
  const userDetailUpload = () => {
    if (Name !== "" || (Name !== null && Address !== "") || Address !== null) {
      db.collection("Users")
        .doc(user?.uid)
        .collection("details")
        .doc("data")
        .set({
          Name: Name,
          Address: Address,
          DOB: dob,
        }).then(()=>
          history.push("/")
        )
    };
  };
  return (
    <Grid container>
      <Paper className={matches ? classes.paperSm : classes.paper}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="center">
            {ImgAsFile?(
              <Avatar alt={Name} className={classes.large} src={URL.createObjectURL(ImgAsFile)} />
            ):(
              <AccountCircleOutlinedIcon style={{ fontSize: 200 }} />
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" className={classes.title}>
            User Details
          </Typography>
        </Grid>
        <form>
          <Grid container>
            <Grid item xs={12} sm={6} className={matches?classes.inputPlaceSm:classes.inputPlace}>
              <FormControl className={classes.form}>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  id="name"
                  aria-describedby="Name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={Name}
                  required={true}
                  className={matches?classes.inputSm:classes.input}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} className={matches?classes.inputPlaceSm:classes.inputPlace}>
              <FormControl className={classes.form}>
                <InputLabel htmlFor="address">Delivery Address</InputLabel>
                <Input
                  id="address"
                  aria-describedby="address"
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  value={Address}
                  required={true}
                  className={matches?classes.inputSm:classes.input}
                />
                <FormHelperText>Address won't be Shared</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} className={matches?classes.inputPlaceSm:classes.inputPlace}>
              <FormControl className={classes.form}>
                <TextField
                  id="dob"
                  label="Date of Birth"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setdob(e.target.value)}
                  value={dob}
                  className={matches?classes.inputSm:classes.input}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} className={matches?classes.inputPlaceSm:classes.inputPlace}>
              <FormControl className={classes.form}>
                <TextField
                  id="photo"
                  label="Upload Your Photo"
                  type="file"
                  inputProps={{ accept: "image/*" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleImageAsFile}
                  key={key}
                  className={matches?classes.inputSm:classes.input}
                />
              </FormControl>
            </Grid>
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
              style={{ color: green[500] }}
              type="submit"
              onClick={upload}
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};
export default UserDetails;
