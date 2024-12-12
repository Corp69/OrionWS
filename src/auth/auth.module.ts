import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Users } from './entities/users.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { eccs_empresas } from './entities';
import { DBErrorHandlerService } from '../shared/errors/DBErrorHandlerService';
import { EccsService } from '../shared/eccs/EccsService';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';

@Module({
  controllers: [AuthController],
  providers: 
            [
    AuthService, 
    JwtStrategy, 
    DBErrorHandlerService, 
    EccsService,
    
    DatabaseConnectionService
  ],
  imports: [
    ConfigModule,

    TypeOrmModule.forFeature([ Users, eccs_empresas  ]),

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject:  [ ConfigService ],
      useFactory: ( configService: ConfigService ) => {
        // console.log('JWT Secret', configService.get('JWT_SECRET') )
        // console.log('JWT SECRET', process.env.JWT_SECRET)
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn:'2h'
          }
        }
      }
    })
    // JwtModule.register({
      // secret: process.env.JWT_SECRET,
      // signOptions: {
      //   expiresIn:'2h'
      // }
    // })

  ],
  exports: [ TypeOrmModule, JwtStrategy, PassportModule, JwtModule ]
})
export class AuthModule {}