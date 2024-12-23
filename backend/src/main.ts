import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Sales API')
    .setDescription('The Analytics and sales API description')
    .setVersion('1.0')
    .addTag('Sales')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  //enabble cors

 // Enable CORS
 app.enableCors({
  origin: [
    'http://localhost:8080',  // Vue development server
    'http://vue_app:3000',   // Docker frontend service
    'http://localhost:3000',  // Alternate frontend port  // Production frontend URL
  ], // Frontend origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
  credentials: true, // Allow cookies (if needed)
});
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
