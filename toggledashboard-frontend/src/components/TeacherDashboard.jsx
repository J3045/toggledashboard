import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const TeacherDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-8"
    >
      <h1 className="text-3xl font-bold text-white mb-6">Teacher Dashboard</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Assign a New Task</h2>
        <form onSubmit={addTask} className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Task Title</label>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-purple-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Task Description</label>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-purple-400"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:bg-purple-700 transition duration-300"
          >
            Assign Task
          </button>
        </form>
        <h2 className="text-2xl font-semibold mb-4">Tasks List</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-600">No tasks available.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map(task => (
              <li key={task._id} className="p-4 border bg-yellow-100 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-medium">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                  <p className={`text-sm font-semibold ${task.completed ? 'text-green-500' : 'text-yellow-500'}`}>
                    Status: {task.completed ? 'Completed' : 'Pending'}
                  </p>
                </div>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="ml-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default TeacherDashboard;
