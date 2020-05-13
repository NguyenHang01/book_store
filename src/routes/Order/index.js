import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Select, Input, Button, Card, notification } from "antd";
import firebase from "firebase";

const db = firebase.firestore();
const { Option } = Select;
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: 0
    };
  }

  formItemLayout = {
    labelCol: {
      sm: { span: 4 }
    },
    wrapperCol: {
      sm: { span: 12 }
    }
  };

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  getListIdBook = async uid => {
    let listIdBook = [];
    await db
      .collection(`gio_hang/${uid}/sach`)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let data = doc.data();
          data.id = doc.id;
          listIdBook.push(data);
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
    return listIdBook;
  };

  getDateNow = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    return (today = mm + "/" + dd + "/" + yyyy);
  };

  order = async (listIdBook, uid, inf, totalCost) => {
    await db
      .collection(`don_hang`)
      .add({
        uid: uid,
        status: 0, //tinh trang don hang: 0->dang xu ly, 1->da giao
        ngay_dat: this.getDateNow(),
        dia_chi: inf.dia_chi,
        sdt: inf.sdt,
        ten: inf.ho_ten,
        sach: listIdBook,
        tong_tien: totalCost
      })
      .then(() => {
        this.openNotificationWithIcon("success", "Đặt hàng thành công!!!");
        // <Redirect to="/home"></Redirect>;
        // ()=>{<Redirect to="/home"></Redirect>}
      });
  };

  deleteCart = (listBook, uid) => {
    listBook.forEach(book => {

      //Xoa document book.id trong gio hang
      db.doc(`gio_hang/${uid}/sach/${book.id}`)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });

      //Update so_luong sach  trong document "sach/book.id"
      const bookRef = db.doc(`sach/${book.id}`);
      db.runTransaction(transaction => {
        return transaction.get(bookRef).then(doc => {
          let new_so_luong = doc.data().so_luong - book.so_luong;
          transaction.update(bookRef, { so_luong: new_so_luong });
        });
      });
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const uid = localStorage.getItem("user_id");
        const listIdBook = await this.getListIdBook(uid);
        const inf = {
          dia_chi:
            values.dia_chi +
            ", quận/huyện: " +
            values.huyen +
            ", tỉnh/thành phố: " +
            values.thanh_pho,
          ho_ten: values.ho_ten,
          sdt: values.sdt
        };
        let totalCost = 0;
        listIdBook.map(book => {
          totalCost += book.gia_ban * book.so_luong;
        });
        //Add bill moi vao collection "don_hang"
        this.order(listIdBook, uid, inf, totalCost);

        //Xoa het sach trong gio hang va update so sach con lai trong collection "sach"
        this.deleteCart(listIdBook, uid);

        this.setState({ success: 1 });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { success } = this.state;
    return (
      <div>
        {/* Neu order thanh cong thi redirect ve trang hom */}
        {success ? <Redirect to="/home" /> : null}
        <div className="title-header">
          <h3 className="text-title">Nhập thông tin của bạn</h3>
        </div>
        <Card>
          <Form
            {...this.formItemLayout}
            className="form-shape"
            onSubmit={this.handleSubmit}
          >
            <Form.Item label="Họ tên">
              {getFieldDecorator("ho_ten", {
                rules: [{ required: true, message: "Bạn chưa nhập họ tên!" }]
              })(<Input placeholder="Nhập họ tên" />)}
            </Form.Item>

            <Form.Item label="Số điện thoại">
              {getFieldDecorator("sdt", {
                rules: [
                  { required: true, message: "Bạn chưa nhập số điện thoại!" },
                  {
                    pattern: new RegExp("^[0-9]*$"),
                    message: "Bạn phải nhập vào một số"
                  }
                ]
              })(<Input placeholder="Nhập số điện thoại" />)}
            </Form.Item>

            <Form.Item label="Tỉnh/thành phố">
              {getFieldDecorator("thanh_pho", {
                rules: [
                  { required: true, message: "Bạn chưa nhập tỉnh/thành phố!" }
                ]
              })(<Input placeholder="Nhập tỉnh/thành phố" />)}
            </Form.Item>

            <Form.Item label="Quận/huyện">
              {getFieldDecorator("huyen", {
                rules: [
                  { required: true, message: "Bạn chưa nhập quận/huyện!" }
                ]
              })(<Input placeholder="Nhập quận/huyện" />)}
            </Form.Item>
            <Form.Item label="Địa chỉ">
              {getFieldDecorator("dia_chi", {
                rules: [{ required: true, message: "Bạn chưa nhập địa chỉ!" }]
              })(<Input placeholder="Nhập địa chỉ" />)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Xác nhận đặt hàng
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}
export default Form.create()(Order);
