import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card, Button, Input, notification, Popconfirm } from "antd";

class BooktItemForCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.book.sl_order
    };
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  changeQuantity = e => {
    const { book } = this.props;
    let { quantity } = this.state;
    switch (e.target.id) {
      case "tang":
        if (quantity === book.so_luong)
          this.openNotificationWithIcon(
            "warning",
            "Không thể mua quá số lượng trong kho"
          );
        else this.setState({ quantity: quantity + 1 });
        break;
      case "giam":
        if (quantity > 1) this.setState({ quantity: quantity - 1 });
        break;
    }
    return quantity;
  };

  confirm=(e)=>{

  }

  render() {
    const { anh, ten, gia_bia, chiet_khau, id } = this.props.book;
    let { quantity } = this.state;
    return (
      <div
        style={{ marginLeft: 10 }}
        className={`gx-product-item gx-product-horizontal`}
      >
        <div style={{ width: 160, height: 210 }} className="gx-product-image">
          <img
            style={{
              height: 200,
              width: 170,
              marginRight: 5,
              marginLeft: 10,
              marginBottom: 3
            }}
            alt="book"
            src={anh}
          />
        </div>
        <Link to={`/book/${id}`}>
          <div className="gx-product-body">
            <div style={{ height: 60, width: 145 }}>
              <h4>{ten}</h4>
            </div>
            <div className="ant-row-flex">
              <h4>{Math.floor(gia_bia * (1 - chiet_khau / 100))}đ </h4>
              <h5 className="gx-text-muted gx-px-2">
                <del>{gia_bia}đ</del>
              </h5>
              <h5 className="gx-text-success">{chiet_khau}% off</h5>
            </div>
          </div>
        </Link>
        <div>
          <div style={{ float: "inline-start" }}>
            <Input.Group compact>
              <Button
                id="tang"
                style={{ width: "18%" }}
                onClick={this.changeQuantity}
              >
                +
              </Button>
              <Input style={{ width: "14%" }} value={quantity} />
              <Button
                id="giam"
                style={{ width: "18%" }}
                onClick={this.changeQuantity}
              >
                -
              </Button>
            </Input.Group>
          </div>
          <div style={{ float: "inline-start" }}>
            <Popconfirm
              title="Bạn có muốn xóa sản phẩm này ra khỏi giỏ hàng?"
              onConfirm={this.confirm}
              // onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger >
                Xóa
              </Button>
            </Popconfirm>
          </div>
        </div>
      </div>
    );
  }
}

export default BooktItemForCart;
