import React, { Component } from "react";
import { detailProduct } from "./data";
import { baseUrl } from "./components/baseUrl.js";

const ProductContext = React.createContext();

console.log(baseUrl);
class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0,
    isAdmin: false,
    token: "",
    username: ""
  };
  
  handleCheckout = () => {
    fetch(`${baseUrl}order/${this.state.username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        orderlist: JSON.stringify(this.state.cart)
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log("response", response);
        this.clearCart();
        this.saveCart();
      })
      .catch(error => console.log("error:", error));
  };

  gettingCart = () => {
    fetch(`${baseUrl}user/${this.state.username}`)
      .then(response => response.json())
      .then(response => {
        //this.setState({ cart: JSON.parse(response.cart) });
        //console.log("getting cart response.cart: ", response);
        this.setState({ cart: JSON.parse(response) });
      })
      .catch(error => console.log("error:", error));
  };

  initialData = (username, token) => {
    this.setState({ username: username, token: token });
    if (username === "edgar") {
      this.setState({ isAdmin: true });
    }
    this.gettingCart();
  };
  saveCart = () => {
    //console.log("save cart parse : ", JSON.parse(this.state.cart.toString()));
    fetch(`${baseUrl}cart/${this.state.username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cart: JSON.stringify(this.state.cart)
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log("response", response);
      })
      .catch(error => console.log("error:", error));
  };

  componentDidMount() {
    this.storeProducts();
  }
  storeProducts = () => {
    fetch(`${baseUrl}items`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response.items);
        this.setState(() => {
          return { products: response.items };
        });
      })
      .catch(error => console.log("error:", error));
  };

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    /* if (this.state.cart === null) {
      this.setState({ products: tempProducts, cart: [product] });
    } else {
      this.setState({
        products: tempProducts,
        cart: [...this.state.cart, product]
      });
    }
    this.addTotals(); */

    if (this.state.cart === null) {
      this.setState(
        () => {
          return { products: tempProducts, cart: [product] };
        },
        () => {
          this.addTotals();
        }
      );
    } else {
      this.setState(
        () => {
          return {
            products: tempProducts,
            cart: [...this.state.cart, product]
          };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };
  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.addTotals();
      }
    );
  };
  decrement = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };
  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id !== id);
    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;
    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };
  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.storeProducts();
        this.addTotals();
      }
    );
  };
  addTotals = () => {
    console.log("addTotal this.state.cart: ", this.state.cart);
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.5;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubtotal: subTotal,
        cartTax: tax,
        cartTotal: total
      };
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          userModal: this.userModal,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
          initialData: this.initialData,
          saveCart: this.saveCart,
          handleCheckout: this.handleCheckout
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
