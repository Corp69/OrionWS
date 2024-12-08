import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class TokenDTO {

    @ApiProperty({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMzNjI2OTA3LCJleHAiOjE3MzM2MzQxMDd9.OqhqRvqos-rBga4j94lirFXMUFWZKK5MXCQor2yCvps0",
        description: 'Token: Token para acceder a Orion WS.',
        uniqueItems: true
    })
    @IsString()
    token: string;
    
}