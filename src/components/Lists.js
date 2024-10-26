import React, { useEffect, useContext } from "react";
import EditTask from "./EditTask";
import { useNavigate } from "react-router-dom";
import AddTasks from "./AddTask";
import taskContext from "../context/taskContext";

export default function Lists() {
  let navigate = useNavigate();
  const context = useContext(taskContext);
  console.log(context);
  const { tasks, getTasks } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTasks();
    } else {
      navigate("/");
    }

    // eslint-disable-next-line
  }, [getTasks, navigate]);
  return (
    <div>
      <div className="container my-3">
        <h2 className="text-center">Available Packages</h2>

        {tasks.map((task) => {
          return <EditTask key={task._id} task={task} />;
        })}
      </div>

      <AddTasks />
    </div>
  );
}
