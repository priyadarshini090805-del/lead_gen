import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log", "debug", "verbose"],
  });

  app.setGlobalPrefix("api");
  app.use(helmet());
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(",") ?? "*",
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swagger = new DocumentBuilder()
    .setTitle("Hanexis API")
    .setDescription("AI-Driven Social Media Lead Generation System")
    .setVersion("0.1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup("api/docs", app, document);

  const port = parseInt(process.env.PORT ?? "4000", 10);
  await app.listen(port);
  Logger.log(`🚀 Hanexis API running on http://localhost:${port}/api`, "Bootstrap");
  Logger.log(`📘 Swagger docs at http://localhost:${port}/api/docs`, "Bootstrap");
}

bootstrap();
