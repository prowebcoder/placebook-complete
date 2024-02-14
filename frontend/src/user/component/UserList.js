import React from "react";
// import Users from "./Users";
import UserItem from "./UserItem";
import "./UserList.css";
import Card from "./Card";
function UserList(props) {
  if (props.items.length === 0) {
    return (
      <Card className="nouser">
        <div>No Users Were Found</div>
      </Card>
    );
  }
  return (
    <ul className="list-users">
      {props.items.map((user) => {
        return (
          <UserItem
            key={user._id}
            id={user._id}
            image={user.image}
            name={user.name}
            placecount={user.places.length}
          />
        );
      })}
    </ul>
  );
}

export default UserList;
