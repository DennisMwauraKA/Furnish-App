import React, { createContext, useContext, useReducer, useEffect } from "react";

const initialCartState = {
  cartItems: [],
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        const newItem = { ...action.payload, quantity: 1 };

        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      case "REMOVE_FROM_CART":
        const itemIdToRemove = action.payload.itemId;

        const updatedCartItems = state.cartItems.filter(
          (item) => item._id !== itemIdToRemove
        );

        return {
          ...state,
          cartItems: updatedCartItems,
        };

      case "INCREMENT_QUANTITY":
        const { itemId: incrementItemId } = action.payload;
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === incrementItemId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      case "DECREMENT_QUANTITY":
        const { itemId: decrementItemId } = action.payload;
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === decrementItemId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      case "CLEAR_CART":
        return {
          ...state,
          cartItems: [],
        };
      default:
        return state;
    }
  };

  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);
  const updatedCartState = {
    ...cartState,
    count: cartState.cartItems.length,
  };

  useEffect(() => {
    updatedCartState.count = cartState.cartItems.length;
  }, [cartState.cartItems]);

  return (
    <CartContext.Provider value={{ cartState: updatedCartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
