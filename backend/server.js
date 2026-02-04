require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// SQLite Connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
  logging: false // Set to console.log to see SQL queries
});

// Product Model
const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.INTEGER
  },
  letter: {
    type: DataTypes.STRING
  }
});

// Contact Model - Store contact form submissions
const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'new' // new, read, replied
  }
}, {
  timestamps: true // createdAt, updatedAt
});

// CartItem Model - Store shopping cart items
const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  letter: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true
});

// Seed Data
const seedProducts = [
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
    price: 3339,
    letter: 'V'
  },
  {
    id: 3,
    name: 'Exfoliating Scrub',
    description: 'Gentle exfoliant for smooth skin',
    price: 2099,
    letter: 'E'
  },
  {
    id: 4,
    name: 'Night Recovery Mask',
    description: 'Deep nourishing treatment mask',
    price: 2955,
    letter: 'N'
  },
  {
    id: 5,
    name: 'Sunscreen SPF 50',
    description: 'UV protection for daily use',
    price: 2799,
    letter: 'S'
  },
  {
    id: 6,
    name: 'Eye Contour Gel',
    description: 'Anti-aging for delicate eye area',
    price: 3799,
    letter: 'E'
  }
];

const seedDB = async () => {
  try {
    await sequelize.sync(); // Create tables if they don't exist
    const count = await Product.count();
    if (count === 0) {
      await Product.bulkCreate(seedProducts);
      console.log('Database seeded with initial products');
    }
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
};

// Initialize DB and Seed
seedDB();

// Routes

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - Add to cart (placeholder)
app.post('/api/cart', async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: 'Product ID and quantity required' });
  }

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const [cartItem, created] = await CartItem.findOrCreate({
      where: { productId: productId },
      defaults: {
        productId,
        productName: product.name,
        price: product.price,
        letter: product.letter,
        quantity
      }
    });

    if (!created) {
      cartItem.quantity += quantity;
      await cartItem.save();
    }

    res.json({
      message: 'Item added to cart',
      item: cartItem
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Retrieve all cart items
app.get('/api/cart', async (req, res) => {
  try {
    const cartItems = await CartItem.findAll();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE - Remove item from cart
app.delete('/api/cart/:id', async (req, res) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    await cartItem.destroy();
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Update cart item quantity
app.put('/api/cart/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await CartItem.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    cartItem.quantity = quantity;
    await cartItem.save();
    res.json({ message: 'Cart item updated', item: cartItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - Contact form (saves to database)
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields required' });
  }

  try {
    const contact = await Contact.create({
      name,
      email,
      message,
      status: 'new'
    });

    console.log('Contact form saved:', { name, email, message });

    res.json({
      message: 'Thank you for contacting us! We will get back to you soon.',
      contactId: contact.id
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Retrieve all contact submissions
app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Retrieve single contact
app.get('/api/contact/:id', async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Update contact status
app.put('/api/contact/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    contact.status = status;
    await contact.save();
    res.json({ message: 'Contact updated', contact });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE - Remove contact
app.delete('/api/contact/:id', async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    await contact.destroy();
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: 'Server is running', dbState: 'Connected' });
  } catch (error) {
    res.status(500).json({ status: 'Server Error', dbState: 'Disconnected', error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Configure Port
const PORT = process.env.PORT || 5000;

// Export app for testing, start server if not testing
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`SkinGlow API running on http://localhost:${PORT}`);
    console.log(`Connected to SQLite Database`);
  });
}

module.exports = { app, sequelize }; // Export sequelize for closing connection in tests
