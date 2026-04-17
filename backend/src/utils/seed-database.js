const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    const { RoleService, UserService } = require('../services');
    const roleService = new RoleService();
    const userService = new UserService();

    console.log('Services initialized');

    // Seed roles
    console.log('Attempting to seed roles...');
    await roleService.seedRoles();
    console.log('Roles seeded successfully');

    // Seed default admin user
    console.log('Attempting to get admin role...');
    const adminRole = await roleService.getRoleByName('ADMIN');
    console.log('Admin role:', adminRole);

    if (adminRole) {
      try {
        console.log('Creating default admin user...');
        await userService.createUser(
          {
            name: 'Admin User',
            email: process.env.ADMIN_EMAIL || 'admin@purplemerit.com',
            password: process.env.ADMIN_PASSWORD || 'Admin@123456',
            roleId: adminRole._id,
            status: 'active'
          },
          null
        );
        console.log('Default admin user created');
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log('Admin user already exists');
        } else {
          throw error;
        }
      }
    }

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error.message);
    console.error('Stack trace:', error.stack);
  }
};

module.exports = seedDatabase;
