import { useState } from "react";
import TaskContext from "./taskContext";

const TaskProvider = (props) => {
  const host = "http://localhost:5000/api/task";
  const [tasks, setTasks] = useState([]);

  //Fetch all list
  const getTasks = async () => {
    const response = await fetch(`${host}/fetch`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    setTasks(json);
  };

  //Add a task
  const addTask = async (title, description) => {
    const response = await fetch(`${host}/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    const json = await response.json();
    console.log(json);

    const task = {
      _id: json._id,
      title: json.title,
      description: json.description,
      _v: json.__v,
    };

    setTasks(tasks.concat(task));
  };

  //delete a task
  const deleteTask = async (id) => {
    const response = await fetch(`${host}/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    console.log(json);

    console.log("Deleting the task with id " + id);
    const newTask = tasks.filter((task) => {
      return task._id !== id;
    });
    setTasks(newTask);
  };

  //edit a task
  const updateTask = async (id, title, description) => {
    const response = await fetch(`${host}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    const json = await response.json();
    console.log(json);

    let newTask = JSON.parse(JSON.stringify(tasks));

    //logic to edit

    for (let i = 0; i < tasks.length; i++) {
      const e = tasks[i];
      if (e._id === id) {
        newTask[i].title = title;
        newTask[i].description = description;
        break;
      }
    }

    setTasks(newTask);
  };
  return (
    <TaskContext.Provider
      value={{ tasks, getTasks, addTask, deleteTask, updateTask }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
