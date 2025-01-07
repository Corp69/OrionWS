import { Injectable } from '@nestjs/common';

import { MailerService as MailerMain } from '@nestjs-modules/mailer';
import { CreateEccsEmpresasDto } from 'src/auth/dto';
import { DataSource } from 'typeorm';
import { ResponseDto } from '@shared/dtos/Response.dto';

@Injectable()
export class SpaceService {

    constructor(   
        private readonly mailerMain: MailerMain,
         private readonly dataSource: DataSource,
     ){

    }


}
