export const successResponse = (data, meta = null) => {
  const response = { ok: true, data };
  if (meta) response.meta = meta;
  return response;
};

export const errorResponse = (message, code = 'ERROR', statusCode = 500) => {
  return {
    ok: false,
    error: {
      message,
      code,
      statusCode
    }
  };
};
