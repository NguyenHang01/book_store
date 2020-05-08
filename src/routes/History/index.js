import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Select, Input, Button, Card, notification } from "antd";
import firebase from "firebase";

const db = firebase.firestore();
class History extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  async componentDidMount() {
    let listBill = [];
    const uid = firebase.auth().currentUser.uid;
    await db.collection("don_hang")
      .where("uid", "==", uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let data = doc.data();
          data.id = doc.id;
          listBill.push(data);
        });
      })
      .catch();
      console.log(listBill);
  }

  render() {
    return <div></div>;
  }
}
export default History;
