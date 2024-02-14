import React, { useState, useContext } from "react";
import Input from "../../common/UIComponents/Input";
import Button from "../../common/UIComponents/Button";
import { useFormHook } from "../../common/form-hook";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../common/UIComponents/Validator";
import Card from "../component/Card";
import "./Auth.css";
import { AuthContext } from "../../context/log-context";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../common/UIComponents/ErrorModal";
import LoadingSpinner from "../../common/UIComponents/LoadingSpinner";
import { useHttpClient } from "../../common/UIComponents/http-hook";
function Auth() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, errorHandler } = useHttpClient();
  const [formState, inputHandler, setFormData] = useFormHook(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:4000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        console.log(responseData);
        auth.login(responseData.user._id);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:4000/api/users/signup",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            name: formState.inputs.name.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        // console.log(responseData);
        auth.login(responseData);
      } catch (err) {}
    }

    // console.log(formState.inputs);
    navigate("/");
  };
  function signUpHandler() {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }

    setIsLoginMode((state) => !state);
  }

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="auth">
        {isLoading && <LoadingSpinner></LoadingSpinner>}
        <h2>Login Required</h2>
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Your Name"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter you name"
            ></Input>
          )}
          <Input
            id="email"
            element="input"
            type="text"
            label="Your Email"
            onInput={inputHandler}
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter the Email"
          ></Input>
          <Input
            id="password"
            element="input"
            type="password"
            label="Your password"
            onInput={inputHandler}
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter the Password"
          ></Input>

          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse type="submit" onClick={signUpHandler}>
          Swich to {isLoginMode ? "Signup" : "Login"}
        </Button>
      </Card>
    </>
  );
}

export default Auth;
