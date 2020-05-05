import React from "react";
import {Avatar} from "antd";

const TacGiaItem = ({tac_gia}) => {
  const {mo_ta, anh, ten} = tac_gia;
  return (
    <div className="gx-classic-testimonial gx-slide-item">
      <Avatar src={anh} alt="..."/>
      <h3  className="gx-title">{ten}</h3>
      <p className="gx-description">{mo_ta}</p>
    </div>
  )
};

export default TacGiaItem;

