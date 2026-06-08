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

//trigger para actualizar el
export const initDatabaseTriggers = async (): Promise<void> => {
  try {
    await sequelize.query(`
      CREATE OR REPLACE FUNCTION log_movimiento_stock()
      RETURNS TRIGGER AS $$
      DECLARE
        diferencia INTEGER;
        tipo_movimiento VARCHAR;
        cantidad_movimiento INTEGER;
      BEGIN
        IF NEW.stock <> OLD.stock THEN
          diferencia := NEW.stock - OLD.stock;
          
          IF diferencia > 0 THEN
            tipo_movimiento := 'ingreso';
            cantidad_movimiento := diferencia;
          ELSE
            tipo_movimiento := 'egreso';
            cantidad_movimiento := diferencia * -1; -- Lo multiplicamos por -1 para guardarlo en positivo
          END IF;

          
          INSERT INTO movements (product_id, quantity, type, description, created_at)
          VALUES (
            NEW.id, 
            cantidad_movimiento, 
            tipo_movimiento::enum_movements_type, 
            'Cambio de stock en  un producto', 
            NOW()
          );
        END IF;
        
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await sequelize.query(
      `DROP TRIGGER IF EXISTS trigger_actualizar_stock ON movements;`,
    );

    await sequelize.query(
      `DROP TRIGGER IF EXISTS trigger_log_movimientos ON products;`,
    );

    await sequelize.query(`
      CREATE TRIGGER trigger_log_movimientos
      AFTER UPDATE ON products
      FOR EACH ROW
      EXECUTE FUNCTION log_movimiento_stock();
    `);

    console.log("El trigger fue creado con exito.");
  } catch (error) {
    console.error("Error al inicializar el trigger:", error);
  }
};

export { Category, Product, Movement };
