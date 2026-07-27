import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "secret";

export interface JwtPayload {
  userId: number;
  companyId: number;
  profileId: number;
}

export function generateToken(payload: JwtPayload): string {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN ?? "7d") as SignOptions["expiresIn"],
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
