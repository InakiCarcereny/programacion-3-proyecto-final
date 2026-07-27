import Category from "./category.model";
import Product from "./product.model";
import Movement from "./movements.model";
import Company from "./company.model";
import User from "./user.model";
import Profile from "./profile.model";
import UserDetails from "./user-details.model";
import sequelize from "../lib/db/db.config";

Category.hasMany(Product, {
  foreignKey: "categoryId",
  as: "products",
});

Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

Product.hasMany(Movement, {
  foreignKey: "productId",
  as: "movements",
});

Movement.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

Company.hasMany(User, { foreignKey: "companyId", as: "users" });
User.belongsTo(Company, { foreignKey: "companyId", as: "company" });

Profile.hasMany(User, { foreignKey: "profileId", as: "users" });
User.belongsTo(Profile, { foreignKey: "profileId", as: "profile" });

User.hasOne(UserDetails, { foreignKey: "userId", as: "details" });
UserDetails.belongsTo(User, { foreignKey: "userId", as: "user" });

Company.hasMany(Product, { foreignKey: "companyId", as: "products" });
Product.belongsTo(Company, { foreignKey: "companyId", as: "company" });

Company.hasMany(Category, { foreignKey: "companyId", as: "categories" });
Category.belongsTo(Company, { foreignKey: "companyId", as: "company" });

export const initDatabaseTriggers = async (): Promise<void> => {
  try {
    await sequelize.query(`
      CREATE OR REPLACE FUNCTION actualizar_stock_producto()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW.type = 'ingreso' THEN
          UPDATE products SET stock = stock + NEW.quantity WHERE id = NEW.product_id;
        ELSIF NEW.type = 'egreso' THEN
          UPDATE products SET stock = stock - NEW.quantity WHERE id = NEW.product_id;
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);
    await sequelize.query(
      `DROP TRIGGER IF EXISTS trigger_actualizar_stock ON movements;`,
    );
    await sequelize.query(`
      CREATE TRIGGER trigger_actualizar_stock
      AFTER INSERT ON movements
      FOR EACH ROW
      EXECUTE FUNCTION actualizar_stock_producto();
    `);
    await sequelize.query(
      `DROP TRIGGER IF EXISTS trigger_log_movimientos ON products;`,
    );
    console.log("Database triggers initialized successfully.");
  } catch (error) {
    console.error("Error initializing database triggers:", error);
  }
};

export { Category, Product, Movement, Company, User, Profile, UserDetails };
