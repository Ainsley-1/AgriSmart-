const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  // Vegetables
  {
    name: 'Fresh Tomatoes',
    description: 'Organic red tomatoes, perfect for salads and cooking',
    price: 150,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1546470427-e26264eca0ea?w=500&h=500&fit=crop',
    stock: 50,
    unit: 'kg',
    rating: 4.5
  },
  {
    name: 'Green Cabbage',
    description: 'Fresh organic cabbage from local farms',
    price: 80,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1594282442554-0524bbbdaf0f?w=500&h=500&fit=crop',
    stock: 30,
    unit: 'kg',
    rating: 4.2
  },
  {
    name: 'Organic Carrots',
    description: 'Crunchy organic carrots rich in beta-carotene',
    price: 90,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&h=500&fit=crop',
    stock: 45,
    unit: 'kg',
    rating: 4.3
  },
  {
    name: 'Fresh Spinach',
    description: 'Leafy green spinach packed with nutrients',
    price: 70,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&h=500&fit=crop',
    stock: 35,
    unit: 'kg',
    rating: 4.4
  },
  {
    name: 'Bell Peppers',
    description: 'Colorful bell peppers, sweet and crunchy',
    price: 180,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&h=500&fit=crop',
    stock: 40,
    unit: 'kg',
    rating: 4.6
  },
  {
    name: 'Fresh Broccoli',
    description: 'Green organic broccoli, nutrient-dense',
    price: 120,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&h=500&fit=crop',
    stock: 25,
    unit: 'kg',
    rating: 4.5
  },

  // Fruits
  {
    name: 'Bananas',
    description: 'Ripe organic bananas, naturally sweet',
    price: 120,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&h=500&fit=crop',
    stock: 100,
    unit: 'dozen',
    rating: 4.8
  },
  {
    name: 'Fresh Oranges',
    description: 'Juicy oranges packed with vitamin C',
    price: 200,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=500&h=500&fit=crop',
    stock: 60,
    unit: 'kg',
    rating: 4.6
  },
  {
    name: 'Red Apples',
    description: 'Crisp and sweet red apples',
    price: 250,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=500&fit=crop',
    stock: 70,
    unit: 'kg',
    rating: 4.9
  },
  {
    name: 'Fresh Strawberries',
    description: 'Sweet and juicy organic strawberries',
    price: 300,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&h=500&fit=crop',
    stock: 25,
    unit: 'kg',
    rating: 4.7
  },
  {
    name: 'Watermelon',
    description: 'Sweet and refreshing watermelon',
    price: 150,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784422?w=500&h=500&fit=crop',
    stock: 50,
    unit: 'piece',
    rating: 4.5
  },
  {
    name: 'Fresh Mangoes',
    description: 'Sweet tropical mangoes',
    price: 280,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop',
    stock: 40,
    unit: 'kg',
    rating: 4.8
  },
  {
    name: 'Pineapple',
    description: 'Fresh tropical pineapple',
    price: 200,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&h=500&fit=crop',
    stock: 35,
    unit: 'piece',
    rating: 4.6
  },

  // Grains
  {
    name: 'Brown Rice',
    description: 'Organic whole grain brown rice',
    price: 180,
    category: 'Grains',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop',
    stock: 200,
    unit: 'kg',
    rating: 4.4
  },
  {
    name: 'Quinoa',
    description: 'Protein-rich organic quinoa',
    price: 350,
    category: 'Grains',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop',
    stock: 80,
    unit: 'kg',
    rating: 4.6
  },
  {
    name: 'Organic Oats',
    description: 'Whole grain rolled oats',
    price: 200,
    category: 'Grains',
    image: 'https://images.unsplash.com/photo-1574635620892-58eb2f37c00c?w=500&h=500&fit=crop',
    stock: 150,
    unit: 'kg',
    rating: 4.5
  },
  {
    name: 'Whole Wheat',
    description: 'Fresh organic wheat grains',
    price: 160,
    category: 'Grains',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&h=500&fit=crop',
    stock: 180,
    unit: 'kg',
    rating: 4.3
  },

  // Dairy
  {
    name: 'Fresh Milk',
    description: 'Farm-fresh organic milk',
    price: 100,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&h=500&fit=crop',
    stock: 40,
    unit: 'liter',
    rating: 4.7
  },
  {
    name: 'Greek Yogurt',
    description: 'Creamy organic Greek yogurt',
    price: 150,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&h=500&fit=crop',
    stock: 30,
    unit: 'kg',
    rating: 4.8
  },
  {
    name: 'Farm Cheese',
    description: 'Artisan organic cheese',
    price: 400,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=500&h=500&fit=crop',
    stock: 20,
    unit: 'kg',
    rating: 4.9
  },
  {
    name: 'Farm Butter',
    description: 'Creamy organic butter',
    price: 350,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&h=500&fit=crop',
    stock: 25,
    unit: 'kg',
    rating: 4.8
  },

  // Organic
  {
    name: 'Organic Honey',
    description: 'Pure raw organic honey',
    price: 500,
    category: 'Organic',
    image: 'https://images.unsplash.com/photo-1587049016823-69ea82d684e7?w=500&h=500&fit=crop',
    stock: 50,
    unit: 'kg',
    rating: 4.9
  },
  {
    name: 'Organic Eggs',
    description: 'Free-range organic eggs',
    price: 250,
    category: 'Organic',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&h=500&fit=crop',
    stock: 100,
    unit: 'dozen',
    rating: 4.7
  },
  {
    name: 'Organic Herbs Mix',
    description: 'Fresh organic herbs bundle',
    price: 150,
    category: 'Organic',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=500&h=500&fit=crop',
    stock: 60,
    unit: 'bundle',
    rating: 4.6
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agrismart');

    console.log('✅ MongoDB Connected...');

    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    const farmerId = new mongoose.Types.ObjectId();

    const productsWithFarmer = sampleProducts.map(product => ({
      ...product,
      farmer: farmerId
    }));

    const insertedProducts = await Product.insertMany(productsWithFarmer);
    console.log(`✅ Added ${insertedProducts.length} products successfully!`);

    const categories = {};
    insertedProducts.forEach(product => {
      categories[product.category] = (categories[product.category] || 0) + 1;
    });

    console.log('\n📦 Products by category:');
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`   - ${category}: ${count} products`);
    });

    console.log('\n✨ Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedProducts();
