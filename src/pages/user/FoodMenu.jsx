import { useState } from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';

const FoodMenu = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const [menuItems] = useState([
    {
      id: 1,
      name: 'Grilled Chicken Salad',
      description: 'Fresh mixed greens with grilled chicken breast, avocado, cherry tomatoes, and balsamic dressing',
      price: 12.99,
      category: 'Healthy',
      image: 'https://hips.hearstapps.com/hmg-prod/images/grilled-chicken-salad-lead-6628169550105.jpg?resize=640:*',
      dietary: ['high-protein', 'low-carb'],
      rating: 4.5,
      reviews: 28
    },
    {
      id: 2,
      name: 'Vegetarian Buddha Bowl',
      description: 'Quinoa base with roasted vegetables, chickpeas, and tahini dressing',
      price: 10.99,
      category: 'Vegetarian',
      image: 'https://www.crazyvegankitchen.com/wp-content/uploads/2024/06/buddha-bowl-1024x1536.jpg',
      dietary: ['vegan', 'gluten-free'],
      rating: 4.8,
      reviews: 34
    },
    {
      id: 3,
      name: 'Spicy Thai Noodles',
      description: 'Stir-fried noodles with chicken, shrimp, and a fiery peanut sauce',
      price: 14.50,
      category: 'Asian',
      image: 'https://blogger.googleusercontent.com/img/a/AVvXsEh_A6HhH--gsCerBSwCZYNXSkQzorGCAgwHjTNmtmrfZNXni3ZD-SwSVLi82Nup1jUdHHI-v46ni-btRzqtwh_WaZ1ZYFSar0sJ1p0BzgCddPztY3d_ur89HdA1eBA3E5gcJ-r0JoPkcZ5ykVJ1k-t068OXsM8e3T4HFkAb5zAmHtUof9Fz_0cof2JBBQ=s16000-rw',
      dietary: ['spicy'],
      rating: 4.2,
      reviews: 50
    },
    {
      id: 4,
      name: 'Classic Burger',
      description: 'Juicy patty with cheese, lettuce, tomato, and special sauce on a brioche bun',
      price: 11.75,
      category: 'Fast Food',
      image: 'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2560%2Cc_limit/Smashburger-recipe-120219.jpg',
      dietary: [],
      rating: 4.0,
      reviews: 65
    },
    {
      id: 5,
      name: 'Margherita Pizza',
      description: 'Traditional pizza with fresh mozzarella, basil, and tomato sauce',
      price: 9.99,
      category: 'Italian',
      image: 'https://cookieandkate.com/images/2021/07/margherita-pizza-recipe-1-2-1022x1536.jpg',
      dietary: ['vegetarian'],
      rating: 4.7,
      reviews: 80
    },
    {
      id: 6,
      name: 'Salmon with Asparagus',
      description: 'Pan-seared salmon fillet served with roasted asparagus and lemon-dill sauce',
      price: 18.25,
      category: 'Healthy',
      image: 'https://cdn-uploads.mealime.com/uploads/recipe/thumbnail/307/presentation_0ed152c0-47ef-4536-81b4-02dc6f31f876.jpg',
      dietary: ['high-protein', 'low-carb'],
      rating: 4.9,
      reviews: 42
    },
    {
      id: 7,
      name: 'Vegan Lentil Soup',
      description: 'Hearty and nutritious soup made with lentils, vegetables, and aromatic herbs',
      price: 8.50,
      category: 'Vegan',
      image: 'https://www.eatingwell.com/thmb/RYE0WEHf2_AirDbu0PUXeG2IxJo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/vegan-lentil-stew-0b016185b40446ba98409c75dfeaef7f.jpg',
      dietary: ['vegan', 'gluten-free'],
      rating: 4.3,
      reviews: 20
    },
    {
      id: 8,
      name: 'Chicken Tikka Masala',
      description: 'Creamy and flavorful chicken curry served with basmati rice and naan bread',
      price: 15.99,
      category: 'Indian',
      image: 'https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Tikka-Masala-min.jpg',
      dietary: [],
      rating: 4.6,
      reviews: 55
    },
    {
      id: 9,
      name: 'Sushi Platter',
      description: 'Assortment of fresh sushi and sashimi, including tuna, salmon, and California rolls',
      price: 22.00,
      category: 'Japanese',
      image: 'https://theherdsman.com.au/wp-content/uploads/2016/07/60-scaled.jpg',
      dietary: ['gluten-free'],
      rating: 4.8,
      reviews: 70
    },
    {
      id: 10,
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
      price: 7.00,
      category: 'Dessert',
      image: 'https://floursandfrostings.com/wp-content/uploads/2017/01/IMG_20170104_003650_972-1-1024x1024.jpg',
      dietary: ['vegetarian'],
      rating: 4.9,
      reviews: 90
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDietary, setSelectedDietary] = useState([]);

  const categories = ['All', 'Healthy', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Asian', 'Fast Food', 'Italian', 'Indian', 'Japanese', 'Dessert'];
  const dietaryOptions = ['High-Protein', 'Low-Carb', 'Vegan', 'Gluten-Free', 'Spicy'];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category.toLowerCase());
  };

  const handleDietaryToggle = (option) => {
    setSelectedDietary(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleOrder = (itemId) => {
    // TODO: Implement order functionality with Supabase
    console.log('Ordering item:', itemId);
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory;
    const matchesDietary = selectedDietary.length === 0 || selectedDietary.every(diet => item.dietary.includes(diet.toLowerCase().replace('-', '')));
    return matchesSearch && matchesCategory && matchesDietary;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-display font-bold text-gradient">Our Delicious Menu</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              placeholder="Search menu..."
              value={searchTerm}
              onChange={handleSearch}
              className="input-field pl-10 pr-4 py-2 rounded-xl border border-neutral-200 focus:ring-primary-500 focus:border-primary-500 w-full"
            />
          </div>
          <button
            className="btn-secondary flex items-center justify-center px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            onClick={() => document.getElementById('filters').classList.toggle('hidden')}
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div id="filters" className="card hidden bg-white/80 backdrop-blur-sm border border-neutral-100 shadow-soft">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-3">Categories</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.toLowerCase()
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-3">Dietary Preferences</h3>
            <div className="flex flex-wrap gap-3">
              {dietaryOptions.map(option => (
                <button
                  key={option}
                  onClick={() => handleDietaryToggle(option)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedDietary.includes(option)
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item.id} className="card overflow-hidden shadow-soft border border-neutral-100 hover:shadow-card transition-all duration-300 group">
              <div className="relative w-full h-48 overflow-hidden">
                <img src={item.image || 'https://via.placeholder.com/400x250?text=No+Image'} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold text-white drop-shadow-lg">{item.name}</h3>
                  <p className="text-sm text-neutral-200">{item.category}</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-neutral-600 mb-4 line-clamp-3">{item.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary-600">Rs.{item.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-neutral-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-neutral-500">({item.reviews} reviews)</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.dietary.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 rounded-full"
                    >
                      {tag.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  ))}
                </div>
                <button
                    onClick={() => handleAddToCart(item)}
                    className="btn-primary w-full py-2 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                  >
                    <ShoppingCartIcon className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-lg text-neutral-600">No items found matching your criteria.</p>
            <p className="text-sm text-neutral-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodMenu;