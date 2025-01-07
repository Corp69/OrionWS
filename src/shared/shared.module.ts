import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './eccs/DatabaseConnectionService';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ControlappService } from './Arieserp/services/controlapp/controlapp.service';

@Module({
  providers:[ 
                DatabaseConnectionService, 
                ControlappService
            ],
  imports:[
            AuthModule, 
            ConfigModule, 
            TypeOrmModule.forFeature([])
          ],
  exports: [TypeOrmModule],
})
export class SharedModule {}
