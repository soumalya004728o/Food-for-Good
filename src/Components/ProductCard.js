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
import {
  red,
  grey,
  pink,
  purple,
  indigo,
  blue,
  cyan,
  teal,
  green,
  lime,
  yellow,
  amber,
  orange,
  lightBlue,
} from "@material-ui/core/colors";
import { useSpring} from "react-spring";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useStateValue } from "../StateProvider";
const avColor = [
  red,
  grey,
  pink,
  purple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lime,
  yellow,
  amber,
  orange,
];
const item = () => avColor[Math.floor(Math.random() * avColor.length)];
//Main Function start
const ProductCard = ({
  id,
  avatar,
  image,
  image_title,
  title,
  subtitle,
  desc,
  price,
  quantity,
}) => {
  const [, dispatch] = useStateValue('');
  const addToBasket = () =>
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
      },
    });
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  const addToWishList = () =>
    dispatch({
      type: "ADD_TO_WishList",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
      },
    });
  const removeFromWishList = () => {
    dispatch({
      type: "REMOVE_FROM_WishList",
      id: id,
    });
  };
  const classes = useStyles();
  const [like, setLike] = useState(grey[500]);
  const [click, setClick] = useState(1);
  const [clickBasket, setClickBasket] = useState(1);
  const [addCart, setAddCart] = useState(grey[500]);
  const counter = () => {
    setClick((c) => c + 1);
    if (click % 2 !== 0) {
      setLike(red[500]);
      addToWishList();
    } else {
      setLike(grey[500]);
      removeFromWishList();
    }
  };
  const cartClick = () => {
    setClickBasket((c) => c + 1);
    if (clickBasket % 2 !== 0) {
      setAddCart(lightBlue[500]);
      addToBasket();
    } else {
      setAddCart(grey[500]);
      removeFromBasket();
    }
  };
  const props = useSpring({
    config: { mass: 5, tension: 350, friction: 40 },
    scale: (like===red[500])? 0.5:1
  });
  // const fade = useSpring({from:{opacity: 0}, to:{opacity: 1}});
  return (
    <Card className={classes.root} key={id}>
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
        <Typography variant="h3">
          <strong>&#x20B9;{price}</strong>
        </Typography>
        <Typography variant="h5">
          <strong>{quantity}</strong>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <animated>
          <IconButton aria-label="add to favorites" onClick={counter}>
            <FavoriteIcon
              style={{ color: like, props}}
            />
          </IconButton>
        </animated>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton style={{ marginLeft: "40%" }} onClick={cartClick}>
          <AddShoppingCartIcon style={{ color: addCart }} />
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
    backgroundColor: item()[500],
  },
}));

export default ProductCard;
