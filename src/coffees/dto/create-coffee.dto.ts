/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, isString } from 'class-validator';

export class CreateCoffeeDto {
    @ApiProperty({description: 'The name of the coffee'})
    @IsString()
    readonly name: string;
    @ApiProperty({description: 'The brand of the Coffee'})
    @IsString()
    readonly brand: string;
    @ApiProperty({example: ['vanilla','classic']})
    @IsString({ each: true })
    readonly flavors: string[];
}
