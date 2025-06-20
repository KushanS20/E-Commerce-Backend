const { Product, Seller, Rating } = require('../Models');
const { Op } = require("sequelize")
const path = require('path');
const { uploadFile } = require('../Config/aws');



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

  res.status(200).json({
    count: enriched.length,
    data : {
      enriched
    }
  });
};

// exports.createProduct = async (req, res) => {
//   const {
//     productName,
//     category,
//     description,
//     price,
//     discount_available,
//     discount_percentage,
//     primary_image_url,
//     images_url,
//     tags,
//     sellerId
//   } = req.body;

//   const product = await Product.create({
//     productName,
//     category,
//     description,
//     price,
//     discount_available,
//     discount_percentage,
//     primary_image_url,
//     images_url,
//     tags,
//     sellerID: sellerId
//   });

//   res.status(201).json({ message: "Product created", product });
// };


exports.searchProducts = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ error: 'Keyword query parameter is required' });
    }

    const matchedProducts = await Product.findAll({
      where: {
        [Op.or]: [
          { productName: { [Op.like]: `%${keyword}%` } },
          { description: { [Op.like]: `%${keyword}%` } },
          { tags: { [Op.like]: `%${keyword}%` } },
          {category: { [Op.like]: `%${keyword}%` }},
        ]
      }
    });

    if(matchedProducts.length === 0){
      return res.status(200).json({ matchedProducts: [], suggestedProducts: [] });
    }

    const allTags = new Set();
    const sellerIDs = new Set();
    const matchedProductIds = matchedProducts.map(p => p.id);

    matchedProducts.forEach(product => {
      sellerIDs.add(product.sellerID);
      if (typeof product.tags === 'string') {
        product.tags.split(',').forEach(tag => allTags.add(tag.trim()));
      }
    });

    const tagsArray = Array.from(allTags);
    const sellersArray = Array.from(sellerIDs);

    const suggestedProducts = await Product.findAll({
      where: {
        id: { [Op.notIn]: matchedProductIds },
        [Op.or]: [
          { sellerID: { [Op.in]: sellersArray } },
          ...tagsArray.map(tag => ({ tags: { [Op.like]: `%${tag}%` } }))
        ]
      },
      limit: 10,
    });

    res.status(200).json({ 
      matchedProductsCount : matchedProducts.length,
      suggestedProductsCount: suggestedProducts.length,
      matchedProducts, 
      suggestedProducts 
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.createProduct = async (req, res) => {
  console.log('Body', req.body)
  try {
    const {
      productName,
      category,
      description,
      price,
      discount_available,
      discount_percentage,
      tags,
      sellerId,
    } = req.body;

    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "Images are required" });
    }

    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `products/${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        return await uploadFile({
          fileBuffer: file.buffer,
          fileName: uniqueName,
          mimetype: file.mimetype,
        });
      })
    );

    const primaryImage = uploadedUrls[0];
    const otherImages = uploadedUrls.slice(1);

    const product = await Product.create({
      productName,
      category,
      description,
      price,
      discount_available,
      discount_percentage,
      primary_image_url: primaryImage,
      images_url: otherImages,
      tags: tags ? JSON.parse(tags) : null,
      sellerID: sellerId,
    });



    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product" });
  }
};