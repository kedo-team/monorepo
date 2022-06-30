import { Body, Controller, Get, Post, Header } from '@nestjs/common'
import { CreateCatDto } from './dto/create-cat.dto'
import { CatsService } from './cats.service'
import { Cat } from './interfaces/cat.interface'
import { AuthenticatedUser, Public } from 'nest-keycloak-connect'

@Controller('cats')
export class CatsController {

    constructor(private catsService: CatsService) {}

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto)
    }

    // @Public(true)
    @Get()
    // @Header('Cache-Control', 'none')
    // @Header('Access-Control-Allow-Origin', '*')
    // @Header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    // @Header('Access-Control-Allow-Headers', 'Content-Type, Accept')
    // @Header('anton', 'gondong')
    async findAll(): Promise<any> {
            return { 
                status: "ok2-11111"
            };
    }   
}