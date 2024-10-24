import { createContext, useReducer } from 'react';

import { DUMMY_PRODUCTS } from '../dummy-products.js';

export const CartContext = createContext({   // 創造和分享背景(context)
  items: [],    // 提供給組件的初始值，也可以是一個數字、字串、object等
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

function shoppingCartReducer(state, action) {   // 這個reducer function放在外面是因為他不該被重新渲染，會有兩個參數(state、action)
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      ...state, // not needed here because we have only one value如果有更複雜的狀態對象就可以先複製
      items: updatedItems,
    };
  }

  if (action.type === 'UPDATE_ITEM') {
    const updatedItems = [...state.items];      // update時，永遠不要直接改變內存的舊狀態，而是要先複製
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += action.payload.amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        ...state,
        items: updatedItems,
      };
  }
  return state;
}

export default function CartContextProvider({ children }) {   // 創建和共享組件功能
  const [shoppingCartState, shoppingCartDispatch] = useReducer(   // 第一個參數是現在狀態；第二個參數是dispatch function"調度函數"，允許採取所謂的行動
    shoppingCartReducer,   // shoppingCartReducer必須是放第一個參數
    {
      items: [],   // 第二個參數要放的是這個shoppingCartReducer狀態的(state)起始值
    }
  );
  // 由shoppingCartDispatch觸發、
  // 執行shoppingCartReducer,
  // {
  //   items: [],
  // }、
  // shoppingCartState產生新的state

  function handleAddItemToCart(id) {
    shoppingCartDispatch({     // 稱分派函數，分派一個行動
      type: 'ADD_ITEM',        // 通常會加一個類型屬性，去做記號'自訂=ADD_ITEM'，為了識別動作
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({     // 稱分派函數，分派一個行動
      type: 'UPDATE_ITEM',
      payload: {               // 但老師喜歡用payload
        productId,             // 可以productId：productId
        amount                 // 可以amount：amount
      }
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,  // 這邊也有改成shoppingCartState
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>   // 要回傳可以渲染的東西 
  );
}
