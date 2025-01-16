import { Module }                    from '@nestjs/common';
import { ConfigModule }              from '@nestjs/config';
import { TypeOrmModule }             from '@nestjs/typeorm';
import { AuthModule }                from 'src/auth/auth.module';
// Servicio Global
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';

@Module({
    controllers: 
    [ 

    ],
    providers:   
    [ 
      DatabaseConnectionService
      
    ],
    imports: [
        AuthModule,
        ConfigModule,
        TypeOrmModule.forFeature([])
      ],
    exports: [ TypeOrmModule ]
})
export class ControlconfigModule {}
