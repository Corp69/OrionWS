import { Controller, Get } from '@nestjs/common';

@Controller('cars')
export class CarsController {


    @Get()
    getAllCars(){
        console.log(" xxxx test ");
        
        return{ "id": 12 } 
    }
    



}
