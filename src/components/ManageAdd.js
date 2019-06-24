import { Card, Button, Form, FormGroup, Input, Label } from "reactstrap";
import React, { Component } from "react";
import { baseUrl } from "./baseUrl";

export default class ManageAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.addItem = this.addItem.bind(this);
  }
  addItem(event) {
    fetch(`${baseUrl}/item/${this.item.value}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        price: this.price.value,
        descript: this.descript.value,
        imgpath: this.imgpath.value,
        group: this.group.value,
        manufact: this.manufact.value
      })
    })
      .then(response => response.json())
      .then(response => {
        if (
          response.message ===
          `An item with name ${this.item.value} already exists`
        ) {
          alert("A username already exists");
        } else if (response.message === "Success") {
          alert("Item added successfully");
        }
      })
      .catch(error => console.log("error:", error));
    event.preventDefault();
  }

  render() {
    return (
      <Card className="col-9 mx-auto col-md-6 col-lg-3 my-3">
        <Form onSubmit={this.addItem}>
          <FormGroup>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              innerRef={input => (this.item = input)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="imgpath">Img Path</Label>
            <Input
              type="text"
              id="imgpath"
              name="imgpath"
              innerRef={input => (this.imgpath = input)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="price">Price</Label>
            <Input
              type="text"
              id="price"
              name="price"
              innerRef={input => (this.price = input)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="manufacturer">Manufacturer</Label>
            <Input
              type="select"
              name="manufacturer"
              id="manufacturer"
              innerRef={input => (this.manufact = input)}
            >
              <option>Google</option>
              <option>Samsung</option>
              <option>Apple</option>
              <option>HTC</option>
              <option>AMD</option>
              <option>intel</option>
              <option>Etc,</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="group">Category</Label>
            <Input
              type="select"
              name="group"
              id="group"
              innerRef={input => (this.group = input)}
            >
              <option>cellphone</option>
              <option>cpu</option>
              <option>laptop</option>
              <option>etc</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>
              <Input
                type="textarea"
                name="description"
                innerRef={input => (this.descript = input)}
              />
              description
            </Label>
          </FormGroup>
          <Button type="submit" value="submit" color="primary">
            Add an item
          </Button>
        </Form>
      </Card>
    );
  }
}
