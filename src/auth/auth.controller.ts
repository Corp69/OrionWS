import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateEccsEmpresasDto, CreateUserDto, LoginUserDto } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Auth - Modulo Authenticacion.')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  
  @Post('register')
  @ApiResponse({ status: 200, description: 'OrionWS - Peticion Exitosa!' })
  @ApiResponse({ status: 404, description: 'OrionWS - Ruta Deshabilitada' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create( createUserDto );
  }   

  @Post('prospecto')
  @ApiResponse({ status: 200, description: 'OrionWS - Peticion Exitosa!' })
  @ApiResponse({ status: 404, description: 'OrionWS - Ruta Deshabilitada' })
  Newempresa(@Body() CreateEccsEmpresasDto: CreateEccsEmpresasDto) {
    return this.authService.Prospecto( CreateEccsEmpresasDto );
  }   

  @Post('login')
  loginUser(@Body() LoginUserDto: LoginUserDto) {
    return this.authService.login( LoginUserDto );
  }   





}
