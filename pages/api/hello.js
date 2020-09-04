import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}

async function runQuery(query) {
  return query
    .catch(e => {
      throw e;
    })
    .finally(async () => {
      // This causes the error
      await prisma.$disconnect();
    });
}

async function testQuery() {
  return runQuery(prisma.$queryRaw('select now()'));
}

export default async (req, res) => {
  const promises = [];

  for (let i = 0; i < 10; i++) {
    promises.push(testQuery());
  }

  const result = await Promise.all(promises);

  res.statusCode = 200;
  res.json({ result });
}
