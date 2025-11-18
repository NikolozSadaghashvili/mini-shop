import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res
        .status(400)
        .json({ success: false, message: "Products not found" });
    }

    res.status(200).json({
      success: true,
      message: "Get all prooducts successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error from all products",
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const singleProduct = await Product.findById(id);
    if (!singleProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({
      success: true,
      data: singleProduct,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error from single Product",
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, price, image, description } = req.body;
    if (!title || !price) {
      return res
        .status(401)
        .json({ success: false, message: "please fill title or price" });
    }

    const newProduct = await Product.create({
      title,
      price,
      image,
      description,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Create product successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error from create product",
      error: error.message,
    });
  }
};

export const getMyProducts = async (req, res) => {
  try {
    const userId = req.user._id;
    const findMyProducts = await Product.find({ createdBy: userId });

    res.status(200).json({ success: true, data: findMyProducts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error from get my products",
      error: error.message,
    });
  }
};
