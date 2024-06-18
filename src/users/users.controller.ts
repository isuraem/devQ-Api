import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus, UseGuards, SetMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateNewUserDto } from './dto/create-new-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { PermissionsGuard } from 'src/authorization/permissions/permissions.guard';
import { Request } from 'express';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto): Promise<{ success: boolean, data?: User, error?: string }> {
    try {
      const user = await this.usersService.create(createUserDto);
      return { success: true, data: user };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<{ success: boolean, data?: User[], error?: string }> {
    try {
      const users = await this.usersService.findAll();
      return { success: true, data: users };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ success: boolean, data?: User, error?: string }> {
    try {
      const user = await this.usersService.findOne(+id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return { success: true, data: user };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch('update/:userId')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthorizationGuard, PermissionsGuard)
  @SetMetadata('permissions', ['manage:admin'])
  async update(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<{ success: boolean, data?: User, error?: string }> {
    try {
      const updatedUser = await this.usersService.update(+userId, updateUserDto);
      return { success: true, data: updatedUser };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ success: boolean, error?: string }> {
    try {
      await this.usersService.remove(+id);
      return { success: true };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  
  @UseGuards(AuthorizationGuard, PermissionsGuard)
  @SetMetadata('permissions', ['manage:recruiter'])
  @Post('find-by-email')
  async findByEmail(@Body() findUserByEmailDto: FindUserByEmailDto): Promise<User> {
    return this.usersService.findByEmail(findUserByEmailDto.email);
  }

  @Post('new-user')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthorizationGuard, PermissionsGuard)
  @SetMetadata('permissions', ['manage:admin'])
  async createNewUser(@Body() createNewUserDto: CreateNewUserDto): Promise<{ success: boolean, data?: User, error?: string }> {
    try {
      const user = await this.usersService.createNewUser(createNewUserDto);
      return { success: true, data: user };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('update/:userId')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthorizationGuard, PermissionsGuard)
  @SetMetadata('permissions', ['manage:recruiter'])
  async updateProfile(@Param('userId') userId: string, @Body() updateProfileDto: UpdateProfileDto): Promise<{ success: boolean, data?: User, error?: string }> {
    try {
      const updatedUser = await this.usersService.updateUserProfile(+userId, updateProfileDto);
      return { success: true, data: updatedUser };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // @UseGuards(AuthorizationGuard, PermissionsGuard)
  // @SetMetadata('permissions', ['manage:admin'])
  // @Post('find-by-email')
  // async findByEmail(@Body() findUserByEmailDto: FindUserByEmailDto, @Req() req: Request): Promise<User> {
  //   const userId = req.user.sub;
  //   console.log('Auth0 User ID:', userId); // You can log or use this user ID as needed
  //   return this.usersService.findByEmail(findUserByEmailDto.email);
  // }
}
