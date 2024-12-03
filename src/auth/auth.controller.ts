import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateEccsEmpresasDto, CreateUserDto, LoginUserDto } from './dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


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
  loginUser(@Body() LoginUserDto: LoginUserDto) {
    return this.authService.login( LoginUserDto );
  }   





}
