import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NavBar from "./components/NavBar/NavBar";
import TasksWrapper from "./components/TasksWrapper/TasksWrapper";

function App() {
  return (
    <div className="App">
      {/* providing the routing for our application using react-router-dom */}
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/tasks" Component={TasksWrapper} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
