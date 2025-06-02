import React from 'react';
import { useRouteError } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 text-neutral-800 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="text-6xl font-bold text-primary-600 mb-4" variants={itemVariants}>
        Oops!
      </motion.h1>
      <motion.p className="text-xl text-neutral-700 mb-8" variants={itemVariants}>
        Sorry, an unexpected error has occurred.
      </motion.p>
      <motion.p className="text-lg text-neutral-600 mb-8 text-center max-w-md" variants={itemVariants}>
        {error.statusText || error.message}
      </motion.p>
      <motion.button
        className="btn-primary px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        onClick={() => window.location.href = '/'}
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Go to Home
      </motion.button>
    </motion.div>
  );
};

export default ErrorPage;