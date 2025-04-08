import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('orionws');

      app.enableCors({
        origin: [
              
                'http://localhost:4200', 
                'http://localhost:4000', 
                
                'https://scorpio-production.up.railway.app',
                'https://arieserp-production.up.railway.app',
                'https://scorpio.eccs.com.mx',
                'https://scorpio.eccs.com.mx',
                'https://arieserp.eccs.com.mx',
                'https://eccs.arieserp.com.mx',

                 'http://localhost:8100',
                 'https://localhost'
              
              
              ], // Dominios permitidos
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
        credentials: true, // Permitir cookies u otras credenciales
        allowedHeaders: 'Content-Type, Authorization', // Encabezados permitidos
      });

     app.useGlobalPipes(
       new ValidationPipe({
         whitelist: true,
         forbidNonWhitelisted: true,
       })
     );

  const config = new DocumentBuilder()
     .setTitle(`ECCS: Bienvenido al Proyecto Estimado/a`)
     .setDescription(`OrionWS:
                Es un placer darte la bienvenida a nuestro equipo de desarrollo. 
                Estamos muy emocionados de contar con tu talento y experiencia en este proyecto,
                La documentación está organizada de manera que te permitirá entender rápidamente la estructura del proyecto,
                el flujo de trabajo y las funcionalidades más importantes. 
                Además, podrás encontrar detalles sobre el entorno de desarrollo, 
                los procesos de integración continua y cómo realizar tus contribuciones de manera eficiente.
                `)
     .setVersion('copyright')
     .addTag('ORIONWS')
     .build();
   const documentFactory = () => SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, documentFactory);
 

  await app.listen(3000);
}
bootstrap();
