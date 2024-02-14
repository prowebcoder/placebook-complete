import React, { useState, useContext } from "react";
import Card from "../../user/component/Card";
import Button from "../../common/UIComponents/Button";
import Modal from "../../common/UIComponents/Modal";
import Map from "../../common/UIComponents/Map";
import { AuthContext } from "../../context/log-context";
import "./PlaceItem.css";
import { useHttpClient } from "../../common/UIComponents/http-hook";
import ErrorModal from "../../common/UIComponents/ErrorModal";
import LoadingSpinner from "../../common/UIComponents/LoadingSpinner";
const PlaceItem = (props) => {
  const { isLoading, error, sendRequest, errorHandler } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const closeDeleteHandler = () => setConfirmDelete(false);

  const deleteWarningButtonHandler = () => {
    setConfirmDelete(true);
  };
  const confirmDeleteButtonHandler = async () => {
    console.log(props);
    setConfirmDelete(false);
    try{
 await sendRequest(`http://localhost:4000/api/places/${props.id}`,'DELETE');
 props.onDelete(props.id);
    }
    catch(err){

    }

  };

  return (
    <>
       <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>X</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16}></Map>
        </div>
      </Modal>
      <Modal
        show={confirmDelete}
        onCancel={closeDeleteHandler}
        header="Are you sure you want to delete this place?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            {" "}
            <Button onClick={closeDeleteHandler}>X</Button>
          </>
        }
      >
        <div>
          <p className="space_items_buttons">
            <Button onClick={confirmDeleteButtonHandler}>Yes</Button>
            <Button onClick={closeDeleteHandler}>No</Button>
          </p>
        </div>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.isLoggedIn && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={deleteWarningButtonHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
