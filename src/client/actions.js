export const thunk = () => {
  return dispatch => {
    dispatch({ type: "SET_LOADING", loading: true });
    setTimeout(() => {
      dispatch({ type: "SET_INPUT", input: "world" });
      dispatch({ type: "SET_LOADING", loading: false });
    }, 3000);
  };
};
