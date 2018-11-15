const todoState = {
  todos: []
};

const todoReducer = (state = todoState, action) => {
  switch (action.type) {
    case 'ADD_DATA': {
      return { ...state.todos, todos: [...state.todos, action.payload] };
    }
    case 'DELETE_DATA': {
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, action.payload),
          ...state.todos.slice(action.payload + 1)
        ]
      };
    }
    case 'EDIT_DATA': {
      let newArray = state.todos.slice();
      newArray.splice(action.payload, 1);
      return newArray;
    }
  }
  return state;
};

export default todoReducer;
