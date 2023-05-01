import { Controller, Delete, Get, Patch, Post, Put } from "@nestjs/common";

@Controller('premier')
export class PremierController {
  @Get()
  getHello(): string {
    return 'Hello World From Premier with get!';
  }
  @Post()
  postHello(): string {
    return 'Hello World From Premier with post!';
  }
  @Delete()
  deleteHello(): string {
    return 'Hello World From Premier with delete!';
  }
  @Put()
  putHello(): string {
    return 'Hello World From Premier with put!';
  }
  @Patch()
  patchHello(): string {
    return 'Hello World From Premier with patch!';
  }
}
