import { Module } from '@nestjs/common';

//app.module.ts
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
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
