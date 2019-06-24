import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";

export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const {
            id,
            manufact,
            imgpath,
            info,
            price,
            name,
            inCart,
            descript
          } = value.detailProduct;
          return (
            <div className="container py-5">
              {/* name */}
              <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                <h1>{name}</h1>
              </div>
              {/* end of name */}
              {/* product info */}
              <div className="row">
                <div className="co-10 mx-auto col-md-6 my-3">
                  <img className="img-fluid" src={imgpath} alt="product" />
                </div>
                {/* Product text */}
                <div className="co-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h2>model : {name}</h2>
                  <h4 className="text-name text-uppercase text-muted mt-3 mb-2">
                    made by : <span className="text-uppercase">{manufact}</span>
                  </h4>
                  <h4 className="text-blue">
                    <strong>
                      price: <span>$</span>
                      {price}
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3mb-0">
                    {descript}
                  </p>
                  <p className="text-muted lead">{info}</p>
                  {/* buttons */}
                  <div>
                    <Link to="/">
                      <ButtonContainer>back to Products</ButtonContainer>
                    </Link>
                    <ButtonContainer
                      cart={true}
                      disabled={inCart}
                      onClick={() => {
                        value.addToCart(id);
                        value.openModal(id);
                      }}
                    >
                      {inCart ? "in cart" : "add to cart"}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
