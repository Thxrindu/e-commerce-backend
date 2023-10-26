const itemsPerPage = 5;

const paginatedResults = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;

    const offset = (page - 1) * itemsPerPage;
    const limit = itemsPerPage;

    // const paginatedItems = model.slice(startIndex, endIndex);

    // const results = {
    //   currentPage: page,
    //   totalPages: Math.ceil(model.length / itemsPerPage),
    //   paginatedItems: paginatedItems,
    // };

    // if (endIndex < model.length) {
    //   results.nextPage = page + 1;
    // }

    // if (startIndex > 0) {
    //   results.previousPage = page - 1;
    // }

    // res.paginatedResults = results;
    // next();
    try {
      // Count total number of items in the model
      const totalItems = await model.count();

      // Fetch paginated items from the model
      const paginatedItems = await model.findAll({
        offset,
        limit,
      });

      const results = {
        currentPage: page,
        totalPages: Math.ceil(totalItems / itemsPerPage),
        totalItems,
        paginatedItems,
      };

      if (offset + limit < totalItems) {
        results.nextPage = page + 1;
      }

      if (offset > 0) {
        results.previousPage = page - 1;
      }

      res.paginatedResults = results;
      next();
    } catch (error) {
      console.error('Error fetching paginated items:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};

module.exports = paginatedResults;
