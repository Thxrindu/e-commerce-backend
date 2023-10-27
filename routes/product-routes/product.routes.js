const router = require('express').Router();
const paginatedResults = require('../../middlewares/pagination');
const db = require('../../models/index');
const Product = require('../../models/Product')(db.sequelize);
const authenticateToken = require('../../middlewares/authentication');

router
  .route('/items')
  .get(authenticateToken, paginatedResults(Product), (req, res) => {
    res.json(res.paginatedResults);
  });

router.route('/item/:id').get(async (req, res) => {
  const itemId = parseInt(req.params.id);

  try {
    const foundItem = await Product.findByPk(itemId);

    if (foundItem) {
      res.json(foundItem);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
