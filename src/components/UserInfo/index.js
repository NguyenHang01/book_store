import React, { Component } from "react";
import { connect } from "react-redux";
import { Avatar, Popover } from "antd";
import { userSignOut } from "appRedux/actions/Auth";
import { auth } from "../../firebase/firebase";

class UserInfo extends Component {
  render() {
    const user = auth.currentUser;
    const photoURL = user.photoURL;
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li>My Account</li>
        <li>Connections</li>
        <li onClick={() => this.props.userSignOut()}>Logout</li>
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
