import React from "react";

const Notification = ({ msg }) => {
  if (!msg) {
    return null;
  }
  return <div className="notification">{msg}</div>;
};

export default Notification;
