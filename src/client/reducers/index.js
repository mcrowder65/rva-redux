export const reducer = (prevState, action) => {
  if (action.type === "SET_INPUT") {
    return {
      ...prevState,
      input: action.input
    };
  } else if (action.type === "SET_LOADING") {
    return {
      ...prevState,
      loading: action.loading
    };
  }
  return prevState;
};

export const getInput = state => state.input;
