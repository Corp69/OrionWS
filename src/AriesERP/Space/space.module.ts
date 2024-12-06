import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpaceService } from './space.service';
import { SpaceController } from './space.controller';

@Module({
    controllers: [ SpaceController ],
    providers:   [ SpaceService    ],
    imports: [
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
export class SpaceModule {}
