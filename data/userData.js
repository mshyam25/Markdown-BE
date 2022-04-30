import bcrypt from 'bcryptjs'

export const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('Abc@123', 10),
    isAdmin: true,
    isVerified: true,
  },
  {
    name: 'Shyam',
    email: 'shyam@example.com',
    password: bcrypt.hashSync('Abc@123', 10),
    isAdmin: false,
    isVerified: true,
  },
  {
    name: 'Kalli',
    email: 'kalli@example.com',
    password: bcrypt.hashSync('Abc@123', 10),
    isAdmin: false,
    isVerified: false,
  },
]
