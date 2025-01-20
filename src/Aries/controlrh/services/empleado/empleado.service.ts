import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from '@shared/dtos/Response.dto';
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';

@Injectable()
export class EmpleadoService {
  
  constructor( 
     private readonly dbConnectionService: DatabaseConnectionService
  ) {}

}
