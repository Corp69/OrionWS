import { Injectable } from '@nestjs/common';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';

@Injectable()
export class EmpresaService {


      constructor( 
         private readonly dbConnectionService: DatabaseConnectionService
      ) {}


}
