import { Request, Response, NextFunction } from "express";
import { Company } from "../models";

export async function getCompanies(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const companies = await Company.findAllCompanies();
    res.json(companies);
  } catch (error) {
    next(error);
  }
}

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

export async function createCompany(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const company = await Company.createCompany(req.body);
    res.status(201).json(company);
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
    const company = await Company.updateCompany(id, req.body);
    if (!company) {
      res.status(404).json({ error: "Company not found" });
      return;
    }
    res.json({ message: "Company updated successfully", company });
  } catch (error) {
    next(error);
  }
}

export async function deleteCompany(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const deleted = await Company.deleteCompany(id);
    if (!deleted) {
      res.status(404).json({ error: "Company not found" });
      return;
    }
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    next(error);
  }
}
