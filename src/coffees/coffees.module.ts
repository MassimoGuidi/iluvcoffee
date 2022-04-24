/* eslint-disable prettier/prettier */
import { Injectable, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../../src/events/entities/event.entity';
import { Connection } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeeBrandsFactory {
    create() {
        return ['nescafe', 'classic'];
    }
}

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]), ConfigModule],
    controllers: [CoffeesController],
    providers: [
        CoffeesService,
        CoffeeBrandsFactory,
        { 
            provide: COFFEE_BRANDS, 
            //useFactory: (brandsFactory: CoffeeBrandsFactory) => brandsFactory.create(),
            
            useFactory: async (connection: Connection) : Promise<string[]> => {
                const coffeeBrands = await Promise.resolve(['nescafe','classic']);
                console.log('[!] Async Factory');
                return coffeeBrands;
            },
            inject: [Connection]
        },
    ],
    exports: [CoffeesService],
})
export class CoffeesModule { }
