import { Request, Response } from "express";

// POST /analytics
export const logout = (req: Request, res: Response)  => {
  res.status(200).json({ message: "Logged out successfully. Please delete the token on the client." });
}