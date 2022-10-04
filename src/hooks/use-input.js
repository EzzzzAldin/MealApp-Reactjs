import { useReducer } from "react";

const dataInput = { value: "", isTouched: false };

const inputReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: true };
  }

  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }

  return dataInput;
};

const useInput = (validateValue) => {
  const [stateInputVlaue, dispatch] = useReducer(inputReducer, dataInput);

  const valueIsValidate = validateValue(stateInputVlaue.value);

  const hasError = !valueIsValidate && stateInputVlaue.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const reset = (event) => {
    dispatch({ type: "RESET" });
  };

  return {
    value: stateInputVlaue.value,
    valueIsValidate,
    hasError,
    valueChangeHandler,
    reset,
  };
};

export default useInput;
