const express = require ('express');
const router = express.Router ();
const {check, validationResult} = require ('express-validator');
const auth = require ('../../middleware/auth');

const Product = require ('../../models/Product');
const User = require ('../../models/User');

// @route    Prost api/products
// @desc     Create a Product
// @access   Private
router.Product (
  '/',
  [auth, [check ('text', 'Text is required').not ().isEmpty ()]],
  async (req, res) => {
    const errors = validationResult (req);
    if (!errors.isEmpty ()) {
      return res.status (400).json ({errors: errors.array ()});
    }

    try {
      const user = await User.findById (req.user.id).select ('-password');

      const newProduct = new Product ({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const Product = await newProduct.save ();

      res.json (Product);
    } catch (err) {
      console.error (err.message);
      res.status (500).send ('Server Error');
    }
  }
);

// @route    GET api/products
// @desc     Get all products
// @access   Private
router.get ('/', auth, async (req, res) => {
  try {
    const products = await Product.find ().sort ({date: -1});
    res.json (products);
  } catch (err) {
    console.error (err.message);
    res.status (500).send ('Server Error');
  }
});

// @route    GET api/products/:id
// @desc     Get Product by ID
// @access   Private
router.get ('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById (req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match (/^[0-9a-fA-F]{24}$/) || !product) {
      return res.status (404).json ({msg: 'Post not found'});
    }

    res.json (post);
  } catch (err) {
    console.error (err.message);

    res.status (500).send ('Server Error');
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a Product
// @access   Private
router.delete ('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById (req.params.id);

    // Check for ObjectId format and Product
    if (!req.params.id.match (/^[0-9a-fA-F]{24}$/) || !product) {
      return res.status (404).json ({msg: 'Product not found'});
    }

    // Check user
    if (product.user.toString () !== req.user.id) {
      return res.status (401).json ({msg: 'User not authorized'});
    }

    await post.remove ();

    res.json ({msg: 'Product removed'});
  } catch (err) {
    console.error (err.message);

    res.status (500).send ('Server Error');
  }
});

module.exports = router;
