import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

function Backdrop(props) {
  const bkd = <div className="backdrop" onClick={props.onClick}></div>;

  return ReactDOM.createPortal(bkd, document.getElementById("backdropOverlay"));
}

export default Backdrop;
