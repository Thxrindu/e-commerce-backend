const express = require('express');
const app = express();

const PORT = process.env.PORT || 5050;

const productRouter = require('./routes/product-routes/product.routes');

app.use('/recommend', productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
