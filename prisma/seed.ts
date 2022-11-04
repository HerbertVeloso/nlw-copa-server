import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@email.com",
      avatarUrl: "https://github.com/HerbertVeloso.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Example Pool",
      code: "POOL01",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-10T12:30:00.171Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "GE",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-12T15:00:00.171Z",
      firstTeamCountryCode: "VA",
      secondTeamCountryCode: "BR",

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
