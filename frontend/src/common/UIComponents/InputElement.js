import React, { useReducer, useEffect } from "react";

const reducer = (state, action) => {
  console.log();
  switch (action.type) {
    case "INPUT_CHANGED": /// what is xxx will be changed later
      return { ...state, value: action.value };
    case "TOUCH": /// what is xxx will be changed later
      return { ...state, isTouched: true };
    default:
      return state;
  }
};

const initialValues = {
  value: "",
  placeholder: "",
  isTouched: false,
};

const InputElement = (props) => {
  const [inputState, dispatch] = useReducer(reducer, initialValues);
  function changeHandler(event) {
    dispatch({
      type: "INPUT_CHANGED",
      value: event.target.value,
    });
  }

  const { id, onInput } = props;
  const { value } = inputState;
  useEffect(() => {
    onInput(id, value);
  }, [id, value, onInput]);
  function touchHandler() {
    dispatch({ type: "TOUCH" });
  }

  const element =
    props.element === "input" ? (
      <input
        type="text"
        value={inputState.value}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
      />
    ) : (
      <textarea onChange={changeHandler} onBlur={touchHandler}></textarea>
    );

  return (
    <div>
      {props.label}:{element}
    </div>
  );
};

export default InputElement;
