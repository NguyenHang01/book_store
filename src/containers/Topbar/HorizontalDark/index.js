import React, { Component } from "react";
import {
  Button,
  Dropdown,
  Icon,
  Layout,
  Menu,
  message,
  Popover,
  Select,
  AutoComplete,
  Input
} from "antd";
import { connect } from "react-redux";
import CustomScrollbars from "util/CustomScrollbars";
import { Link, Redirect, withRouter } from "react-router-dom";

import languageData from "../languageData";
import SearchBox from "components/SearchBox";
import UserInfo from "components/UserInfo";
import AppNotification from "components/AppNotification";
import MailNotification from "components/MailNotification";
import HorizontalNav from "../HorizontalNav";
import {
  switchLanguage,
  toggleCollapsedSideNav
} from "../../../appRedux/actions/Setting";
import IntlMessages from "../../../util/IntlMessages";
import firebase from "firebase";

const { Header } = Layout;

const Option = Select.Option;
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">Products</Menu.Item>
    <Menu.Item key="2">Apps</Menu.Item>
    <Menu.Item key="3">Blogs</Menu.Item>
  </Menu>
);

function handleMenuClick(e) {
  message.info("Click on menu item.");
}

class HorizontalDark extends Component {
  state = {
    searchText: "",
    result: [],
    category: 'sach',
  };

  handleChangeCategory = value => {
    this.setState({ category: value });
  };

  languageMenu = () => (
    <CustomScrollbars className="gx-popover-lang-scroll">
      <ul className="gx-sub-popover">
        {languageData.map(language => (
          <li
            className="gx-media gx-pointer"
            key={JSON.stringify(language)}
            onClick={e => this.props.switchLanguage(language)}
          >
            <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`} />
            <span className="gx-language-text">{language.name}</span>
          </li>
        ))}
      </ul>
    </CustomScrollbars>
  );

  searchResult = async query => {
    const {category} =this.state;
    const db = firebase.firestore();
    query += " ";
    const snapshot = await db
      .collection(category)
      .where("arr_result", "array-contains", query.toLowerCase())
      .get();
    let arr = [];
    snapshot.docs.map(item => {
      const a = {};
      a.ten = item.data().ten;
      a.id = item.id;
      arr.push(a);
    });
    this.setState({ result: arr });
  };

  handleSearch = value => {
    this.setState({ searchText: value ? this.searchResult(value) : [] });
  };

  onSelect = value => {
    let router = '';
    switch(this.state.category){
      case 'sach':
        router = '/book/';
        break;
      case 'nxb':
        router = '/id_nxb/';
        break;
      case 'tac-gia':
        router = '/id_tg/';
        break;
      case 'the-loai':
        router = '/id_the_loai/';
        break;
    }
    router+=value;
    this.props.history.push(router)
  };

  updateSearchChatUser = evt => {
    this.setState({
      searchText: evt.target.value
    });
  };
  render() {
    const { locale, navCollapsed } = this.props;
    const { searchText, result, router, re } = this.state;
    return (
      <div className="gx-header-horizontal gx-header-horizontal-dark">
        <div className="gx-header-horizontal-top">
          <div className="gx-container">
            <div className="gx-header-horizontal-top-flex"></div>
          </div>
        </div>

        <Header className="gx-header-horizontal-main">
          <div className="gx-container">
            <div className="gx-header-horizontal-main-flex">
              <div className="gx-d-block gx-d-lg-none gx-linebar gx-mr-xs-3">
                <i
                  className="gx-icon-btn icon icon-menu"
                  onClick={() => {
                    this.props.toggleCollapsedSideNav(!navCollapsed);
                  }}
                />
              </div>
              <Link
                to="/"
                className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo"
              >
                <img alt="" src={require("assets/images/w-logo.png")} />
              </Link>
              <Link
                to="/"
                className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo"
              >
                <img alt="" src={require("assets/images/logo.png")} />
              </Link>
              <div className="gx-header-search gx-d-none gx-d-lg-flex">
                <AutoComplete
                  dropdownMatchSelectWidth={252}
                  style={{
                    width: 300
                  }}
                  options={searchText}
                  onSelect={this.onSelect}
                  onSearch={this.handleSearch}
                >
                  {result.map(item => (
                    <Option key={item.id} value={item.id}>
                      {item.ten}
                    </Option>
                  ))}
                </AutoComplete>
                <Select
                  defaultValue="sach"
                  style={{ width: 120 }}
                  onChange={this.handleChangeCategory}
                >
                  <Option value="sach">Sách</Option>
                  <Option value="tac-gia">Tác giả</Option>
                  <Option value="nxb">NXB</Option>
                  <Option value="the-loai">Thể loại</Option>
                </Select>
              </div>

              <ul className="gx-header-notifications gx-ml-auto">
                <li className="gx-notify gx-notify-search gx-d-inline-block gx-d-lg-none">
                  <Popover
                    overlayClassName="gx-popover-horizantal"
                    placement="bottomRight"
                    content={
                      <div className="gx-d-flex">
                        <Dropdown overlay={menu}>
                          <Button>
                            Category <Icon type="down" />
                          </Button>
                        </Dropdown>
                        <SearchBox
                          styleName="gx-popover-search-bar"
                          placeholder="Search in app..."
                          onChange={this.updateSearchChatUser.bind(this)}
                          value={this.state.searchText}
                        />
                      </div>
                    }
                    trigger="click"
                  >
                    <span className="gx-pointer gx-d-block">
                      <i className="icon icon-search-new" />
                    </span>
                  </Popover>
                </li>
                <li className="gx-msg">
                  <span className="gx-pointer gx-status-pos gx-d-block">
                    <Link to={`/card`}>
                      <i className="icon icon-shopping-cart" />
                    </Link>
                    {/* <span className="gx-status gx-status-rtl gx-small gx-orange"/> */}
                  </span>
                </li>
                <li className="gx-user-nav">
                  <UserInfo />
                </li>
              </ul>
            </div>
          </div>
        </Header>
        <div className="gx-header-horizontal-nav gx-d-none gx-d-lg-block">
          <div className="gx-container">
            <div className="gx-header-horizontal-nav-flex">
              <HorizontalNav />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale, navCollapsed } = settings;
  return { locale, navCollapsed };
};
export default withRouter(connect(mapStateToProps, {
  toggleCollapsedSideNav,
  switchLanguage
})(HorizontalDark));
