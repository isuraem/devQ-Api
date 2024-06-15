import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrivateActivityService } from './private-activity.service';
import { CreatePrivateActivityDto } from './dto/create-private-activity.dto';
import { UpdatePrivateActivityDto } from './dto/update-private-activity.dto';

@Controller('private-activity')
export class PrivateActivityController {
  constructor(private readonly privateActivityService: PrivateActivityService) {}

  @Post()
  create(@Body() createPrivateActivityDto: CreatePrivateActivityDto) {
    return this.privateActivityService.create(createPrivateActivityDto);
  }

  @Get()
  findAll() {
    return this.privateActivityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.privateActivityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrivateActivityDto: UpdatePrivateActivityDto) {
    return this.privateActivityService.update(+id, updatePrivateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.privateActivityService.remove(+id);
  }
}
