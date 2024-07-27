import app from "./src/app.js";

const PORT = process.env.DEV_APP_PORT || 3000

const server = app.listen(PORT, () => {
  console.log(`Server run success:: http://localhost:${PORT}`)
})
