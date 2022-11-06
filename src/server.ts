import Fastify from "fastify";
import cors from "@fastify/cors";

import { authRoutes } from "./routes/auth";
import { usersRoutes } from "./routes/users";
import { pollsRoutes } from "./routes/polls";
import { gamesRoutes } from "./routes/games";
import { guessesRoutes } from "./routes/guesses";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(authRoutes);
  await fastify.register(usersRoutes);
  await fastify.register(pollsRoutes);
  await fastify.register(gamesRoutes);
  await fastify.register(guessesRoutes);

  await fastify.listen({ port: 3333, host: "0.0.0.0" });
}

bootstrap();
