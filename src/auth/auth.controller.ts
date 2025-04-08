import { Controller, Post, Body, Param, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateEccsEmpresasDto, LoginUserDto } from './dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenDTO } from './dto/Token.dto';


@ApiTags('OrionWS - ECCS - Modulo Authenticacion.')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('prospecto')
  @ApiResponse({
    status: 201,
    description: 'ECCS: Orion webservice - Modulo - Authenticacion.',
    content: {
      'application/json': {
        example: {
            "Success": true,
            "Titulo": "OrionWS webservice - Modulo - Authenticacion.",
            "Mensaje": "Operacion Realizada con exito.",
            "Response": {
                "id_eccs_status": 4,
                "rfc": "XAXE43010101000",
                "nombre_comercial": "ECCS",
                "ext_tel": "+52",
                "telefono": 4651068560,
                "correo": "test@eccs.com.mx",
                "id": 28
            }
        },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'ECCS: Orion webservice - Modulo - Authenticacion.',
    content: {
      'application/json': {
        example: {
              "Success": false,
              "Titulo": "OrionWS webservice - Modulo - Autenticación.",
              "Mensaje": "Operación no se realizó",
              "Response": {
                  "Mensaje": "RFC ya existe",
                  "Error": "duplicate key value violates unique constraint \"eccs_empresas_rfc_key\""
              }
          },
      },
    },
  })
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
