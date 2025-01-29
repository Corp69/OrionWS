import { Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { ClienteDomicilioService } from '../../services/clientedomicilio/clientedomicilio.service';


@ApiTags('OrionWS - AriesERP - Modulo Ventas.')
@Controller('arieserp/clientedomicilio')
@Auth()
export class ClientedomicilioController {

    constructor(private readonly Service: ClienteDomicilioService ) {}
    

}
