// src/components/LandingPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const buttonVariants = {
  initial: { scale: 1, opacity: 0.8 },
  hover: { scale: 1.1, opacity: 1 },
  tap: { scale: 0.95 }
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome to the Dashboard</h1>
        <div className="space-x-4">
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate('/teacher')}
            className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Teacher
          </motion.button>
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate('/student')}
            className="bg-white text-purple-500 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-purple-500 hover:text-white transition duration-300"
          >
            Student
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
