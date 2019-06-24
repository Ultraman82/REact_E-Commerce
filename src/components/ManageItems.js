import React, { Component } from "react";
import Product from "./EditItem";
import Title from "./Title";
import { ProductConsumer } from "../context";
import ManageAdd from "./ManageAdd";

export default class ManageItems extends Component {
  render() {
    return (
      <React.Fragment>
        <ManageAdd />
        <div className="py-5">
          <div className="container">
            <Title name="Edit" title="products" />
            <div className="row">
              <ProductConsumer>
                {value => {
                  return value.products.map(product => {
                    return <Product key={product.id} product={product} />;
                  });
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
