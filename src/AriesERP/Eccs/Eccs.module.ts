import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EccsService } from './Eccs.service';
import { EccsController } from './Eccs.controller';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';

@Module({
    controllers: [ EccsController ],
    providers:   [ EccsService, DatabaseConnectionService    ],
    imports: [
        AuthModule,
        ConfigModule,
        TypeOrmModule.forFeature([  
          
        ])
        // JwtModule.register({
          // secret: process.env.JWT_SECRET,
          // signOptions: {
          //   expiresIn:'2h'
          // }
        // })
    
      ],
    exports: [ TypeOrmModule ]
})
export class EccsModule {}
