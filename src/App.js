import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddCandidate from "./pages/AddCandidate";
import { AuthProvider } from "./context/Auth";
import PrivateRoute from "./HOC/PrivateRoute";
import Header from "./components/header";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className={'App h-screen'}>
          <Header></Header>
          <PrivateRoute exact path="/add" component={AddCandidate} />
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
