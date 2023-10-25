const router = require('express').Router();
const paginatedResults = require('../../middlewares/pagination');

const products = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
  { id: 3, name: 'Product 3' },
  { id: 4, name: 'Product 4' },
  { id: 5, name: 'Product 5' },
  { id: 6, name: 'Product 6' },
  { id: 7, name: 'Product 7' },
  { id: 8, name: 'Product 8' },
  { id: 9, name: 'Product 9' },
  { id: 10, name: 'Product 10' },
  { id: 11, name: 'Product 11' },
];

router.route('/items').get(paginatedResults(products), (req, res) => {
  res.json(res.paginatedResults);
});

router.route('/item/:id').get((req, res) => {
  const itemId = parseInt(req.params.id);

  const foundItem = products.find((item) => item.id === itemId);

  if (foundItem) {
    res.json(foundItem);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

module.exports = router;
