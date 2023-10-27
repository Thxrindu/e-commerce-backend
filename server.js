require('dotenv').config();

const express = require('express');
const db = require('./models/index');

const app = express();

const PORT = process.env.PORT || 5050;

app.use(express.json());

const userRouter = require('./routes/user-routes/user.routes');
const productRouter = require('./routes/product-routes/product.routes');

app.use('/auth', userRouter);
app.use('/recommend', productRouter);

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
