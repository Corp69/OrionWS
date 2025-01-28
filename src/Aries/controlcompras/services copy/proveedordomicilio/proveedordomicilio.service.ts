import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';

@Injectable()
export class ProveedorDomicilioService {
  
  constructor( 
     private readonly dbConnectionService: DatabaseConnectionService
  ) {}

  


}
