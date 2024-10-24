import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import Product from './components/Product.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import CartContextProvider from './store/shopping-cart-context.jsx';

function App() {
  return (
    <CartContextProvider>   {/* .Provider是將一個「上下文」（Context）的值提供給其子組件。 */}
      <Header />            {/* 把<Header>、<Shop>>包裝起來  */}
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;

// 若是這種情況，表在包裝的時候(.Provider)沒有包裝到Cart.jsx檔案，所以會需要再加一個value */}
// return (
  // <CartContext.Provider value={{ items: [] }}>
  // ...這邊省略
  // </CartContext.Provider>
// );
// }