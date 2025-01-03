import { Controller } from '@nestjs/common';
import { ApiTags }    from '@nestjs/swagger';
import { Auth }       from 'src/auth/decorators';

@ApiTags('OrionWS - AriesERP - Modulo App.')
@Controller('arieserp/empresa')
@Auth()
export class EmpresaController {

    
}
