import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { SpaceModule } from './AriesERP/Space/space.module';
import { EccsModule } from './AriesERP/Eccs/Eccs.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
     TypeOrmModule.forRoot({
       type: 'postgres',
       host: process.env.DB_HOST,
       port: +process.env.DB_PORT,
       database: process.env.DB_NAME,
       username: process.env.DB_USERNAME,
       password: process.env.DB_PASSWORD,      
       autoLoadEntities: true,
       synchronize: false,
       extra: {
        idleTimeoutMillis: 120000  // Tiempo de inactividad para cerrar en milisegundos (5 minutos)
      }
     }),
    AuthModule,
    CommonModule,
    SpaceModule,
    EccsModule,
  ],
})
export class AppModule {}
