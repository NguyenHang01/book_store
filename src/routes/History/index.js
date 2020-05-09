import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Card, Divider } from "antd";
import firebase from "firebase";
import HistoryItem from "../../components/HistoryItem";

const db = firebase.firestore();
const style = { padding: "3px 0" };

class History extends Component {
  constructor(props) {
    super(props);
    this.state={
      listBill:[],
    };
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
      this.setState({listBill:listBill})
  }

  render() {
    const {listBill}=this.state;
    console.log(listBill);

    return (
      <div>
        <div>
        <Row gutter={16}>
          <Col className="gutter-row" span={4}>
            <div style={style}>Ngày đặt hàng</div>
          </Col>
          <Col className="gutter-row" span={4}>
            <div style={style}>Trạng thái</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>Sản phẩm</div>
          </Col>
          <Col className="gutter-row" span={3}>
            <div style={style}>Số lượng</div>
          </Col>
          <Col className="gutter-row" span={3}>
            <div style={style}>Giá tiền</div>
          </Col>
          <Col className="gutter-row" span={4}>
            <div style={style}>Tổng tiền</div>
          </Col>
        </Row>
      </div>
        {listBill.map(bill=>(
          <div>
          <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}></Divider>
          <HistoryItem bill={bill}/>
          </div>
        ))}
      </div>
    )
  }
}
export default History;
