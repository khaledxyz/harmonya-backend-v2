import JWT, { SignOptions, JwtPayload, VerifyOptions } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET!;
const defaultExpiresIn = process.env.JWT_EXPIRES_IN || '1h';

if (!jwtSecret) throw new Error('JWT_SECRET is not defined.');

const sign = (
    payload: Record<string, any>,
    expiresIn?: string,
    options?: SignOptions
): string => {
    return JWT.sign(payload, jwtSecret, {
        expiresIn: expiresIn || defaultExpiresIn,
        ...options,
    });
};

const verify = <T extends JwtPayload | string>(
    token: string,
    options?: VerifyOptions
): T => {
    try {
        return JWT.verify(token, jwtSecret, options) as T;
    } catch (error) {
        throw new Error(`Invalid or expired token: ${(error as Error).message}`);
    }
};

const decode = (token: string): JwtPayload | null => {
    const decoded = JWT.decode(token);
    return typeof decoded === 'object' && decoded !== null ? decoded as JwtPayload : null;
};

export const jwt = { sign, verify, decode };
