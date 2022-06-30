import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}