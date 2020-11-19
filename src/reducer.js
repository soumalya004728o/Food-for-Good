export const initialState = {
  basket: [],
  wishlist: [],
  user: null,
  imageurl: '',
};
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "ADD_TO_WishList":
      return {
        ...state,
        wishlist: [...state.wishlist, action.item],
      };
    case "REMOVE_FROM_BASKET":
      let newBasket = [...state.basket];
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      if (index >= 0) {
        newBasket.splice(index, 1);
      }
      return { ...state, basket: newBasket };
    case "REMOVE_FROM_WishList":
      let newWishList = [...state.wishlist];
      const index1 = state.wishlist.findIndex(
        (wishListItem) => wishListItem.id === action.id
      );
      if (index1 >= 0) {
        newWishList.splice(index1, 1);
      }
      return { ...state, wishlist: newWishList };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_IMAGE":
      return{
        ...state,
        imageurl: action.imageurl,
      };
    default:
      return state;
  }
};
export default reducer;
