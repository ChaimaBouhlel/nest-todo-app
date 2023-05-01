import { Global, Module } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
export const TOKENS = {
  uuid: 'UUID',
};
const uuidProvider = {
  useValue: uuidv4,
  provide: TOKENS.uuid,
};
@Global()
@Module({
  providers: [uuidProvider],
  exports: [uuidProvider],
})
export class CommonModule {}
