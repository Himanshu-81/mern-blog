const asyncHandler = (requserHandler) => {
  return (req, res, next) => {
    Promise.resolve(requserHandler(req, res, next)).catch((error) => {
      next(error);
    });
  };
};

export { asyncHandler };
