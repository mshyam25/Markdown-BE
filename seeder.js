import User from './models/userModel.js'
import dotenv from 'dotenv'
import connectToDB from './db.js'
import Notes from './models/notesModel.js'
import { users } from './data/userData.js'
dotenv.config()
await connectToDB()

const importData = async () => {
  try {
    await User.deleteMany()

    await User.insertMany(users)
    await Notes.deleteMany()
    process.exit()
  } catch (error) {
    console.log(`Error : ${error.message}`)
    process.exit(1)
  }
}

importData()
