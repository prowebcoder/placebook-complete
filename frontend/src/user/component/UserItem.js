import React from "react";
import "./UserItem.css";
import Avatar from "../../common/Avatar";
import { Link } from "react-router-dom";
import Card from "./Card";
function UserItem(props) {
  return (
    <li className="user-item">
      <Card className="user-item-content">
        <Link to={`/${props.id}/${props.name}/places`}>
          <div className="user-item-image">
            <Avatar image={props.image} alt={props.name} className="xyz" />
          </div>
          <div className="user-item__info">
            <div className="user-item-name">Name: {props.name}</div>
            <div className="user-item-placecount">
              {props.placecount === "1" ? "Place" : "Places"}:{" "}
              {props.placecount}
            </div>
          </div>
        </Link>
      </Card>
    </li>
  );
}

export default UserItem;
