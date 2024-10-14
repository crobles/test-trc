import { Module } from '@nestjs/common';
import { CascadeModule } from './cascade/cascade.module';

@Module({
  imports: [CascadeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
