import { Router, IRouter } from "express";

import {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/company.controller";

// import {
//   validateCreateCompany,
//   validateUpdateCompany,
// } from "../middlewares/companies.middleware";

import upload from "../middlewares/upload.middleware";

const router: IRouter = Router();

router.get("/", getCompanies);
router.get("/:id", getCompanyById);
router.post(
  "/",
  upload.single("logo"),
  /*validateCreateCompany,*/ createCompany,
);
router.put(
  "/:id",
  upload.single("logo"),
  /*validateUpdateCompany,*/
  updateCompany,
);
router.delete("/:id", deleteCompany);

export default router;
