import React from "react";
import {Avatar} from "antd";
import { Link } from "react-router-dom";

const TacGiaItem = ({tac_gia}) => {
  const {mo_ta, anh, ten} = tac_gia;
  return (
    <Link to={`/id_tg/${tac_gia.id}`}>
    <div className="gx-classic-testimonial gx-slide-item">
      <Avatar src={anh} alt="..."/>
      <h3  className="gx-title">{ten}</h3>
      <p className="gx-description">{mo_ta}</p>
    </div>
    </Link>
  )
};

export default TacGiaItem;

