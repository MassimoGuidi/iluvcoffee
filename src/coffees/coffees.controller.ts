/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    SetMetadata,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { Protocol } from '../../src/common/decorators/protocol.decorators';
import { Public } from '../../src/common/decorators/public.decorator';
import { PaginationQueryDto } from '../../src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeeService: CoffeesService) { }

    @ApiForbiddenResponse({description: 'Forbidden.'})
    @Public()
    @Get()
    async findAll(@Protocol('https') protocol: string, @Query() paginationQuery: PaginationQueryDto) {
        console.log(protocol);
        //await new Promise(resolve => setTimeout(resolve, 5000));
        //const { limit, offset } = paginationQuery;
        return this.coffeeService.findAll(paginationQuery);
        //return `This action returns all the coffees... Limit: ${limit}, Offset: ${offset}`;
    }
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        console.log(id);
        return this.coffeeService.findOne('' + id);
        //return `This action returns #${id} coffee...`;
    }
    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        console.log(createCoffeeDto instanceof CreateCoffeeDto);
        return this.coffeeService.create(createCoffeeDto);
        //return body;
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeeService.update(id, updateCoffeeDto);
        //return `This action updates #${id} coffee...`;
    }
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeeService.remove(id);
        //return `This action removes #${id} coffee...`;
    }
}
