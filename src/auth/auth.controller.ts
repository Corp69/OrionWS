import { Controller, Get, Post, Body, UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IncomingHttpHeaders } from 'http';

import { AuthService } from './auth.service';
import { RawHeaders, GetUser, Auth } from './decorators';
import { RoleProtected } from './decorators/role-protected.decorator';

import { CreateUserDto, LoginUserDto } from './dto';
import { Users } from './entities/users.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';




@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create( createUserDto );
  }   

  @Post('login')
  loginUser(@Body() LoginUserDto: LoginUserDto) {
    return this.authService.login( LoginUserDto );
  }   


  @Get('private')
  @UseGuards( AuthGuard() )
  testingPrivateRoute(
            @Req() request: Express.Request,
            @GetUser() user: Users,
            @GetUser('email') userEmail: string,
            
            @RawHeaders() rawHeaders: string[],
            @Headers() headers: IncomingHttpHeaders,
  ) {
    return {
      ok: true,
      message: 'Hola Mundo Private',
      user,
      userEmail,
      rawHeaders,
      headers
    }
  }


    // @SetMetadata('roles', ['admin','super-user'])

    @Get('private2')
    @RoleProtected( ValidRoles.superUser, ValidRoles.admin )
    @UseGuards( AuthGuard(), UserRoleGuard )
    privateRoute2(
      @GetUser() user: Users
    ) {
  
      return {
        ok: true,
        user
      }
    }
  
  
    @Get('private3')
    @Auth( ValidRoles.admin )
    privateRoute3(
      @GetUser() user: Users
    ) {
  
      return {
        ok: true,
        user
      }
    }



}
