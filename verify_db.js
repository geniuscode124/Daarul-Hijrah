const { PrismaClient } = require('./prisma/generated/prisma');
const prisma = new PrismaClient();

async function run() {
  try {
    const res = await prisma.$queryRaw`SELECT column_name FROM information_schema.columns WHERE table_name='User'`;
    console.log("User columns:", res.map(r => r.column_name));
    
    // Attempt findFirst to trigger the exact error
    await prisma.user.findFirst();
    console.log("findFirst succeeded!");
  } catch (e) {
    console.error("findFirst Failed: ", e.message);
  } finally {
    await prisma.$disconnect();
  }
}
run();
