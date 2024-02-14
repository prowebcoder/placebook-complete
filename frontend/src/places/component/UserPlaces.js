import React, { useEffect, useState } from "react";
import UserPlaceList from "../pages/UserPlaceList";

import { useHttpClient } from "../../common/UIComponents/http-hook";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../common/UIComponents/LoadingSpinner";
import ErrorModal from "../../common/UIComponents/ErrorModal";
function UserPlaces() {
  const { isLoading, error, sendRequest, errorHandler } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const userID = useParams().userID;
  console.log(userID);
  useEffect(() => {
    const sendDataRequest = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:4000/api/places/user/${userID}`
        );
        console.log(responseData);
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    sendDataRequest();
  }, [sendRequest,userID]);

  const deletePlaceHandler = (deletedPlaceID) =>{
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceID))
  }
  return (
    <>
     <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
         {!isLoading && loadedPlaces &&  <UserPlaceList items={loadedPlaces} onDeletePlace={deletePlaceHandler} />}
    </>
  );
}

export default UserPlaces;
