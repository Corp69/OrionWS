import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        @InjectRepository( Users )
        private readonly userRepository: Repository<Users>,

        configService: ConfigService
    ) {

        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }


    async validate( payload: JwtPayload ): Promise<Users> {
        
        const { id } = payload;

        const user = await this.userRepository.findOneBy({ id });
        if ( !user ) 
            throw new UnauthorizedException('Token no encontro un token valido, Inicia Session.')
            
        if ( user.id_eccs_status == 3 ) 
            throw new UnauthorizedException('Usuario esta cancelado');
        

        return user;
    }

}