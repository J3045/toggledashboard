import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

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

  const markAsComplete = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, { completed: true });
      setTasks(tasks.map(task => 
        task._id === taskId ? { ...task, completed: true } : task
      ));
    } catch (error) {
      console.error('Error marking task as complete:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-8"
    >
      <h1 className="flex justify-center text-3xl font-bold text-white mb-6">Student Dashboard</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Assigned Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-600">No tasks assigned yet.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map(task => (
              <li key={task._id} className={`p-4 border ${task.completed ? 'bg-green-100' : 'bg-yellow-100'} rounded-lg flex justify-between items-center`}>
                <div>
                  <h3 className="text-xl font-medium">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                </div>
                <button
                  onClick={() => markAsComplete(task._id)}
                  className={`ml-4 px-4 py-2 rounded-full font-semibold shadow-lg transition duration-300 ${task.completed ? 'bg-green-400 text-white cursor-default' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
                  disabled={task.completed}
                >
                  {task.completed ? 'Completed' : 'Mark as Complete'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <button onClick={() => navigate('/')} className='ml-4 px-4 py-2 rounded-full font-semibold shadow-lg transition duration-300 bg-blue-500 text-white hover:bg-blue-700 mt-5'>
            Go Back
        </button>
      </div>
      </motion.div>
  );
};

export default StudentDashboard;
