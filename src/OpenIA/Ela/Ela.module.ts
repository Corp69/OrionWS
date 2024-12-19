import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrthographyController } from './controllers/Orthography.controller';
import { OrthographyService } from './services/Orthography.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [ OrthographyController ],
    providers:   [  OrthographyService   ],
    imports: [
      //Authenticador para realizar el uso de autheticaciones
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
export class ElaModule {



}
