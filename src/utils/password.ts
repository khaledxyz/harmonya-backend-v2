import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

// Hash password
const hash = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
};

// Compare password
const compare = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};

const pw = { hash, compare };
export default pw;