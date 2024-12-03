import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Users } from '../entities/users.entity';
import { META_ROLES } from '../decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  
  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const validRoles: string[] = this.reflector.get( META_ROLES , context.getHandler() )

    if ( !validRoles ) return true;
    if ( validRoles.length === 0 ) return true;
    
    const req = context.switchToHttp().getRequest();
    const user = req.user as Users;

    if ( !user ) 
      throw new BadRequestException('No se encontro un usuario.');
    // for (const role of user.roles ) {
    //   if ( validRoles.includes( role ) ) {
    //     return true;
    //   }
    // }
    
    // throw new ForbiddenException(
    //   `User ${ user.fullName } need a valid role: [${ validRoles }]`
    // );
  }
}


  // @Get('private')
  // @UseGuards( AuthGuard() )
  // testingPrivateRoute(
  //           @Req() request: Express.Request,
  //           @GetUser() user: Users,
  //           @GetUser('email') userEmail: string,
            
  //           @RawHeaders() rawHeaders: string[],
  //           @Headers() headers: IncomingHttpHeaders,
  // ) {
  //   return {
  //     ok: true,
  //     message: 'Hola Mundo Private',
  //     user,
  //     userEmail,
  //     rawHeaders,
  //     headers
  //   }
  // }


    // @SetMetadata('roles', ['admin','super-user'])

    // @Get('private2')
    // @RoleProtected( ValidRoles.superUser, ValidRoles.admin )
    // @UseGuards( AuthGuard(), UserRoleGuard )
    // privateRoute2(
    //   @GetUser() user: Users
    // ) {
  
    //   return {
    //     ok: true,
    //     user
    //   }
    // }
  
  
    // @Get('private3')
    // @Auth( ValidRoles.admin )
    // privateRoute3(
    //   @GetUser() user: Users
    // ) {
  
    //   return {
    //     ok: true,
    //     user
    //   }
    // }
