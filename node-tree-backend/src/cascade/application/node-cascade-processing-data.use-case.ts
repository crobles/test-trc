import { Injectable } from '@nestjs/common';
import { UseCase } from '../../shared/interfaces/use-case.interface';

@Injectable()
export class NodeCascadeProcessingDataUseCase implements UseCase {
  async run(): Promise<any> {
    return true;
  }
}
