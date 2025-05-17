import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error("❌ Internal error:", err);

    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        code: err.code || "INTERNAL_ERROR"
    });
}