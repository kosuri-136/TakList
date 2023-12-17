import React, { useEffect } from "react";
import { getTasks } from "../../actions/tasks";
import Task from "../Task/Task";
import TaskForm from "../TaskForm/TaskForm";
import { useDispatch, useSelector } from "react-redux";
import "./TaskWrapper.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import navbaricon from "../../assets/images/navicon.png";
import { LOGOUT_USER } from "../../constants/user";
import { logout } from "../../actions/user"; // Import the logout action
const TasksWrapper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.user);
  const { message: addMsg } = useSelector((state) => state.createTask);
  const { message: updateMsg } = useSelector((state) => state.updateTask);
  const { message: deleteMsg } = useSelector((state) => state.deleteTask);

  useEffect(() => {
    if (!user.email) {
      navigate("/");
    }

    // here i want to dispatch whenever i update or add or delete a task so i keep the addMsg,updateMsg,deleteMsg as dependencies
    dispatch(getTasks(user._id));
  }, [addMsg, updateMsg, deleteMsg, user, dispatch, navigate]);

  const handleLogOut = () => {
    // Dispatch the logout action
    dispatch(logout());

    // Clear user data from local storage
    localStorage.removeItem("user_token");

    // Redirect to the login page
    navigate("/");

    window.location.reload();
  };

  const handleLogin = () => {
    // Dispatch the logout action
    dispatch(logout());

    // Clear user data from local storage
    localStorage.removeItem("user_token");

    // Redirect to the login page
    navigate("/");

    window.location.reload();
  };
  const handleSignUp = () => {
    // Dispatch the logout action
    dispatch(logout());

    // Clear user data from local storage
    localStorage.removeItem("user_token");

    // Redirect to the login page
    navigate("/register");

    window.location.reload();
  };
  return (
    <>
      <div className="pb-5">
        <nav class="navbar navbar-light bg-white custom-nav">
          <span class="navbar-brand nav-text">
            <img
              src={navbaricon}
              width="30"
              height="30"
              class="d-inline-block align-top"
              alt="icon"
              onClick={() => navigate("/")}
            />
            Todo-List
          </span>
          <div className="logoutbtn">
            <span className="spacebtwbtn">
              <button
                className="btn btn-primary task-button"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </span>
            <span className="spacebtwbtn">
              <button
                className="btn btn-primary task-button"
                onClick={handleLogin}
              >
                Login
              </button>
            </span>
            <span className="spacebtwbtn">
              <button
                className="btn btn-primary task-button"
                onClick={handleSignUp}
              >
                SignUp
              </button>
            </span>
          </div>
        </nav>
      </div>

      <div className="tasks-container">
        <h3 className="mb-3">Welcome to Task Manager</h3>
        <TaskForm />
        {loading === true ? (
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          tasks && tasks.map((task) => <Task task={task} key={task._id} />)
        )}
      </div>
    </>
  );
};

export default TasksWrapper;
