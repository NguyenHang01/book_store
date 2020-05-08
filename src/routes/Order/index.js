import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Input, notification, Popconfirm } from "antd";
import firebase from "firebase";

const db = firebase.firestore();

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render(){
    return(
      <div>

      </div>
    );
  }
}
export default Order;
