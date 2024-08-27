// types/express.d.ts

import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: string | JwtPayload; // Adjust the type based on what you store in the user object
  }
}
