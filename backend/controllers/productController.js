import Product from '../models/Product.js';

// Create Product (Admin Only)
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.error("Create Product Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Update Product by ID (Admin Only)
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Update Product Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Delete Product by ID (Admin Only)
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error("Delete Product Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Get All Products (Public)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error("Get Products Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};
