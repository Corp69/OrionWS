import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './eccs/DatabaseConnectionService';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
//AriesERP Controllers
import { LstController } from './Arieserp/controllers/lst/lst.controller';
//AriesERP Services
import { ControlappService } from './Arieserp/services/controlapp/controlapp.service';
//Scorpio Controllers 
import { ListadoController } from './Scorpio/controllers/listado/listado.controller';
//Scorpio Services
import { ListadoService } from './Scorpio/services/listado/listado.service';

@Module({
  controllers: [LstController, ListadoController],
  providers:[   
                ListadoService,




                DatabaseConnectionService, 
                ControlappService
            ],
  imports:[
            AuthModule, 
            ConfigModule, 
            TypeOrmModule.forFeature([])
          ],
  exports: [TypeOrmModule]
})
export class SharedModule {}
