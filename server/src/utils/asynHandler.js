const asyncHandler = (requserHandler) => {
  (req, res, next) => {
    Promise.resolve(requserHandler(req, res, next)).catch((error) => {
      next(error);
    });
  };
};

export { asyncHandler };
