// Esta función se va a usar para insertar datos de prueba en la base de datos cuando se inicie el servidor.
// Cuando tengamos los modelos definidos, venimos aca y hacemos toda la carga de productos, etc.

// Estos son algunos datos de ejemplo para tener en la db, luego la vamos a llenar ya con productos reales.

import { Category, Product } from '../../models';

export async function seed(): Promise<void> {
  const categories = await Category.bulkCreate([
    {
      name: 'Electrónica',
      description: 'Dispositivos electrónicos y accesorios',
    },
    { name: 'Ropa', description: 'Indumentaria y accesorios de moda' },
    { name: 'Alimentos', description: 'Productos alimenticios y bebidas' },
  ]);

  await Product.bulkCreate([
    {
      name: 'Auriculares Bluetooth',
      price: 15000,
      stock: 25,
      categoryId: categories[0].id,
    },
    {
      name: 'Cable USB-C',
      price: 2500,
      stock: 100,
      categoryId: categories[0].id,
    },
    {
      name: 'Remera básica',
      price: 8000,
      stock: 50,
      categoryId: categories[1].id,
    },
    {
      name: 'Zapatillas urbanas',
      price: 45000,
      stock: 15,
      categoryId: categories[1].id,
    },
    {
      name: 'Yerba mate 1kg',
      price: 3500,
      stock: 80,
      categoryId: categories[2].id,
    },
    {
      name: 'Café molido 500g',
      price: 4200,
      stock: 60,
      categoryId: categories[2].id,
    },
  ]);

  console.log('Seed executed successfully');
}
