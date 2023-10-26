const express = require('express');
// const db = require('./config/sequelize');
const db = require('./models/index');

const app = express();

const PORT = process.env.PORT || 5050;

app.use(express.json());

const productRouter = require('./routes/product-routes/product.routes');

// Sync Sequelize models with the database
// db.sync()
//   .then(() => {
//     console.log('Database synced');
//   })
//   .catch((error) => {
//     console.error('Error syncing database:', error);
//   });

app.use('/recommend', productRouter);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const startServer = async () => {
  try {
    // Sync Sequelize models with the database
    await db.sequelize.sync();
    console.log('Database synced');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

startServer();
