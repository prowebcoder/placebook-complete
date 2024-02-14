import React, { useContext } from "react";
import Input from "../../common/UIComponents/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../common/UIComponents/Validator";
import Button from "../../common/UIComponents/Button";
import "./NewPlace.css";
import { useFormHook } from "../../common/form-hook";
import { useHttpClient } from "../../common/UIComponents/http-hook";
import ErrorModal from "../../common/UIComponents/ErrorModal";
import LoadingSpinner from "../../common/UIComponents/LoadingSpinner";
import { AuthContext } from "../../context/log-context";
import { useNavigate } from "react-router-dom";
function NewPlace() {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, errorHandler } = useHttpClient();
  const [formState, inputHandler] = useFormHook(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const history = useNavigate();
  const placeSubmitHandler = async (event) => {
    event.preventDefault();
   console.log(auth.userId);
    try {
      await sendRequest(
        "http://localhost:4000/api/places",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId,
        }),
        { "Content-Type": "application/json" }
      );
    
      history.push("/");
    } catch (err) {}
  };
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner></LoadingSpinner>}
        <Input
          element="input"
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          id="title"
          type="text"
          label="title"
          placeholder="title"
          initialValue={formState.inputs.title.value}
          errorText="Please enter a valid title"
        />

        <Input
          rows={20}
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          initialValue={formState.inputs.address.value}
          placeholder="address"
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />

        <Input
          element="textarea"
          id="description"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          placeholder="Description"
          errorText="Please enter a valid description (at least 5 characters)."
        />

        <Button type="submit">Add Place</Button>
      </form>
    </>
  );
}

export default NewPlace;
