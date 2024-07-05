import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UpdateTask() {
  const { id } = useParams();
  const [task, setTask] = useState({
    name: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await fetch(`http://localhost:5000/api/tasks/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch task");
        }
        const data = await response.json();
        setTask({
          name: data.name,
          description: data.description,
          dueDate: data.dueDate.substring(0, 10),
        });
      } catch (error) {
        console.error("Error fetching task:", error);
        // Handle error state if necessary
      }
    }

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: task.name,
          description: task.description,
          dueDate: task.dueDate,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      console.log("Task updated successfully");
      window.location.href = "/";
      // Optionally redirect to tasks list or handle success state
    } catch (error) {
      console.error("Error updating task:", error);
      // Handle error state if necessary
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Update Task</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name of Task
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={task.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={task.description}
                onChange={handleChange}
                rows="3"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="dueDate" className="form-label">
                Due Date
              </label>
              <input
                type="date"
                className="form-control"
                id="dueDate"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateTask;
