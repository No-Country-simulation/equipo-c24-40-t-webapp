import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new service' })
  @ApiResponse({
    status: 201,
    description: 'Service successfully created',
    type: CreateServiceDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all services' })
  @ApiResponse({
    status: 200,
    description: 'List of all services',
    type: [CreateServiceDto],
  })
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a service by ID' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({
    status: 200,
    description: 'Service found',
    type: CreateServiceDto,
  })
  @ApiResponse({ status: 404, description: 'Service not found' })
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({
    status: 200,
    description: 'Service updated successfully',
    type: CreateServiceDto,
  })
  @ApiResponse({ status: 404, description: 'Service not found' })
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({ status: 200, description: 'Service deleted successfully' })
  @ApiResponse({ status: 404, description: 'Service not found' })
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}
