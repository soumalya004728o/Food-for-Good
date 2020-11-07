import React, { useState } from "react";
import {
  Typography,
  Card,
  makeStyles,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { red, grey } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
const Content = ({ avatar, image, image_title, title, subtitle, desc }) => {
  const classes = useStyles();
  const [like, setLiked] = useState(grey[500]);
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {avatar}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={subtitle}
      />
      <CardMedia className={classes.media} image={image} title={image_title} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => setLiked("#E53935")}
        >
          <FavoriteIcon style={{ color: like }} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default Content;
