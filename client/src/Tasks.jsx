import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Make sure you import Link

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("http://localhost:5000/api/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/deletetask/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete task");
        }
        setTasks(tasks.filter((task) => task._id !== id));
        console.log("Task deleted successfully");
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format date as per locale
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">PEDALSTART ASSIGNMENT</h1>
      <h1 className="text-center mb-4">Solution by Chirag Mishra</h1>
      <div className="card">
        <div className="card-header bg-success text-white">
          <h2 className="mb-0">Task Management</h2>
        </div>
        <div className="card-body">
          <Link to="/create" className="btn btn-success mb-3">
            Add Task
          </Link>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name of Task</th>
                  <th>Description</th>
                  <th>Due Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>{formatDate(task.dueDate)}</td> {/* Format date here */}
                    <td>
                      <Link
                        to={`/update/${task._id}`}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Edit
                      </Link>{" "}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(task._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
