import React from "react";

const TheLoaiItem = ({ the_loai }) => {
  const { anh, ten } = the_loai;
  return (
    <div className="gx-classic-testimonial gx-slide-item">
      <div style={{ width: 225, height: 225 }}>
        <img src={anh} alt="..." />
      </div>
      <h3 className="gx-title">{ten}</h3>
    </div>
  );
};

export default TheLoaiItem;
