import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrthographyService } from '../services/Orthography.service';
import { OrthographyDto } from '../dtos/orthography.dto';


@ApiTags('OrionWS - OpenIA - ELA.')
@Controller('openia/ela')
export class OrthographyController {

  constructor(private readonly Service: OrthographyService ) {}
  

  @Post('orthography-check')
  orthographyCheck(
    @Body() orthographyDto: OrthographyDto,
  ) {
    return this.Service.orthographyCheck(orthographyDto);
  }

}
