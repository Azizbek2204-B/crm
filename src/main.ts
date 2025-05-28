import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";


async function bootstrap() {
  const app = await NestFactory.create(AppModule,{logger:["debug","error"]});
  app.setGlobalPrefix("api");
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  const PORT = process.env.PORT || 3000
  await app.listen(PORT, () => {
    console.log(`Server started at ${PORT}-port 🔥`);
  });
  
}
bootstrap();
