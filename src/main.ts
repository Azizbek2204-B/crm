import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function start() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const PORT = process.env.PORT || 3001;
  app.setGlobalPrefix(`api`)
  await app.listen(PORT, ()=>{
    console.log(`Server ${PORT}-portda ishga tushdi...`);
  });
}
start();
