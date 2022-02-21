import { Input, Button } from "antd";
import { useState } from "react";

export default function NewTask({ setTasks }) {
  const [newTask, setNewTask] = useState("");

  const handleInputText = (event) => {
    setNewTask(event.target.value);
  };

  console.log(newTask);

  const handleButtonSubmit = () => {
    if (newTask.trim() === "") {
      return;
    }

    const taskObject = {
      task: newTask,
    };
    fetch("https://much-todo-fk.uc.r.appspot.com/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskObject),
    })
      .then(() => {
        setNewTask("");
        fetch("https://much-todo-fk.uc.r.appspot.com/tasks")
          .then((response) => response.json())
          .then((data) => setTasks(data));
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="add-new-task">
      <Input.Group compact style={{ display: "flex" }}>
        <Input
          placeholder="Enter new task"
          value={newTask}
          onChange={(event) => handleInputText(event)}
        />
        <Button
          className="add-task-btn"
          type="default"
          size="large"
          onClick={handleButtonSubmit}
        >
          Add Task
        </Button>
      </Input.Group>
    </div>
  );
}
