import { useState, useEffect } from "react";
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
    width: "100%",
    margin: "auto",
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
});
const UserDetails = () => {
  const classes = useStyles();
  const history = useHistory();
  const matches = useMediaQuery("(max-width:576px)");
  //   const allInputs = {imgUrl: ''};
  const [{ user }] = useStateValue();
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [dob, setdob] = useState("");
  const [ImgAsFile, setImgAsFile] = useState("");
  //to reset the file input value
  // Used to change date format from yyyy-mm-dd to dd-mm-yyyy
  // const handledate = e =>{
  //   let d = e.target.value;
  //   d = d.split("-").reverse().join("-");
  //   setdob(d);
  //   console.log(dob);
  // }
  const [key, setkey] = useState(true);
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
    // userDetailUpload();
    firebaseUpload();
  };
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setkey(true);
    setImgAsFile((imageFile) => image);
  };
  const firebaseUpload = () => {
    console.log("Photo upload start");
    //Async start
    //error handling at first
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
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        // here it is used to make sure image is  uploaded correctly
        storage
          .ref(`images/${user?.uid}`)
          .child(Name)
          .getDownloadURL()
          .then((fireBaseImgUrl) => {
            userDetailUpload(fireBaseImgUrl);
            history.push("/home");
          });
      }
    );
  };
  const userDetailUpload = (Url) => {
    if (Name !== "" || (Name !== null && Address !== "") || Address !== null) {
      db.collection("Users")
        .doc(user?.uid)
        .collection("details")
        .doc("data")
        .set({
          Name: Name,
          Address: Address,
          DOB: dob,
        });
    }
  };
  return (
    <Grid container>
      <Paper className={matches ? classes.paperSm : classes.paper}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <AccountCircleOutlinedIcon style={{ fontSize: 200 }} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" className={classes.title}>
            User Details
          </Typography>
        </Grid>
        <form>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.form}>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  id="name"
                  aria-describedby="Name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={Name}
                  required={true}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.form}>
                <InputLabel htmlFor="address">Delivery Address</InputLabel>
                <Input
                  id="address"
                  aria-describedby="address"
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  value={Address}
                  required={true}
                />
                <FormHelperText>Address won't be Shared</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
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
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
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
