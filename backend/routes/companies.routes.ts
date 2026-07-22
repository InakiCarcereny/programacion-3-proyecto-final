import { Router, IRouter } from "express";

import {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/companies.controller";

// import {
//   validateCreateCompany,
//   validateUpdateCompany,
// } from "../middlewares/companies.middleware";

const router: IRouter = Router();

router.get("/", getCompanies);
router.get("/:id", getCompanyById);
router.post("/", /*validateCreateCompany,*/ createCompany);
router.put("/:id", /*validateUpdateCompany,*/ updateCompany);
router.delete("/:id", deleteCompany);

export default router;
