import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../utils/validateEnv';
export interface RequestWithUser extends Request {
  user?: JwtPayload & { id: string };
}

export const requiresAuth = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader) {
    return res.status(401).send({ message: 'No token provided.' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).send({ message: 'Token error.' });
  }
  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ message: 'Token malformatted.' });
  }

  jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Invalid token.' });
    } else {
      req.user = decoded as JwtPayload & { id: string };
      next();
    }
  });
};

// export const refreshToken = (req: Request, res: Response) => {
//   const refreshToken = req.headers['x-refresh-token'];
//   if (!refreshToken) {
//     return res.status(401).send({ message: 'No token provided.' });
//   }
//   jwt.verify(
//     refreshToken as string,
//     env.JWT_REFRESH_TOKEN_SECRET,
//     (err, decoded) => {
//       if (err) {
//         return res.status(401).send({ message: 'Invalid token.' });
//       } else {
//         const newAccessToken = jwt.sign({ id: decoded.id },env.JWT_SECRET,{
          
//         })
//       }
//     },
//   );
// };
