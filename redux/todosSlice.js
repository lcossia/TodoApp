import { createSlice } from "@reduxjs/toolkit";

// Cada vez que creamos un slice hay que pasarle un nombre y un estado inicial
const initialState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  // Arreglo de funciones que van a manejar los cambios en el estado
  reducers: {
    setTodosReducers: (state, action) => {
      state.todos = action.payload;
    },
    // Agregar una nueva tarea
    addTodoReducer: (state, action) => {
      state.todos.push(action.payload);
    },
    // Marcar una tarea como completada y la oculta
    hideCompletedReducer: (state) => {
      state.todos = state.todos.filter((todo) => !todo.isCompleted);
    },
    // Actualiza el estado de una tarea
    updateTodoReducer: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      });
    },
    // Elimina una tarea, el arreglo se queda con las tareas que no tengan el id de la tarea eliminada
    deleteTodoReducer: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const {
  setTodosReducers,
  addTodoReducer,
  hideCompletedReducer,
  updateTodoReducer,
  deleteTodoReducer,
} = todosSlice.actions;

export default todosSlice.reducer;
