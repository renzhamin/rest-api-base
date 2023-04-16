import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

/* db.user.deleteMany().then(() => { */
/*     console.log("all users deleted") */
/* }) */

export default db
