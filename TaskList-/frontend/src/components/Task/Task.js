import React, { useState } from "react";
import "./Task.css";
import NavBar from "../NavBar/NavBar";
import { useDispatch } from "react-redux";
import { deleteTask, updatedTask } from "../../actions/tasks";
const Task = ({ task }) => {
  const [edit, setEdit] = useState(false); // used conditonally rendering the task and edit components
  const [updatemsg, setUpdatemsg] = useState(task.task); // to update the task description
  const [finished, setFinished] = useState(task.isComplete); // to display whether the task is complete or not
  const dispatch = useDispatch();
  const updateTask = () => {
    if (updatemsg !== "") {
      dispatch(
        updatedTask(task._id, { task: updatemsg, isComplete: finished })
      );
      setEdit(false);
    }
  };
  const updateTask2 = () => {
    dispatch(updatedTask(task._id, { task: updatemsg, isComplete: !finished }));
    setFinished(!finished);
  };

  return (
    <>
      {/* conditionally rendering the edit block and task block based on edit state */}
      {edit ? (
        <div className="update-task">
          <input
            type="text"
            value={updatemsg}
            className="mr-3 update-input"
            onChange={(e) => setUpdatemsg(e.target.value)}
          />
          <button
            className="btn btn-primary update-button"
            onClick={updateTask}
          >
            Update
          </button>
        </div>
      ) : (
        <div className="task mt-3 mb-3">
          <div className="icon-flex">
            <div className="pt-1">
              <input
                type="checkbox"
                checked={finished}
                onChange={updateTask2}
                className="task-complete mr-4"
              />
            </div>
            <div className={`task-description ${finished ? "crossline" : " "}`}>
              {task.task}
            </div>
          </div>

          <div className="icon-flex">
            <div>
              <i
                class="fa-regular fa-pen-to-square pr-3"
                onClick={() => setEdit(true)}
              ></i>
            </div>
            <div>
              <i
                class="fa-solid fa-trash-can pl-3"
                onClick={() => dispatch(deleteTask(task._id))}
              ></i>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Task);
