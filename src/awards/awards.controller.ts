import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Rol } from 'src/decorators/rol.decorator';
import { JwtGuardGuard } from 'src/guards/jwt-guard.guard';
import { RolesGuardGuard } from 'src/guards/roles-guard.guard';
import { AwardsService } from './awards.service';
import { CreateAwardDto } from './dto/create-award.dto';
import { UpdateAwardDto } from './dto/update-award.dto';

@ApiTags('awards')
@UseGuards(JwtGuardGuard, RolesGuardGuard)
@Controller('awards')
export class AwardsController {
  constructor(private readonly awardsService: AwardsService) {}

  @ApiBearerAuth()
  @Post()
  @HttpCode(201)
  @Rol(['admin'])
  create(@Body() createAwardDto: CreateAwardDto) {
    return this.awardsService.create(createAwardDto);
  }

  @Get()
  @HttpCode(200)
  @Rol(['manager', 'admin'])
  findAll() {
    return this.awardsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @Rol(['manager', 'admin'])
  findOne(@Param('id') id: string) {
    return this.awardsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  @Rol(['admin'])
  update(@Param('id') id: string, @Body() updateAwardDto: UpdateAwardDto) {
    return this.awardsService.update(id, updateAwardDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @Rol(['manager', 'admin'])
  remove(@Param('id') id: string) {
    return this.awardsService.remove(id);
  }
}
