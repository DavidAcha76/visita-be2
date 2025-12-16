const notFound = (req, res) => {
  res.status(404).json({
    ok: false,
    error: {
      message: 'Ruta no encontrada',
      code: 'NOT_FOUND',
      path: req.path,
      method: req.method
    }
  });
};

export default notFound;
