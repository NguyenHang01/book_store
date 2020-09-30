import React, { Component } from "react";
import { connect } from "react-redux";
import { Avatar, Popover } from "antd";
import { userSignOut } from "appRedux/actions/Auth";
import firebase from "firebase";
import { Link } from "react-router-dom";


class UserInfo extends Component {
  render() {
    const photoURL = localStorage.getItem("PhotoURL");
    const userMenuOptions = (
      <ul className="gx-user-popover" >
        <Link to={`/history`} >
        <li >Lịch sử đặt hàng</li>
        </Link>
        <li style={{color: "while"}} onClick={() => this.props.userSignOut()}>Đăng xuất</li>
      </ul>
    );

    return (
      <Popover
        overlayClassName="gx-popover-horizantal"
        placement="bottomRight"
        content={userMenuOptions}
        trigger="click"
      >
        <Avatar src={photoURL} className="gx-avatar gx-pointer" alt="" />
      </Popover>
    );
  }
}

export default connect(null, { userSignOut })(UserInfo);
