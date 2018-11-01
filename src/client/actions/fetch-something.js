export const fetchSomething = () => {
  return dispatch => {
    dispatch({ type: "SET_LOADING", loading: true });
    setTimeout(() => {
      dispatch({ type: "SET_INPUT", input: "i just loaded something" });
      dispatch({ type: "SET_LOADING", loading: false });
    }, 3000);
  };
};
