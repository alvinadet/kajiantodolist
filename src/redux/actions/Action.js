export const addData = text => dispatch => {
  dispatch({ type: 'ADD_DATA', payload: text });
};

export const deleteData = id => dispatch => {
  dispatch({ type: 'DELETE_DATA', payload: id });
};
