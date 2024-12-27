import { Module } from '@nestjs/common';

import { OrionMailController } from './controllers/OrionMail.controller';
import { OrionMailService } from './services/OrionMail.service';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';



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
