export const initialState = null;

//create reducer
export const reducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  }
  if (action.type === "CLEAR") {
    return null;
  }
  if (action.type === "ADMIN") {
    return action.payload;
  }
  return state;
};
