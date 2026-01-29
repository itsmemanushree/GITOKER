require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sample products database
const products = [
  {
    id: 1,
    name: 'Hydrating Face Cream',
    description: 'Rich moisturizer for all skin types',
    price: 2499,
    letter: 'H'
  },
  {
    id: 2,
    name: 'Vitamin C Serum',
    description: 'Brightening serum with vitamin C',
    price: 3319,
    letter: 'V'
  },
  {
    id: 3,
    name: 'Exfoliating Scrub',
    description: 'Gentle exfoliant for smooth skin',
    price: 2075,
    letter: 'E'
  },
  {
    id: 4,
    name: 'Night Recovery Mask',
    description: 'Deep nourishing treatment mask',
    price: 2905,
    letter: 'N'
  },
  {
    id: 5,
    name: 'Sunscreen SPF 50',
    description: 'UV protection for daily use',
    price: 2739,
    letter: 'S'
  },
  {
    id: 6,
    name: 'Eye Contour Gel',
    description: 'Anti-aging for delicate eye area',
    price: 3735,
    letter: 'E'
  }
];

// Routes

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// POST - Add to cart (placeholder)
app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body;
  
  if (!productId || !quantity) {
    return res.status(400).json({ message: 'Product ID and quantity required' });
  }

  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json({
    message: 'Item added to cart',
    item: {
      ...product,
      quantity
    }
  });
});

// POST - Contact form
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields required' });
  }

  // Here you would typically save to database or send email
  console.log('Contact form received:', { name, email, message });

  res.json({
    message: 'Thank you for contacting us! We will get back to you soon.'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✨ SkinGlow API running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation:`);
  console.log(`   GET  /api/products       - Get all products`);
  console.log(`   GET  /api/products/:id   - Get single product`);
  console.log(`   POST /api/cart           - Add to cart`);
  console.log(`   POST /api/contact        - Submit contact form`);
  console.log(`   GET  /api/health         - Health check`);
});
