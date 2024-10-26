import React, { useContext, useEffect } from "react";
import taskContext from "../context/taskContext";

const EditTask = (props) => {
  const context = useContext(taskContext);
  const { deleteTask, getTasks } = context;

  const { task, updateTask } = props;

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, []);

  // Guard against undefined or null task
  if (!task) {
    return <div>No task found</div>;
  }

  // Ensure description is defined, if not, set it to an empty string
  const description = task.description || "";

  // Split the description into paragraphs based on line breaks
  const paragraphs = description.split(/\r?\n/);
  return (
    <div className="container col-md-5">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center ">
            <h5 className="card-title">{task.title}</h5>
            <i
              className="fa-solid fa-trash mx-3"
              onClick={() => {
                deleteTask(task._id);
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-3"
              onClick={() => {
                updateTask(task);
              }}
            ></i>
          </div>

          {/* Map over the paragraphs array and create a <p> element for each */}
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="card-text text-wrap">
              {paragraph}
            </p>
          ))}

          <button>Contact Us</button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
