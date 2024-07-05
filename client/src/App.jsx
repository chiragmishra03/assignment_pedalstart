import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tasks from "./Tasks";
import UpdateTask from "./UpdateTask";
import CreateTask from "./CreateTask";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/create" element={<CreateTask />} />
        <Route path="/update/:id" element={<UpdateTask />} />
      </Routes>
    </Router>
  );
}

export default App;
