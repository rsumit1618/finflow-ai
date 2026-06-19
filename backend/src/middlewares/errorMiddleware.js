export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

export const globalErrorHandler = (err, req, res, next) => {
  console.error(err);

  let statusCode = 500;
  let message = "Internal Server Error";

  if (err.message === "Category not found") {
    statusCode = 404;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};