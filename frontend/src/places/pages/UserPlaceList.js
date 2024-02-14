import React from "react";
import PlaceItem from "./PlaceItem";
import Card from "../../user/component/Card";
import { useParams } from "react-router-dom";
import "./PlaceList.css";
function UserPlaceList(props) {
  const { userID, name } = useParams();
  // console.log(props.items);
  // console.log("userId:", userID);
  console.log("name:", name);
  // Filter places based on the dynamic userId parameter
  const filteredPlaces = props.items.filter((item) => item.creator === userID);
  console.log(filteredPlaces);
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {filteredPlaces.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
}

export default UserPlaceList;
