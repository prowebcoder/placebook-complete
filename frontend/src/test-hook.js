import { useReducer, useCallback } from "react";
const reducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value },
        },
      };
    default:
      return state;
  }
};

export const useTestHook = (initialInput, initialValid) => {
  const [formState, dispatch] = useReducer(reducer, {
    inputs: initialInput,
    isValid: initialValid,
  });
  const inputHandler = useCallback((id, value) => {
    dispatch({ type: "INPUT_CHANGE", value: value, inputId: id });
  }, []);

  return [formState, inputHandler];
};
