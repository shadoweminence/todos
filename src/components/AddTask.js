import React, { useState, useContext } from "react";
import taskContext from "../context/taskContext";

const AddTasks = (props) => {
  const context = useContext(taskContext);
  const { addTask } = context;

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addTask(task.title, task.description);
    setTask({ title: "", description: "" });
  };

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container my-3">
        <h1>Add a todo Task</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              onChange={onChange}
              name="title"
              id="title"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              onChange={onChange}
              name="description"
              id="description"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddTasks;
