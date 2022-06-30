import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config";
import { Cat }  from './interfaces/cat.interface'

@Injectable()
export class CatsService {
    constructor(private config: ConfigService) {}

    private readonly cats: Cat[] = [];

    create(cat: Cat) {
        this.cats.push(cat);
    }

    findAll(): Cat[] {
        return this.cats;
    }
}
