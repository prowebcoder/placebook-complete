import React, { useState, useEffect } from "react";
import PlaceList from "../pages/PlaceList";
import { useHttpClient } from "../../common/UIComponents/http-hook";
import ErrorModal from "../../common/UIComponents/ErrorModal";
import LoadingSpinner from "../../common/UIComponents/LoadingSpinner";


function Places() {
  const { isLoading, error, sendRequest, errorHandler } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();
  useEffect(() => {
    const sendDataRequest = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:4000/api/places"
        );
        console.log(responseData);
        setLoadedPlaces(responseData);
      } catch (err) {}
    };
    sendDataRequest();
  }, [sendRequest]);
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
    </>
  );
}

export default Places;
