import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CascadeController } from './infrastructure/api/cascade.controller';
import { NodeCascadeProcessingDataUseCase } from './application/node-cascade-processing-data.use-case';

@Module({
  imports: [HttpModule],
  controllers: [CascadeController],
  providers: [NodeCascadeProcessingDataUseCase],
})
export class CascadeModule {}
