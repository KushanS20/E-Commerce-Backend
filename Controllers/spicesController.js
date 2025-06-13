const { Product, Rating, Seller } = require('../Models');

const getSpicesProducts = async (req, res) => {
  try {
    const herbals = await Product.findAll({
      where: { category: 'Spices' },
      include: [
        {
          model: Rating,
          attributes: ['rating', 'review', 'userId', 'createdAt'],
        },
        {
          model: Seller,
          attributes: ['id', 'name', 'shopName'],
        },
      ],
    });

    const enrichedData = herbals.map((product) => {
      const ratings = product.Ratings || [];
      const totalReviews = ratings.length;
      const averageRating =
        totalReviews > 0
          ? ratings.reduce((sum, r) => sum + parseFloat(r.rating), 0) / totalReviews
          : 0;

      return {
        id: product.id,
        productName: product.productName,
        description: product.description,
        price: product.price,
        discount_available: product.discount_available,
        discount_percentage: product.discount_percentage,
        primary_image_url: product.primary_image_url,
        images_url: product.images_url,
        tags: product.tags,
        seller: product.Seller,
        Ratings: ratings,
        totalReviews,
        averageRating,
      };
    });
    return res.status(200).json({ 
        count: enrichedData.length,
        success: true, 
        data: { 
            enriched: enrichedData 
        } 
    });
  } catch (error) {
    console.error("Error fetching handcraft products:", error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  getSpicesProducts,
};
