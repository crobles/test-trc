import { Controller, Get } from '@nestjs/common';
import { NodeCascadeProcessingDataUseCase } from '../../application/node-cascade-processing-data.use-case';

@Controller('/node-tree-backend/v1/node')
export class CascadeController {
  constructor(
    private readonly nodeCascadeProcessingDataUseCase: NodeCascadeProcessingDataUseCase,
  ) {}

  @Get('/cascade')
  async nodeCascadeProcessingData() {
    const functionName = 'nodeCascadeProcessingData';

    console.info(`in function ${functionName} ---> processing data...`);

    const response = await this.nodeCascadeProcessingDataUseCase.run();

    return response;
  }
}
