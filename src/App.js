import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddCandidate from "./pages/AddCandidate";
import { AuthProvider } from "./context/Auth";
import PrivateRoute from "./HOC/PrivateRoute";
import Header from "./components/header";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className={"App h-screen"}>
          <Header></Header>
          <PrivateRoute exact path="/add" component={AddCandidate} />
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;
