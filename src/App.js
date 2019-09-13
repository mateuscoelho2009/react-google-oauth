import React from 'react';
import  { Redirect } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Login from './Login';
import Home from './Home';

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

function App({
  match: {
      params: {
          jwttoken,
      }
  }
}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  if (jwttoken && !state.isAuthenticated) {
      dispatch({
          type: 'LOGIN',
          payload: {
            // in this case, the user payload do not come
            user: null,
            token: jwttoken,
          },
      });
  }
  if (state.isAuthenticated && jwttoken) {
    return <Redirect to='/' />
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <div className="App">
        <Header />
        {!state.isAuthenticated ? <Login /> : <Home />}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
