export const healthCheck = (req, res) => {
  res.json({
    success: true,
    message: "API is healthy",
  });
};
