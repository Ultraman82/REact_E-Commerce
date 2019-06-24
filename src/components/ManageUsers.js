import React, { Component } from "react";
import Title from "./Title";
import { Button } from "reactstrap";
import { baseUrl } from "./baseUrl";

export default class ManageUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userlist: []
    };
    this.getUserData = this.getUserData.bind(this);
  }

  componentWillMount() {
    this.getUserData();
  }

  getUserData = () => {
    fetch(baseUrl + "users")
      .then(response => response.json())
      .then(response => {
        this.setState({ userlist: response.users });
        console.log("set userdata :", this.state.userlist);
      })
      .catch(error => console.log("error:", error));
  };

  render() {
    const renderuser = this.state.userlist.map(user => {
      return (
        <div key={user.username} className="row" style={{ margin: 10 }}>
          <div style={{ margin: 10 }}>{JSON.stringify(user)}</div>

          <Button color="danger">Delete User</Button>
        </div>
      );
    });
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <Title name="Manage" title="users" />
            <div> {renderuser}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
