import { useState } from "react";
import "./App.css";

const productsData = [
  {
    img: "assets/images/image-waffle-desktop.jpg",
    name: "Waffle",
    title: "Waffle With Berries",
    price: 6.50,
    count: 0,
    inCart: false,
    id: crypto.randomUUID()
  },
  {
    img: "assets/images/image-baklava-desktop.jpg",
    name: "Baklave",
    title: "Pistachio Bakvala",
    price: 4.0,
    count: 0,
    inCart: false,
    id: crypto.randomUUID()
  },
  {
    img: "assets/images/image-creme-brulee-desktop.jpg",
    name: "Creme Brulee",
    title: "Vanilla Bean Creme Brulee",
    price: 7.0,
    count: 0,
    inCart: false,
    id: crypto.randomUUID()
  },
  {
    img: "assets/images/image-macaron-desktop.jpg",
    name: "Macaron",
    title: "Macaron Mix Of Five",
    price: 8.0,
    count: 0,
    inCart: false,
    id: crypto.randomUUID()
  },
  {
    img: "assets/images/image-tiramisu-desktop.jpg",
    name: "Tiramisu",
    title: "Classic Tiramisu",
    price: 5.5,
    count: 0,
    inCart: false,
    id: crypto.randomUUID()
  },
  {
    img: "assets/images/image-meringue-desktop.jpg",
    name: "Pie",
    title: "Lemon Meringue Pie",
    price: 5.0,
    count: 0,
    inCart: false,
    id: crypto.randomUUID()
  },
  {
    img: "assets/images/image-cake-desktop.jpg",
    name: "Cake",
    title: "Red Velvet Cake",
    price: 4.5,
    count: 0,
    inCart: false,
    id: crypto.randomUUID()
  },
  {
    img: "assets/images/image-brownie-desktop.jpg",
    name: "Brownie",
    title: "Salted Caramel Brownie",
    price: 5.5,
    count: 0,
    inCart: false,
    id: crypto.randomUUID()
  },
  {
    img: "assets/images/image-panna-cotta-desktop.jpg",
    name: "Panna Cotta",
    title: "Vanilla Panna Cotta",
    price: 4.5,
    count: 0,
    inCart: false,
    id: crypto.randomUUID()
  },
];

function App() {
  const [products, setProducts] = useState(productsData);
  const [productsInCart, setProductsInCart] = useState([]);
  const [confirmedProducts, setConfirmedProducts] = useState([]);

  const removeProduct = (product) => {
    const newProductsInCart = productsInCart.filter(p => p.id !== product.id);
    const newProducts = products.map(p => p.id === product.id ? {...p, count: 0, inCart: false}: p);
    setProductsInCart(newProductsInCart);
    setProducts(newProducts);
    setConfirmedProducts(newProductsInCart);
  }

  const confirmOrders = (products) => {
    setConfirmedProducts(products);
  }

  const startNewOrder = () => {
    setProducts(productsData);
    setProductsInCart([]);
    setConfirmedProducts([]);
  }
  return (
    <div className="App">
      <ProductContainer 
      productsInCart={productsInCart} 
      setProductsInCart={setProductsInCart} 
      products={products} 
      setProducts={setProducts}/>

      <CartContainer
      productsInCart={productsInCart}
      removeProduct={removeProduct}
      confirmOrders={confirmOrders}/>
      {
        confirmedProducts.length > 0 && <ConfirmOrder 
        confirmedProducts={confirmedProducts} 
        startNewOrder={startNewOrder}
        />
      }
    </div>
  );
}

function ProductContainer({ products, setProducts, productsInCart, setProductsInCart }) {
 
  return (
    <div className="product-container">
      <h1>Desserts</h1>
      <div className="product-grid">
        {products.map(product => <Product products={products} setProducts={setProducts} product={product} key={product.id} productsInCart={productsInCart} setProductsInCart={setProductsInCart} />)}
      </div>
    </div>
  );
}

function Product({ products, setProducts, product, setProductsInCart }) {

  return (
    <div className="product">
      <ImageContainer name={product.name} img={product.img}/>
      <div className="product-info">
        <p className="faded-text">{product.name}</p>
        <p>{product.title}</p>
        <p className="price">${product.price.toFixed(2)}</p>
      </div>

      { !product.inCart &&
        <AddProduct products={products} setProducts={setProducts} product={product} setProductsInCart={setProductsInCart}/>
      }
      {
        product.inCart && <UpdateProduct product={product} setProducts={setProducts} setProductsInCart={setProductsInCart}/>
      }
    </div>
  );
}

function UpdateProduct({ product, setProducts, setProductsInCart}) {

  const decrementCount = () => {

    const newProduct = {...product, count: product.count - 1};
    if (newProduct.count === 0) {
      setProducts(products => products.map(p => p.id === product.id ? {...p, count: 0, inCart: false} : p));
      setProductsInCart(products => products.filter(p => p.id !== product.id));
      return ;
    }

    setProducts(products => products.map(p => p.id === product.id ? newProduct : p));
    setProductsInCart(products => products.map(p => p.id === product.id ? newProduct : p));
  }

  const incrementCount = () => {

    const newProduct = {...product, count: product.count + 1};
    setProducts(products => products.map(p => p.id === product.id ? newProduct : p));
    setProductsInCart(products => products.map(p => p.id === product.id ? newProduct : p));
  }
  
  return (
    <div className="product-state update-product">
      <button onClick={decrementCount}>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
      </button>
      <p>{product.count}</p>
      <button onClick={incrementCount}>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
      </button>
    </div>
  );
}

function AddProduct({ products, setProducts, setProductsInCart, product }) {

  const addProductToCart = () => {
    if (product.inCart)
      return ;
    const newProduct = {...product, inCart: true, count: product.count + 1};
    const newProducts = products.map(p => product.id === p.id ? newProduct: p);
    setProducts(newProducts);
    setProductsInCart(current => [...current, newProduct]);
  }

  return (
    <div className="product-state add-product">
      <button onClick={addProductToCart}>
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clipPath="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>Add to cart</button>
    </div>
  );
}

function ProductInCart({ product, removeProduct}) {

  return (
    <div className="product-in-cart">
        <div>
          <p style={{fontSize: "1.1rem"}}>{product.title}</p>
          <div>
            <span className="product-count">{product.count}x</span>
            <span className="single-price">${product.price}</span>
            <span className="total-price">${(product.price * product.count).toFixed(2)}</span>
          </div>
        </div>
        <Button className="remove-item" handleClick={() => removeProduct(product)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
            <path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
          </svg>
        </Button>
    </div>
  );
}

function CartContainer({ productsInCart, removeProduct, confirmOrders }) {

  const items = getItems(productsInCart);
  const isEmpty = productsInCart.length === 0;
  return (
    <div className="cart-container">
      <h1>Your Cart ({items})</h1>
      {
        !isEmpty &&
        <Cart
        productsInCart={productsInCart}
        removeProduct={removeProduct}
        confirmOrders={confirmOrders}
        />
      }
      {
        isEmpty && <EmptyCart />
      }
    </div> 
  );
}

function Cart({ productsInCart, removeProduct, confirmOrders }) {

  return (
    <div className="cart">
      {
        productsInCart.map(product => <ProductInCart
          product={product}
          productsInCart={productsInCart}
          removeProduct={removeProduct}
          key={crypto.randomUUID()} 
          />)
      }
      <Button className="btn" handleClick={() => confirmOrders(productsInCart)}>
        Confirm Order
      </Button>
      <OrderTotal products={productsInCart}/>
    </div>
  );
}

function EmptyCart() {

  return (
    <div className="empty-cart">
      <svg xmlns="http://www.w3.org/2000/svg" width="161" height="161" fill="none" viewBox="0 0 128 128">
      <path fill="#260F08"   d="M8.436 110.406c0 1.061 4.636 2.079 12.887 2.829 8.252.75 19.444 1.171 31.113 1.171 11.67 0 22.861-.421 31.113-1.171 8.251-.75 12.887-1.768 12.887-2.829 0-1.061-4.636-2.078-12.887-2.828-8.252-.75-19.443-1.172-31.113-1.172-11.67 0-22.861.422-31.113 1.172-8.251.75-12.887 1.767-12.887 2.828Z" opacity=".15"/>
      <path fill="#87635A" d="m119.983 24.22-47.147 5.76 4.32 35.36 44.773-5.467a2.377 2.377 0 0 0 2.017-1.734c.083-.304.104-.62.063-.933l-4.026-32.986Z"/>
      <path fill="#AD8A85" d="m74.561 44.142 47.147-5.754 1.435 11.778-47.142 5.758-1.44-11.782Z"/>
      <path fill="#CAAFA7" d="M85.636 36.78a2.4 2.4 0 0 0-2.667-2.054 2.375 2.375 0 0 0-2.053 2.667l.293 2.347a3.574 3.574 0 0 1-7.066.88l-1.307-10.667 14.48-16.88c19.253-.693 34.133 3.6 35.013 10.8l1.28 10.533a1.172 1.172 0 0 1-1.333 1.307 4.696 4.696 0 0 1-3.787-4.08 2.378 2.378 0 1 0-4.72.587l.294 2.346a2.389 2.389 0 0 1-.484 1.755 2.387 2.387 0 0 1-1.583.899 2.383 2.383 0 0 1-1.755-.484 2.378 2.378 0 0 1-.898-1.583 2.371 2.371 0 0 0-1.716-2.008 2.374 2.374 0 0 0-2.511.817 2.374 2.374 0 0 0-.493 1.751l.293 2.373a4.753 4.753 0 0 1-7.652 4.317 4.755 4.755 0 0 1-1.788-3.17l-.427-3.547a2.346 2.346 0 0 0-2.666-2.053 2.4 2.4 0 0 0-2.08 2.667l.16 1.173a2.378 2.378 0 1 1-4.72.587l-.107-1.28Z"/>
      <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".974" d="m81.076 28.966 34.187-4.16"/><path fill="#87635A" d="M7.45 51.793c-.96 8.48 16.746 17.44 39.466 19.947 22.72 2.506 42.08-2.16 43.04-10.667l-3.947 35.493c-.96 8.48-20.24 13.334-43.04 10.667S2.463 95.74 3.423 87.18l4.026-35.387Z"/>
      <path fill="#AD8A85" d="M5.823 65.953c-.96 8.453 16.746 17.44 39.573 20.027 22.827 2.586 42.053-2.187 43.013-10.667L87.076 87.1c-.96 8.48-20.24 13.333-43.04 10.666C21.236 95.1 3.53 86.22 4.49 77.74l1.334-11.787Z"/>
      <path fill="#CAAFA7" d="M60.836 42.78a119.963 119.963 0 0 0-10.347-1.627c-24-2.667-44.453 1.893-45.333 10.373l-2.133 18.88a3.556 3.556 0 1 0 7.066.8 3.574 3.574 0 1 1 7.094.8l-.8 7.094a5.93 5.93 0 1 0 11.786 1.333 3.556 3.556 0 0 1 7.067.8l-.267 2.347a3.573 3.573 0 0 0 7.094.826l.133-1.2a5.932 5.932 0 1 1 11.787 1.36l-.4 3.52a3.573 3.573 0 0 0 7.093.827l.933-8.267a1.174 1.174 0 0 1 1.307-.906 1.146 1.146 0 0 1 1.04 1.306 5.947 5.947 0 0 0 11.813 1.334l.534-4.72a3.556 3.556 0 0 1 7.066.8 3.573 3.573 0 0 0 7.094.826l1.786-15.546a2.373 2.373 0 0 0-2.08-2.667L44.143 55.74l16.693-12.96Z"/>
      <path fill="#87635A" d="m59.156 57.66 1.68-14.88-16.827 13.173 15.147 1.707Z"/>
      <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".974" d="M9.796 52.06c-.667 5.866 16.24 12.586 37.733 15.04 14.774 1.68 27.867.906 34.854-1.654"/>
      </svg>
      <p className="faded-text">Your added items will appear here</p>
    </div>
  );
}

function ConfirmOrder({ confirmedProducts, startNewOrder }) {

  return (
    <div className="confirm-order">
      <div className="header">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z" fill="#1EA575"/>
          <path d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z" fill="#1EA575"/>
        </svg>
        <h2>Order Confirmed</h2>
        <p className="faded-text">We hope you enjoy your food!</p>
      </div>
      <div className="orders">
        {confirmedProducts.map((product, index) => <Order product={product} key={crypto.randomUUID()}  border={index < confirmedProducts.length - 1}/>)}
      </div>
      <Button className="btn" id="start-new" handleClick={startNewOrder}>
        Start New Order
      </Button>
      <OrderTotal products={confirmedProducts}/>
    </div>
  );
}

function Order({ product, border }) {
  
  return (

    <div className={"order " + (border ? "border-bottom" : "")}>
      <ImageContainer {...product} />
      <div className="confirmed-order">
        <p style={{fontSize: "1.1rem"}}>{product.title}</p>
        <div>
          <span className="product-count">{product.count}x</span>
          <span className="single-price">${product.price.toFixed(2)}</span>
          <span className="total-price">${(product.price * product.count).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

function Button({ handleClick, children, className, id }) {

  return (
    <button onClick={handleClick} className={className} id={id}>
      {children}
    </button>
  );
}

function OrderTotal({ products }) {
  let total = getTotalPrice(products).toFixed(2);

  return (
    <div className="order-total">
      <p>Order total</p>
      <h2>${total}</h2>
    </div>
  );
}

function ImageContainer({ img, name}) {
  return (
    <div className="img-container">
      <img src={img} alt={name} />
    </div>
  );
}

function getItems(products) {
  let count = 0;
  for (let i = 0; i < products.length; i++)
    count += products[i].count;
  return count;
}

function getTotalPrice(products) {
  let total = 0;
  for (let i = 0; i < products.length; i++)
    total += products[i].count * products[i].price;
  return total;
}

export default App;