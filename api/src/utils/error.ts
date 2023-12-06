interface CustomError extends Error {
  statusCode: number;
}
export const errorHandler = (statusCode: number, message: string) => {
  const error = new Error() as CustomError;
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
