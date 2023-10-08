import mongoose from 'mongoose';
import { PermissionModel, RoleModel } from '../main/roles/roles.schema.ts';

const permissionsData = [
  { key: 'manage_menu', description: 'Add and edit items in menu' },
];

const rolesData = [
  { name: 'admin', permissions: [permissionsData[0]]},
];

async function seedData() {
  try {
    // Connect to the MongoDB database
    await mongoose.connect("mongodb+srv://mohitharshan:RvrArN6q5rPAJzwh@cluster0.b7nchmm.mongodb.net/?retryWrites=true&w=majority");

    // Seed permissions
    await PermissionModel.insertMany(permissionsData);

    // Seed roles
    await RoleModel.insertMany(rolesData);

    console.log('Data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
}

// Call the seedData function to start seeding
seedData();



//  bun run ./server/seeders/restaurant.seeder.ts