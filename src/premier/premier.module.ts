import { Get, Module } from '@nestjs/common';
import { PremierController } from './premier.controller';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [PremierController],
  providers: [CommonModule],
})
export class PremierModule {
  // This is the constructor for the PremierModule class.
}
