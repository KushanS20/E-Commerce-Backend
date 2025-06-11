const { Product, Seller, Rating } = require('../Models');
const { Op } = require("sequelize")


exports.getAllProducts = async (req, res) => {
  const products = await Product.findAll({
    include: [
      { model: Seller, attributes: ['name', 'shopName'] },
      { model: Rating },
    ]
  });

  const enriched = products.map(p => {
    const ratings = p.Ratings || [];
    const avgRating = ratings.length ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length : 0;
    return {
      ...p.toJSON(),
      averageRating: avgRating.toFixed(1),
      totalReviews: ratings.length,
    };
  });

  res.status(200).json(enriched);
};

exports.createProduct = async (req, res) => {
  const {
    productName,
    category,
    description,
    price,
    discount_available,
    discount_percentage,
    primary_image_url,
    images_url,
    tags,
    sellerId
  } = req.body;

  const product = await Product.create({
    productName,
    category,
    description,
    price,
    discount_available,
    discount_percentage,
    primary_image_url,
    images_url,
    tags,
    sellerID: sellerId
  });

  res.status(201).json({ message: "Product created", product });
};


exports.searchProducts = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ error: 'Keyword query parameter is required' });
    }

    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { productName: { [Op.like]: `%${keyword}%` } },
          { description: { [Op.like]: `%${keyword}%` } },
          { tags: { [Op.like]: `%${keyword}%` } },
          {category: { [Op.like]: `%${keyword}%` }},
        ]
      }
    });

    res.status(200).json({
      count : products.length,
      data : {
        products
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};