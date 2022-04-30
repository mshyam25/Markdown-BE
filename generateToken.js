import jwt from 'jsonwebtoken'
export const generateToken = (id) => {
  console.log(id)
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: '30m',
  })
}
