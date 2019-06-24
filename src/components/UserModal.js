import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "../context";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";

export default class UserModal extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const { openUserModal, closeUserModal } = value;

          if (!openUserModal) {
            return null;
          } else {
            return (
              <ModalContainer>
                <div className="constainer">
                  <div className="row">
                    <div
                      id="modal"
                      className="col-8 mx-auto col-lg-8 text-center text-capitalize p-5"
                    >
                      <h5>item added to the cart</h5>

                      <Link to="/">
                        <ButtonContainer onClick={() => closeUserModal()}>
                          Keep shopping
                        </ButtonContainer>
                      </Link>
                      <Link to="/cart">
                        <ButtonContainer cart onClick={() => closeUserModal()}>
                          Go to the cart
                        </ButtonContainer>
                      </Link>
                    </div>
                  </div>
                </div>
              </ModalContainer>
            );
          }
        }}
      </ProductConsumer>
    );
  }
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  jsutify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;
