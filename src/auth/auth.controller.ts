import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateEccsEmpresasDto, CreateUserDto, LoginUserDto } from './dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenDTO } from './dto/Token.dto';


@ApiTags('Auth - Modulo Authenticacion.')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  
  // @Post('register')
  // @ApiResponse({ status: 200, description: 'OrionWS - Peticion Creada de forma Exitosa!' })
  // @ApiResponse({ status: 404, description: 'OrionWS - Ruta Deshabilitada' })
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.create( createUserDto );
  // }   

  @Post('prospecto')
  @ApiResponse({ status: 201, description: 'OrionWS - Peticion Creada de forma Exitosa !' })
  @ApiResponse({ status: 205, description: 'OrionWS - llave duplicada viola restricción de unicidad.' })
  @ApiResponse({ status: 404, description: 'OrionWS - Ruta Deshabilitada.' })
  public Newempresa(@Body() CreateEccsEmpresasDto: CreateEccsEmpresasDto) {
    return this.authService.Prospecto( CreateEccsEmpresasDto );
  }   

  @Post('ComprobantePago/:id')
  @ApiParam({
    name: 'id',
    description: 'ID de la empresa para el cual se va a generar el comprobante de pago, que estará pendiente de pago.',
    required: true,
    type: Number, // Especificamos que el tipo es un número
  })
  @ApiResponse({ status: 201, description: 'OrionWS - Peticion Creada de forma Exitosa !' })
  @ApiResponse({ status: 404, description: 'OrionWS - Ruta Deshabilitada.' })
  public ComprobantePago(@Param('id') id: number) {
    return this.authService.ComprobantePago( id );
  }   

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'ECCS: OrionWS - Auth - Login.',
    content: {
      'application/json': {
        example: {
           "Success": true,
           "Titulo": "ECCS: OrionWS - Auth - Login.",
           "Mensaje": "Operacion Realizada con exito.",
           "Response": {
            "id": 1,
            "id_usuario": 1,
            "usuario": "eccs",
            "estadolicencia": "Pagado",
            "observaciones": "ECCS - AGRADECE SU PAGO LICENCIA ACTIVA",
            "validahasta": "2024-12-22"
        },
        "token": "eyJhbGci6X7xXY1U"
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'ECCS: OrionWS - Auth - Login. - Ruta desactivada.' })
  @ApiResponse({ status: 500, description: 'ECCS: OrionWS - Auth - Login. - Error en el server.' })
  loginUser(@Body() LoginUserDto: LoginUserDto) {
    return this.authService.login( LoginUserDto );
  }   


  @Post('token')
  @ApiResponse({
    status: 201,
    description: 'ECCS: OrionWS - Auth - Token.',
    content: {
      'application/json': {
        example: {
         
              "Success": true,
              "Titulo": "ECCS: OrionWS - Auth - Check Token.",
              "Mensaje": "Token válido.",
              "Response": {
                  "id": 1,
                  "iat": 1733626907,
                  "exp": 1733634107
              }
        
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'ECCS: OrionWS - Auth - Token.',
    content: {
      'application/json': {
        example: {
         
          "Success": false,
          "Titulo": "ECCS: OrionWS - Auth - Check Token.",
          "Mensaje": "Token no válido o expirado.",
          "Response": "invalid signature"
        
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'ECCS: OrionWS - Auth - Token. - Ruta desactivada.' })
  @ApiResponse({ status: 500, description: 'ECCS: OrionWS - Auth - Token. - Error en el server.' })
  Tokken(@Body() TokenDTO: TokenDTO ) {
    return this.authService.GetToken( TokenDTO );
  }   


}
