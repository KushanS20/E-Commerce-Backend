const db = require("../Config/db");
const { Rating, Product, User } = require('../Models');

exports.getRatingsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const ratings = await Rating.findAll({
      where: { ProductId: productId },
      include: [{ model: User, attributes: ['id', 'username'] }],
    });
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ratings' });
  }
};

exports.createRating = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, review, userId } = req.body;

    const newRating = await Rating.create({
      rating,
      review,
      ProductId: productId,
      UserId: req.user.id,
    });

    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create rating' });
  }
};


exports.deleteRatingsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    await Rating.destroy({ where: { ProductId: productId } });
    res.status(200).json({ message: 'All ratings deleted for the product' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete ratings' });
  }
};

