const fs = require('fs')
fs.writeFileSync(
  './.env',
  `
BASE_URL=${process.env.BASE_URL}\n
MONGO_DB_CONNECTION=${process.env.MONGO_DB_CONNECTION}\n
JWT_SECRET=${process.env.JWT_SECRET}\n
PORT=${process.env.PORT}\n
GOOGLE_ANALYTICS_API_KEY=${process.env.GOOGLE_ANALYTICS_API_KEY}
`
) // Use the bellow command to generate env
// ```bash
// node ./create-env.js
// ```
