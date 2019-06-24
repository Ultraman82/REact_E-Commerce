import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";
import { baseUrl } from "./baseUrl";

export default class EditDetail extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescript = this.onChangeDescript.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeImg = this.onChangeImg.bind(this);
    this.onChangeGroup = this.onChangeGroup.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      descript: "",
      price: 0,
      manufact: "",
      id: "",
      imgpath: "",
      group: ""
    };
  }

  componentWillMount() {
    const {
      match: { params }
    } = this.props;
    let id = params.id;
    fetch(`${baseUrl}itemedit/${id}`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          ...response
        });
        console.log("fetch response:", response);
      })
      .catch(error => console.log("error:", error));
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeDescript(e) {
    this.setState({
      descript: e.target.value
    });
  }
  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }
  onChangeImg(e) {
    this.setState({
      imgpath: e.target.value
    });
  }
  onChangeGroup(e) {
    this.setState({
      group: e.target.value
    });
  }
  defaultData(data) {
    this.setState({
      name: data.name,
      descript: data.descript,
      price: data.price
    });
  }

  editItem = () => {};

  onSubmit(e) {
    e.preventDefault();
    /* this.editItem(); */
    console.log("edit Item state:", this.state);
    //console.log("save cart parse : ", JSON.parse(this.state.cart.toString()));
    fetch(`${baseUrl}itemedit/${this.state.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        price: this.state.price,
        manufact: this.state.manufact,
        descript: this.state.descript,
        imgpath: this.state.imgpath,
        group: this.state.group
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response.message === "A username already exists") {
          alert("A username already exists");
        } else if (response.message === "User created successfully") {
          alert("Sined up successfully");
          this.toggleSignup();
        }
        console.log("response", response);
      })
      .catch(error => console.log("error:", error));
  }

  render() {
    console.log("this.props: ", this.props);
    const {
      match: { params }
    } = this.props;
    console.log("EditDetail params.id: ", params.id);
    return (
      <div className="container py-5">
        <div className="row">
          <div className="co-10 mx-auto col-md-6 my-3">
            <img
              className="img-fluid"
              src={`../${this.state.imgpath}`}
              alt="product"
            />
          </div>
          <div className="co-10 mx-auto col-md-6 my-3 text-capitalize">
            <h2>model : {this.state.name}</h2>
            <h4 className="text-name text-uppercase text-muted mt-3 mb-2">
              made by :{" "}
              <span className="text-uppercase">{this.state.manufact}</span>
            </h4>
            <h4 className="text-blue">
              <strong>
                price: <span>$</span>
                {this.state.price}
              </strong>
            </h4>
            <p className="text-capitalize font-weight-bold mt-3mb-0">
              {this.state.descript}
            </p>
            <p className="text-capitalize font-weight-bold mt-3mb-0">
              Category: {this.state.group}
            </p>

            <div>
              <Link to="/manageitems">
                <ButtonContainer>back to Product Edit</ButtonContainer>
              </Link>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Item Name: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label>Business Name: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.descript}
                  onChange={this.onChangeDescript}
                />
              </div>
              <div className="form-group">
                <label>Img Path: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.imgpath}
                  onChange={this.onChangeImg}
                />
              </div>
              <div className="form-group">
                <label>Price: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.price}
                  onChange={this.onChangePrice}
                />
              </div>
              <div className="form-group">
                <label>Category: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.group}
                  onChange={this.onChangeGroup}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Confirm"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
