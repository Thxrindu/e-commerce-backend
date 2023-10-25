const itemsPerPage = 5;

const paginatedResults = (model) => {
  return (req, res, next) => {
    const page = parseInt(req.query.page) || 1;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;

    const paginatedItems = model.slice(startIndex, endIndex);

    const results = {
      currentPage: page,
      totalPages: Math.ceil(model.length / itemsPerPage),
      paginatedItems: paginatedItems,
    };

    if (endIndex < model.length) {
      results.nextPage = page + 1;
    }

    if (startIndex > 0) {
      results.previousPage = page - 1;
    }

    res.paginatedResults = results;
    next();
  };
};

module.exports = paginatedResults;
