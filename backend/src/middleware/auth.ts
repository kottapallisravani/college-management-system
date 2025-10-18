import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/User";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "secret";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: "Missing authorization" });

    const parts = auth.split(" ");
    if (parts.length !== 2) return res.status(401).json({ error: "Invalid authorization" });

    const token = parts[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        const user = await User.findById(decoded.id).select("_id email role");
        if (!user) return res.status(401).json({ error: "Invalid token" });
        req.user = { id: user._id, email: user.email, role: user.role };
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

export const requireRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) return res.status(401).json({ error: "Missing user" });
        if (req.user.role !== role) return res.status(403).json({ error: "Forbidden" });
        next();
    };
};
