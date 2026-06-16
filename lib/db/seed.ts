import { Category, Product } from "../../models";

export async function seed(): Promise<void> {
  const categories = await Category.bulkCreate([
    {
      name: "Electrónica",
      description: "Dispositivos electrónicos y accesorios",
    },
    { name: "Indumentaria", description: "Ropa y accesorios de moda" },
    {
      name: "Alimentos y Bebidas",
      description: "Productos alimenticios y bebidas",
    },
    { name: "Herramientas", description: "Herramientas y equipos de trabajo" },
    { name: "Librería", description: "Útiles escolares y de oficina" },
  ]);

  await Product.bulkCreate([
    {
      name: "Auriculares Bluetooth",
      description: "Auriculares inalámbricos con cancelación de ruido",
      price: 15000,
      stock: 25,
      categoryId: categories[0].id,
    },
    {
      name: "Cable USB-C 2m",
      description: "Cable de carga rápida y transferencia de datos",
      price: 2500,
      stock: 100,
      categoryId: categories[0].id,
    },
    {
      name: "Teclado mecánico",
      description: "Teclado mecánico retroiluminado RGB",
      price: 45000,
      stock: 10,
      categoryId: categories[0].id,
    },
    {
      name: "Mouse inalámbrico",
      description: "Mouse ergonómico con receptor USB",
      price: 8000,
      stock: 30,
      categoryId: categories[0].id,
    },

    {
      name: "Remera básica blanca",
      description: "Remera de algodón talle M",
      price: 6500,
      stock: 50,
      categoryId: categories[1].id,
    },
    {
      name: "Zapatillas urbanas",
      description: "Zapatillas deportivas talle 42",
      price: 48000,
      stock: 15,
      categoryId: categories[1].id,
    },
    {
      name: "Buzo con capucha",
      description: "Buzo de algodón frizado talle L",
      price: 18000,
      stock: 20,
      categoryId: categories[1].id,
    },

    {
      name: "Yerba mate 1kg",
      description: "Yerba mate elaborada con palo",
      price: 3500,
      stock: 80,
      categoryId: categories[2].id,
    },
    {
      name: "Café molido 500g",
      description: "Café de origen único tostado medio",
      price: 4200,
      stock: 60,
      categoryId: categories[2].id,
    },
    {
      name: "Agua mineral 6x1.5L",
      description: "Pack de agua mineral sin gas",
      price: 2800,
      stock: 45,
      categoryId: categories[2].id,
    },

    {
      name: "Destornillador Phillips",
      description: "Destornillador de punta Phillips N°2",
      price: 1800,
      stock: 35,
      categoryId: categories[3].id,
    },
    {
      name: "Cinta métrica 5m",
      description: "Cinta métrica retráctil con freno",
      price: 2200,
      stock: 25,
      categoryId: categories[3].id,
    },
    {
      name: "Martillo 300g",
      description: "Martillo de carpintero con mango de madera",
      price: 3800,
      stock: 20,
      categoryId: categories[3].id,
    },

    {
      name: "Resma A4 500 hojas",
      description: "Papel blanco 75g/m²",
      price: 4500,
      stock: 70,
      categoryId: categories[4].id,
    },
    {
      name: "Lapicera azul x10",
      description: "Pack de lapiceras de tinta azul",
      price: 1200,
      stock: 90,
      categoryId: categories[4].id,
    },
    {
      name: "Cuaderno tapa dura A5",
      description: "Cuaderno rayado 96 hojas",
      price: 2800,
      stock: 40,
      categoryId: categories[4].id,
    },
  ]);

  console.log("Seed executed successfully");
}
