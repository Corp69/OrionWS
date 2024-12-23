import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';
import { OrionMailService } from './services/OrionMail.service';
import { OrionMailController } from './controllers/OrionMail.controller';

@Module({
    controllers: [ OrionMailController ],
    providers:   [ OrionMailService, DatabaseConnectionService  ],
    imports: [
        AuthModule,
        ConfigModule,
        TypeOrmModule.forFeature([])
      ],
    exports: [ TypeOrmModule ]
})
export class OrionMailModule {}
