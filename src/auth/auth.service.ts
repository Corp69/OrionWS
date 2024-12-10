import {
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common';
import {
  CreateEccsEmpresasDto,
  LoginUserDto
} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { eccs_empresas } from './entities/eccs_empresas.entity';
import { DataSource, Repository } from 'typeorm';

//import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { TokenDTO } from './dto/Token.dto';
import { DBErrorHandlerService } from '../shared/errors/DBErrorHandlerService';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(eccs_empresas)
    private readonly eccs_empresasRepository: Repository<eccs_empresas>,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
    private readonly dbErrorHandlerService: DBErrorHandlerService, // Inyectamos el servicio de manejo de errores

  ) { }


  public async Prospecto(createEccsEmpresasDto: CreateEccsEmpresasDto): Promise<ResponseDto<CreateEccsEmpresasDto>> {
    try {
      const data = await this.eccs_empresasRepository.save(createEccsEmpresasDto);
      return {
        Success: true,
        Titulo: "OrionWS webservice - Modulo - Authenticacion.",
        Mensaje: "Operacion Realizada con exito.",
        Response: data
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: "OrionWS webservice - Modulo - Autenticación.",
          Mensaje: "Operación no se realizó",
          Response:  this.dbErrorHandlerService.handleDBErrors(error) || error,
        },
        HttpStatus.CONFLICT
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
    try {
      const data = await this.dataSource.query(`SELECT "orion".login('${LoginUserDto.usuario}','${LoginUserDto.pass}')`);
      return {
        Success: true,
        Titulo: "ECCS: OrionWS - Auth - Login.",
        Mensaje: "Operacion Realizada con exito.",
        Response: data[0].login,
        token: this.getJwtToken({ id: data[0].login.id })
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: "ECCS: OrionWS - Auth - Login.",
          Mensaje: "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.OK
      );
    }
  }

  public async GetToken( TokenDTO: TokenDTO ): Promise<ResponseDto<TokenDTO>> {
    try {
      const decodedToken = this.jwtService.verify( TokenDTO.token ); // Verifica el token
      return {
        Success: true,
        Titulo: "ECCS: OrionWS - Auth - Check Token.",
        Mensaje: "Token válido.",
        Response: decodedToken, // Información contenida en el token
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: "ECCS: OrionWS - Auth - Check Token.",
          Mensaje: "Token no válido o expirado.",
          Response: error.message || error,
        },
        HttpStatus.UNAUTHORIZED // Usa un estado adecuado, como UNAUTHORIZED
      );
    }
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

  // public async login(LoginUserDto: LoginUserDto) {
  //   const { pass, usuario } = LoginUserDto;
  //   const user = await this.userRepository.findOne({
  //     where:  { usuario },
  //     select: { id: true, usuario: true, pass: true }
  //   });

  //   if (!user)
  //     throw new UnauthorizedException('Usuario no es valido | no se encontró (usuario)');
  //   //if ( !bcrypt.compareSync( password, user.password ) ) //? esta linea de codigo compara si tenemos encryotada la contraseña
  //   if (LoginUserDto.pass != user.pass)
  //     throw new UnauthorizedException('password no se encontró coincidencia.');

  //   return {
  //     usuario: user.usuario,
  //     token: this.getJwtToken({ id: user.id })
  //   };
  //   //return user;


    








  // }

}
