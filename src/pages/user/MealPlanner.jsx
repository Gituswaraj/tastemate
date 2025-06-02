import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MealPlanner = () => {
  const [mealPlan, setMealPlan] = useState({
    days: 7,
    preferences: [],
    dietaryRestrictions: [],
    calorieTarget: 2000,
  });

  const [generatedPlan, setGeneratedPlan] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  // Dummy data for meal suggestions
  const dummyMeals = {
    breakfast: [
      { id: 1, name: 'Avocado Toast with Poached Eggs', calories: 450, image: 'https://via.placeholder.com/100/FFAA33/FFFFFF?text=Breakfast' },
      { id: 2, name: 'Greek Yogurt with Berries and Granola', calories: 320, image: 'https://via.placeholder.com/100/FFAA33/FFFFFF?text=Breakfast' },
      { id: 3, name: 'Spinach and Mushroom Omelette', calories: 380, image: 'https://via.placeholder.com/100/FFAA33/FFFFFF?text=Breakfast' },
    ],
    lunch: [
      { id: 1, name: 'Quinoa Salad with Grilled Chicken', calories: 520, image: 'https://via.placeholder.com/100/33AAFF/FFFFFF?text=Lunch' },
      { id: 2, name: 'Mediterranean Wrap with Hummus', calories: 480, image: 'https://via.placeholder.com/100/33AAFF/FFFFFF?text=Lunch' },
      { id: 3, name: 'Lentil Soup with Whole Grain Bread', calories: 420, image: 'https://via.placeholder.com/100/33AAFF/FFFFFF?text=Lunch' },
    ],
    dinner: [
      { id: 1, name: 'Grilled Salmon with Roasted Vegetables', calories: 580, image: 'https://via.placeholder.com/100/FF33AA/FFFFFF?text=Dinner' },
      { id: 2, name: 'Vegetable Stir-Fry with Tofu', calories: 450, image: 'https://via.placeholder.com/100/FF33AA/FFFFFF?text=Dinner' },
      { id: 3, name: 'Whole Wheat Pasta with Turkey Meatballs', calories: 620, image: 'https://via.placeholder.com/100/FF33AA/FFFFFF?text=Dinner' },
    ],
    snacks: [
      { id: 1, name: 'Apple with Almond Butter', calories: 200, image: 'https://via.placeholder.com/100/AAFF33/000000?text=Snack' },
      { id: 2, name: 'Carrot Sticks with Hummus', calories: 150, image: 'https://via.placeholder.com/100/AAFF33/000000?text=Snack' },
      { id: 3, name: 'Trail Mix with Nuts and Dried Fruit', calories: 250, image: 'https://via.placeholder.com/100/AAFF33/000000?text=Snack' },
    ],
  };

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'dairy-free', label: 'Dairy-Free' },
    { id: 'nut-free', label: 'Nut-Free' },
    { id: 'low-carb', label: 'Low-Carb' },
  ];

  const preferenceOptions = [
    { id: 'high-protein', label: 'High Protein' },
    { id: 'low-calorie', label: 'Low Calorie' },
    { id: 'mediterranean', label: 'Mediterranean' },
    { id: 'asian', label: 'Asian Cuisine' },
    { id: 'italian', label: 'Italian Cuisine' },
    { id: 'mexican', label: 'Mexican Cuisine' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMealPlan({
      ...mealPlan,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;
    if (checked) {
      setMealPlan({
        ...mealPlan,
        [category]: [...mealPlan[category], value],
      });
    } else {
      setMealPlan({
        ...mealPlan,
        [category]: mealPlan[category].filter(item => item !== value),
      });
    }
  };

  const generateMealPlan = () => {
    // In a real app, this would call an API to generate a personalized meal plan
    // For now, we'll create a dummy plan using our sample data
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const plan = days.slice(0, mealPlan.days).map(day => {
      return {
        day,
        meals: {
          breakfast: dummyMeals.breakfast[Math.floor(Math.random() * dummyMeals.breakfast.length)],
          lunch: dummyMeals.lunch[Math.floor(Math.random() * dummyMeals.lunch.length)],
          dinner: dummyMeals.dinner[Math.floor(Math.random() * dummyMeals.dinner.length)],
          snack: dummyMeals.snacks[Math.floor(Math.random() * dummyMeals.snacks.length)],
        },
      };
    });

    setGeneratedPlan(plan);
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className="text-3xl font-bold text-center mb-8 text-teal-600"
        variants={itemVariants}
      >
        Personalized Meal Planner
      </motion.h1>

      {!generatedPlan ? (
        <motion.div 
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
          variants={itemVariants}
        >
          <h2 className="text-xl font-semibold mb-4">Create Your Meal Plan</h2>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">How many days do you want to plan?</label>
            <select
              name="days"
              value={mealPlan.days}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {[1, 2, 3, 4, 5, 6, 7].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'day' : 'days'}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Daily Calorie Target</label>
            <input
              type="range"
              name="calorieTarget"
              min="1200"
              max="3000"
              step="100"
              value={mealPlan.calorieTarget}
              onChange={handleInputChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center mt-2 text-gray-600">{mealPlan.calorieTarget} calories</div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Dietary Restrictions</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {dietaryOptions.map(option => (
                <div key={option.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`dietary-${option.id}`}
                    value={option.id}
                    checked={mealPlan.dietaryRestrictions.includes(option.id)}
                    onChange={(e) => handleCheckboxChange(e, 'dietaryRestrictions')}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`dietary-${option.id}`} className="ml-2 text-sm text-gray-700">{option.label}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Food Preferences</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {preferenceOptions.map(option => (
                <div key={option.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`preference-${option.id}`}
                    value={option.id}
                    checked={mealPlan.preferences.includes(option.id)}
                    onChange={(e) => handleCheckboxChange(e, 'preferences')}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`preference-${option.id}`} className="ml-2 text-sm text-gray-700">{option.label}</label>
                </div>
              ))}
            </div>
          </div>

          <motion.button
            onClick={generateMealPlan}
            className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Generate Meal Plan
          </motion.button>
        </motion.div>
      ) : (
        <motion.div variants={containerVariants}>
          <div className="flex justify-between items-center mb-6">
            <motion.h2 
              className="text-2xl font-bold text-teal-600"
              variants={itemVariants}
            >
              Your {mealPlan.days}-Day Meal Plan
            </motion.h2>
            <motion.button
              onClick={() => setGeneratedPlan(null)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              variants={itemVariants}
            >
              Edit Plan
            </motion.button>
          </div>

          {generatedPlan.map((day, index) => (
            <motion.div 
              key={day.day} 
              className="bg-white rounded-lg shadow-lg p-6 mb-6"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-purple-600">{day.day}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(day.meals).map(([mealType, meal]) => (
                  <div key={mealType} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center mb-2">
                      <img src={meal.image} alt={meal.name} className="w-12 h-12 rounded-full mr-3" />
                      <div>
                        <h4 className="font-medium text-gray-800 capitalize">{mealType}</h4>
                        <p className="text-sm text-gray-500">{meal.calories} calories</p>
                      </div>
                    </div>
                    <p className="text-gray-700">{meal.name}</p>
                    <button className="mt-2 text-sm text-teal-600 hover:text-teal-800 font-medium flex items-center">
                      View Recipe
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.div 
            className="flex justify-center mt-8"
            variants={itemVariants}
          >
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out mr-4">
              Save Meal Plan
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
              Generate Shopping List
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MealPlanner;