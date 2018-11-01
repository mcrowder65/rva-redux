export const reducer = (state, action) => {
  if (action.type === "SET_INPUT") {
    return {
      ...state,
      input: action.input
    };
  } else if (action.type === "SET_LOADING") {
    return {
      ...state,
      loading: action.loading
    };
  }
  return state;
};
