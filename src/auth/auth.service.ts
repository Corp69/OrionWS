import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import {
  CreateEccsEmpresasDto,
  CreateUserDto,
  LoginUserDto
} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { eccs_empresas } from './entities/eccs_empresas.entity';
import { Repository } from 'typeorm';

//import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces';
import { ResponseDto } from '../shared/dtos/response.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(eccs_empresas)
    private readonly eccs_empresasRepository: Repository<eccs_empresas>,
    private readonly jwtService: JwtService,
  ) { }


  public async Prospecto(createEccsEmpresasDto: CreateEccsEmpresasDto): Promise<ResponseDto<CreateEccsEmpresasDto>> {
    try {
      // Guarda la entidad usando el DTO recibido
      const data = await this.eccs_empresasRepository.save(createEccsEmpresasDto);
      // Retorna la respuesta estructurada
      return {
        Success: true,
        Titulo: "OrionWS webservice - Modulo - Authenticacion.",
        Mensaje: "Operacion Realizada con exito.",
        Response: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: "OrionWS webservice - Modulo - Autenticación.",
          Mensaje: "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async ComprobantePago( id: number ): Promise<ResponseDto<CreateEccsEmpresasDto>> {
    try {
      const data = await this.eccs_empresasRepository.query(
        `SELECT eccs_fn_ins_empresas_pagos(${id})`
      );
      // Retorna la respuesta estructurada
      return {
        Success: true,
        Titulo: "OrionWS webservice - Modulo - Authenticacion.",
        Mensaje: "Operacion Realizada con exito.",
        Response: data[0].eccs_fn_ins_empresas_pagos,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: "OrionWS webservice - Modulo - Autenticación.",
          Mensaje: "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async login(LoginUserDto: LoginUserDto) {
    const { pass, usuario } = LoginUserDto;
    const user = await this.userRepository.findOne({
      where:  { usuario },
      select: { id: true, usuario: true, pass: true }
    });

    if (!user)
      throw new UnauthorizedException('Usuario no es valido | no se encontró (usuario)');
    //if ( !bcrypt.compareSync( password, user.password ) ) //? esta linea de codigo compara si tenemos encryotada la contraseña
    if (LoginUserDto.pass != user.pass)
      throw new UnauthorizedException('password no se encontró coincidencia.');

    return {
      usuario: user.usuario,
      token: this.getJwtToken({ id: user.id })
    };
    //return user;
  }



  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  public async checkAuthStatus(user: Users) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };

  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }

  private handleBDerror(error: any): never {
    if (error.code == '23585')
      throw new BadRequestException();
    throw new InternalServerErrorException(' pleasr check server logs ');
  }


  // public async create(createUserDto: CreateUserDto) {
  //   try {

  //     const { password, ...userData } = createUserDto;

  //     const user = this.userRepository.create({
  //       ...userData,
  //       // password: bcrypt.hashSync( password, 10 ) //? Esta linea encripta contraseñas
  //       password: password //? Esta linea encripta contraseñas
  //     });

  //     await this.userRepository.save(user)
  //     delete user.password;

  //     return {
  //       ...user,
  //       token: this.getJwtToken({ id: user.id })
  //     };
  //     // TODO: Retornar el JWT de acceso

  //   } catch (error) {
  //     this.handleDBErrors(error);
  //   }

  // }


}
