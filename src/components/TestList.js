import React, { Component } from "react";
import Test from "./Test";
import Title from "./Title";
import { ProductConsumer } from "../context";

export default class TestList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <Title name="Test" title="products" />
            <div className="row">
              <ProductConsumer>
                {value => {
                  console.log(value);
                  return value.products.map(product => {
                    return <Test key={product.id} product={product} />;
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
