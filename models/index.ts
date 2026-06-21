import Category from "./category.model";
import Product from "./product.model";
import Movement from "./movements.model";
import sequelize from "../db.config";

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

//trigger para actualizar el stock del producto después de cada movimiento
export const initDatabaseTriggers = async (): Promise<void> => {
  try {
    await sequelize.query(`
      CREATE OR REPLACE FUNCTION actualizar_stock_producto()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW.type = 'ingreso' THEN
          UPDATE products 
          SET stock = stock + NEW.quantity 
          WHERE id = NEW.product_id;
        
        ELSIF NEW.type = 'egreso' THEN
          UPDATE products 
          SET stock = stock - NEW.quantity 
          WHERE id = NEW.product_id;
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

    console.log("El trigger fue creado con éxito.");
  } catch (error) {
    console.error("Error al inicializar el trigger:", error);
  }
};

export { Category, Product, Movement };
