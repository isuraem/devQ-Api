import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicActivityService } from './public-activity.service';
import { CreatePublicActivityDto } from './dto/create-public-activity.dto';
import { UpdatePublicActivityDto } from './dto/update-public-activity.dto';

@Controller('public-activity')
export class PublicActivityController {
  constructor(private readonly publicActivityService: PublicActivityService) {}

  @Post()
  create(@Body() createPublicActivityDto: CreatePublicActivityDto) {
    return this.publicActivityService.create(createPublicActivityDto);
  }

  @Get()
  findAll() {
    return this.publicActivityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicActivityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicActivityDto: UpdatePublicActivityDto) {
    return this.publicActivityService.update(+id, updatePublicActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicActivityService.remove(+id);
  }
}
