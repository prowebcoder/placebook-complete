import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../common/UIComponents/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../common/UIComponents/Validator";
import Button from "../../common/UIComponents/Button";
import { useFormHook } from "../../common/form-hook";
import Card from "../../user/component/Card";
import "../../user/pages/Auth.css";
import { useHttpClient } from "../../common/UIComponents/http-hook";
import LoadingSpinner from "../../common/UIComponents/LoadingSpinner";
import ErrorModal from "../../common/UIComponents/ErrorModal";
const UpdatePlace = () => {
  const placeID = useParams().placeID;
  const [loadedPlaces, setLoadedPlaces] = useState();

  const { isLoading, error, sendRequest, errorHandler } = useHttpClient();
  const [formState, inputHandler, setFormData] = useFormHook(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:4000/api/places/${placeID}`
        );
        setLoadedPlaces(responseData.place);
        console.log(responseData.place);
        setFormData({
          title: {
            value: responseData.place.title,
            isValid: false,
          },
          description: {
            value: responseData.place.description,
            isValid: false,
          },
        });
      } catch (err) {}
    };

    fetchPlace();
  }, [setFormData, placeID, sendRequest]);

  const formPlaceUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:4000/api/places/${placeID}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        { "Content-Type": "application/json" }
      );
    } catch (err) {}
    console.log(formState.inputs);
  };

  if (isLoading) {
    return <h1>Page Is loading....</h1>;
  }
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <Card className="auth">
        {!isLoading && loadedPlaces && (
          <form onSubmit={formPlaceUpdateSubmitHandler}>
            <Input
              id="title"
              element="input"
              type="text"
              label="title"
              onInput={inputHandler}
              value={loadedPlaces.title}
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter the title"
              initialValue={loadedPlaces.title}
            ></Input>
            <Input
              id="description"
              element="textarea"
              validators={[VALIDATOR_REQUIRE()]}
              type="text"
              label="Description"
              onInput={inputHandler}
              errorText="Please enter the title"
              value={loadedPlaces.description}
              initialValue={loadedPlaces.description}
            ></Input>
            <Button type="submit">Update Place</Button>
          </form>
        )}
      </Card>
    </>
  );
};

export default UpdatePlace;
