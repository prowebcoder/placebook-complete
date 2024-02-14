import React from "react";
import InputElement from "../../common/UIComponents/InputElement";
import { useTestHook } from "../../test-hook";

const AddPlace = () => {
  const [formState, inputHandler] = useTestHook(
    {
      title: { value: "" },
      description: { value: "" },
      address: { value: "" },
    },
    false
  );

  function formSubmitHandler(event) {
    event.preventDefault();

    console.log("Formdata", formState);
  }
  return (
    <div style={{ padding: "10px", margin: "20px" }}>
      <form className="form" onSubmit={formSubmitHandler}>
        <InputElement
          element="input"
          id="title"
          onInput={inputHandler}
          label="Title"
          placeholder="Enter The Place"
        ></InputElement>
        <InputElement
          element="input"
          id="address"
          onInput={inputHandler}
          label="address"
          placeholder="Enter The Address"
        ></InputElement>
        <InputElement
          element="textarea"
          id="description"
          onInput={inputHandler}
          label="Description"
          placeholder="Enter The Description"
        ></InputElement>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPlace;
