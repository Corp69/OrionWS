import { 
          BadRequestException, 
          Injectable, 
          InternalServerErrorException, 
          UnauthorizedException
       } from '@nestjs/common';
import { 
          CreateUserDto,
          LoginUserDto 
       } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces';


@Injectable()
export class AuthService {


  constructor( 
    
    @InjectRepository( Users )
    private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,

  ){}


  async create( createUserDto: CreateUserDto) {
    
    try {

      const { password, ...userData } = createUserDto;
      
      const user = this.userRepository.create({
        ...userData,
       // password: bcrypt.hashSync( password, 10 ) //? Esta linea encripta contraseñas
        password:  password //? Esta linea encripta contraseñas
      });

      await this.userRepository.save( user )
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };
      // TODO: Retornar el JWT de acceso

    } catch (error) {
      this.handleDBErrors(error);
    }

  }




  public async login( LoginUserDto: LoginUserDto){

    const { password, email } = LoginUserDto;

    const user = await this.userRepository.findOne({ 
      where:  { email },
      select: { email: true, password: true }
    });

    if ( !user )
      throw new UnauthorizedException('Credentials are not valid (email)');
    //if ( !bcrypt.compareSync( password, user.password ) ) //? esta linea de codigo compara si tenemos encryotada la contraseña
    if ( !(LoginUserDto.password == user.password)  )
      throw new UnauthorizedException('Credentials are not valid (password)');

     return {
       ...user,
       token: this.getJwtToken({ id: user.id })
     };
    //return user;
  }



  private getJwtToken( payload: JwtPayload ) {

    const token = this.jwtService.sign( payload );
    return token;

  }

  async checkAuthStatus( user: Users ){
    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };

  }

  private handleDBErrors( error: any ): never {
    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }

  private handleBDerror ( error: any ): never {
    if ( error.code == '23585')
      throw new BadRequestException();
      throw new InternalServerErrorException(' pleasr check server logs ');
  }


}
