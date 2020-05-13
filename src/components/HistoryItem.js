import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Input, Col, Popconfirm } from "antd";
import firebase from "firebase";

const db = firebase.firestore();
const style = { padding: "3px 0" };
class HistoryItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { bill } = this.props;
    const sach = bill.sach;
    return (
      <div>
        <Row gutter={16}>
          <Col className="gutter-row" span={4}>
            <div style={style}>{bill.ngay_dat}</div>
          </Col>
          <Col className="gutter-row" span={4}>
            <div style={style}>
              {" "}
              {bill.status ? "đã giao thành công" : "đang được giao"}{" "}
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
              {sach.map(item => (
                <Row gutter={[11, 20]}>
                  <Col span={12}>
                    <Link to={`/book/${item.id}`}>
                      <div style={{ padding: "3px 0"}}>
                        {item.ten.slice(0, 30)}
                      </div>
                    </Link>
                  </Col>
                  <Col span={6}>
                    <div style={{ padding: "3px 0"}}>
                      {item.so_luong}
                    </div>
                  </Col>
                  <Col span={6}>
                    <div style={{ padding: "3px 0" }}>
                    {Number(item.gia_ban).toLocaleString()}đ
                    </div>
                  </Col>
                </Row>
              ))}

          </Col>
          <Col className="gutter-row" span={4}>
            <div style={style}>{Number(bill.tong_tien).toLocaleString()}đ </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default HistoryItem;
