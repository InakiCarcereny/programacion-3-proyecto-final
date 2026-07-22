import { Request, Response, NextFunction } from "express";
import { Company } from "../models";
import { uploadImage } from "../utils/upload-image";

export async function getCompanyById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const company = await Company.findCompanyById(id);

    if (!company) {
      res.status(404).json({ error: "Company not found" });
      return;
    }

    res.json(company);
  } catch (error) {
    next(error);
  }
}

export async function updateCompany(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);
    let logoUrl: string | undefined;

    if (req.file) {
      logoUrl = await uploadImage(req.file.buffer, "logo");
    }

    const company = await Company.updateCompany(id, {
      ...req.body,
      ...(logoUrl && { logoUrl }),
    });

    if (!company) {
      res.status(404).json({ error: "Company not found" });
      return;
    }

    res.json({ message: "Company updated successfully", company });
  } catch (error) {
    next(error);
  }
}
