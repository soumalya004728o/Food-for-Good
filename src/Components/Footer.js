import { Grid, makeStyles, Typography, Link, useMediaQuery } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
const useStyles = makeStyles({
  footer: {
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: "#000000",
  },
  fonts: {
    color: "#ffffff",
    textAlign: "center",
    marginLeft: 300,
  },
  fontsSm:{
    color: "#ffffff",
    // textAlign: "center",
    marginLeft: "20%",
  },
  Link: {
    textDecoration: "none",
    color: green[500],
  },
  LinkSm:{
    textDecoration: "none",
    color: green[500],
    marginLeft: "25%",
  },
});
const Footer = () => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:576px)");
  return (
    <footer className={classes.footer}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="caption" gutterBottom className={matches?classes.fonts:classes.fontsSm}>
            This is a Open Source project Which comes under&nbsp;
            <Link
              href="https://www.gnu.org/licenses/agpl-3.0.en.html"
              target="_blank"
              rel="noopener"
              className={matches?classes.Link:classes.LinkSm}
            >
              Affro GNU V3
            </Link>
            &nbsp;Licensing. 
            {matches?"So, all rights are reserved under afore mentioned License only":""}
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};
export default Footer;
