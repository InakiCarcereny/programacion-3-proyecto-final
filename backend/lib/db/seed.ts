import {
  Category,
  Product,
  Movement,
  Company,
  Profile,
  User,
  UserDetails,
} from "../../models";

import bcrypt from "bcrypt";

export async function seed(): Promise<void> {
  const profiles = await Profile.bulkCreate([
    { name: "admin", description: "Administrador de la empresa" },
    { name: "empleado", description: "Empleado de la empresa" },
  ]);

  const company = await Company.create({
    name: "Inventory Pro S.A.",
    description: "Empresa de gestión de inventario",
  });

  const hashedPassword = await bcrypt.hash("password123", 10);

  const adminUser = await User.create({
    email: "admin@inventorypro.com",
    password: hashedPassword,
    isActive: true,
    companyId: company.id,
    profileId: profiles[0].id,
  });

  const employeeUser = await User.create({
    email: "empleado@inventorypro.com",
    password: hashedPassword,
    isActive: true,
    companyId: company.id,
    profileId: profiles[1].id,
  });

  await UserDetails.bulkCreate([
    {
      userId: adminUser.id,
      firstName: "Alex",
      lastName: "Rivera",
      phone: "+54 9 11 1234-5678",
    },
    {
      userId: employeeUser.id,
      firstName: "Juan",
      lastName: "Pérez",
      phone: "+54 9 11 8765-4321",
    },
  ]);

  const categories = await Category.bulkCreate([
    {
      name: "Electrónica",
      description: "Dispositivos electrónicos y accesorios",
      companyId: company.id,
    },
    {
      name: "Indumentaria",
      description: "Ropa y accesorios de moda",
      companyId: company.id,
    },
    {
      name: "Alimentos y Bebidas",
      description: "Productos alimenticios y bebidas",
      companyId: company.id,
    },
    {
      name: "Herramientas",
      description: "Herramientas y equipos de trabajo",
      companyId: company.id,
    },
    {
      name: "Librería",
      description: "Útiles escolares y de oficina",
      companyId: company.id,
    },
  ]);

  const products = await Product.bulkCreate([
    {
      name: "Auriculares Bluetooth",
      description: "Auriculares inalámbricos con cancelación de ruido",
      price: 15000,
      stock: 25,
      categoryId: categories[0].id,
      companyId: company.id,
      imageUrl:
        "https://res.cloudinary.com/ddi9kplos/image/upload/v1785099215/products/y3i1mdlaeijybnsc5erh.webp",
    },
    {
      name: "Cable USB-C 2m",
      description: "Cable de carga rápida y transferencia de datos",
      price: 2500,
      stock: 100,
      categoryId: categories[0].id,
      companyId: company.id,
      imageUrl:
        "https://res.cloudinary.com/ddi9kplos/image/upload/v1785099765/products/uhe3kgvuh1aaxzue8t1y.webp",
    },
    {
      name: "Teclado mecánico",
      description: "Teclado mecánico retroiluminado RGB",
      price: 45000,
      stock: 10,
      categoryId: categories[0].id,
      companyId: company.id,
      imageUrl:
        "https://res.cloudinary.com/ddi9kplos/image/upload/v1785099687/products/woy9i7u5y0adps84wovq.webp",
    },
    {
      name: "Mouse inalámbrico",
      description: "Mouse ergonómico con receptor USB",
      price: 8000,
      stock: 30,
      categoryId: categories[0].id,
      companyId: company.id,
      imageUrl:
        "https://res.cloudinary.com/ddi9kplos/image/upload/v1785099817/products/bhhlch7plyfiknofx7vp.webp",
    },
    {
      name: "Remera básica blanca",
      description: "Remera de algodón talle M",
      price: 6500,
      stock: 50,
      categoryId: categories[1].id,
      companyId: company.id,
      imageUrl:
        "https://res.cloudinary.com/ddi9kplos/image/upload/v1785099892/products/ol83rjf1hk5wdajmpffb.webp",
    },
    {
      name: "Zapatillas urbanas",
      description: "Zapatillas deportivas talle 42",
      price: 48000,
      stock: 15,
      categoryId: categories[1].id,
      companyId: company.id,
      imageUrl:
        "https://res.cloudinary.com/ddi9kplos/image/upload/v1785099942/products/q6qj5qd14u8r7ugznkz2.webp",
    },
    {
      name: "Buzo con capucha",
      description: "Buzo de algodón frizado talle L",
      price: 18000,
      stock: 20,
      categoryId: categories[1].id,
      companyId: company.id,
      imageUrl:
        "https://res.cloudinary.com/ddi9kplos/image/upload/v1785100019/products/qtcxsfyf2osl4n1bcmmz.webp",
    },
    {
      name: "Yerba mate 1kg",
      description: "Yerba mate elaborada con palo",
      price: 3500,
      stock: 80,
      categoryId: categories[2].id,
      companyId: company.id,
      imageUrl:
        "https://res.cloudinary.com/ddi9kplos/image/upload/v1785100077/products/nnjdx8glerby9kisbwhe.webp",
    },
    {
      name: "Café molido 500g",
      description: "Café de origen único tostado medio",
      price: 4200,
      stock: 60,
      categoryId: categories[2].id,
      companyId: company.id,
      imageUrl:
        "https://res.cloudinary.com/ddi9kplos/image/upload/v1785100123/products/cfolgcrnqnhzgqeymqx6.webp",
    },
    {
      name: "Agua mineral 6x1.5L",
      description: "Pack de agua mineral sin gas",
      price: 2800,
      stock: 45,
      categoryId: categories[2].id,
      companyId: company.id,
      imageUrl:
        "https://res.cloudinary.com/ddi9kplos/image/upload/v1785100206/products/klh9zsoww2dvzz7sgfcy.webp",
    },
    {
      name: "Destornillador Phillips",
      description: "Destornillador de punta Phillips N°2",
      price: 1800,
      stock: 35,
      categoryId: categories[3].id,
      companyId: company.id,
      imageUrl:
        "https://res.cloudinary.com/ddi9kplos/image/upload/v1785099311/products/z0mmauzdmiwfv8ir0bji.webp",
    },
    {
      name: "Cinta métrica 5m",
      description: "Cinta métrica retráctil con freno",
      price: 2200,
      stock: 25,
      categoryId: categories[3].id,
      companyId: company.id,
      imageUrl:
        "https://res.cloudinary.com/ddi9kplos/image/upload/v1785099386/products/c7pyne3squs6mqzzoptv.webp",
    },
    {
      name: "Martillo 300g",
      description: "Martillo de carpintero con mango de madera",
      price: 3800,
      stock: 20,
      categoryId: categories[3].id,
      companyId: company.id,
      imageUrl:
        "https://res.cloudinary.com/ddi9kplos/image/upload/v1785099444/products/ay9gxhz7v00tp5p6llu5.webp",
    },
    {
      name: "Resma A4 500 hojas",
      description: "Papel blanco 75g/m²",
      price: 4500,
      stock: 70,
      categoryId: categories[4].id,
      companyId: company.id,
      imageUrl:
        "https://res.cloudinary.com/ddi9kplos/image/upload/v1785099505/products/q3zzzkhjqujbz9anl8v1.webp",
    },
    {
      name: "Lapicera azul x10",
      description: "Pack de lapiceras de tinta azul",
      price: 1200,
      stock: 90,
      categoryId: categories[4].id,
      companyId: company.id,
      imageUrl:
        "https://res.cloudinary.com/ddi9kplos/image/upload/v1785099576/products/vbfyad4bmbwbnolsbtk4.webp",
    },
    {
      name: "Cuaderno tapa dura A5",
      description: "Cuaderno rayado 96 hojas",
      price: 2800,
      stock: 40,
      categoryId: categories[4].id,
      companyId: company.id,
      imageUrl:
        "https://res.cloudinary.com/ddi9kplos/image/upload/v1785099638/products/fid4yl85kxnqcraaahvb.webp",
    },
  ]);

  await Movement.bulkCreate([
    {
      productId: products[0].id,
      quantity: 10,
      type: "ingreso",
      description: "Reposición de stock inicial",
    },
    {
      productId: products[1].id,
      quantity: 5,
      type: "ingreso",
      description: "Compra a proveedor",
    },
    {
      productId: products[2].id,
      quantity: 2,
      type: "egreso",
      description: "Venta a cliente",
    },
    {
      productId: products[3].id,
      quantity: 8,
      type: "ingreso",
      description: "Reposición de stock inicial",
    },
    {
      productId: products[4].id,
      quantity: 3,
      type: "egreso",
      description: "Venta a cliente",
    },
    {
      productId: products[5].id,
      quantity: 15,
      type: "ingreso",
      description: "Compra a proveedor",
    },
    {
      productId: products[6].id,
      quantity: 1,
      type: "egreso",
      description: "Devolución a proveedor",
    },
    {
      productId: products[7].id,
      quantity: 20,
      type: "ingreso",
      description: "Reposición de stock inicial",
    },
    {
      productId: products[8].id,
      quantity: 4,
      type: "egreso",
      description: "Venta a cliente",
    },
    {
      productId: products[9].id,
      quantity: 6,
      type: "ingreso",
      description: "Compra a proveedor",
    },
  ]);

  console.log("Seed executed successfully");
}
