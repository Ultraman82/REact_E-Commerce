import React, { Component } from "react";
import Title from "./Title";
import { Button } from "reactstrap";
import { baseUrl } from "./baseUrl";

export default class ManageOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderlist: []
    };
    this.getOrders = this.getOrders.bind(this);
  }

  componentWillMount() {
    this.getOrders();
  }

  getOrders = () => {
    fetch(baseUrl + "orders")
      .then(response => response.json())
      .then(response => {
        this.setState({ orderlist: response.orders });
        console.log("set userdata :", this.state.orderlist);
      })
      .catch(error => console.log("error:", error));
  };

  render() {
    const renderorder = this.state.orderlist.map(order => {
      return (
        <div key={order.username} className="row" style={{ margin: 10 }}>
          <div style={{ margin: 10 }}>{JSON.stringify(order)}</div>
        </div>
      );
    });
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <Title name="Check" title="Orders" />
            <div> {renderorder}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
