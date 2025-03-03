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
import { HttpModule } from '@nestjs/axios';
import { clientHttp } from './client/clienthttp';

@Module({
  controllers: [LstController, ListadoController],
  providers:[   //servicio http
                clientHttp,
                ListadoService,




                DatabaseConnectionService, 
                ControlappService
            ],
  imports:[  
            HttpModule,
            AuthModule, 
            ConfigModule, 
            TypeOrmModule.forFeature([]),
            HttpModule
          ],
  exports: [TypeOrmModule]
})
export class SharedModule {}
