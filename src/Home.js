import React from "react";
import './App.css';
import Header from './Header';
import { AuthContext } from "./App";

const Home = () => {
    const { state } = React.useContext(AuthContext);
    return (
        <div className="App">
            {state.token}
        </div>
    );
};
export default Home;