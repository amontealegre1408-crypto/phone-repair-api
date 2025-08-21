import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { PhonesService } from './phones.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../auth/enum/role.enum';

@ApiTags('Phones')
@ApiBearerAuth()
@Controller({
  path: 'phones',
  version: ['1'],
})
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN, UserRole.MANAGER)
export class PhonesController {
  constructor(private phonesService: PhonesService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new phone for a customer' })
  @ApiResponse({ status: 201, description: 'Phone successfully created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async create(@Body() createPhoneDto: CreatePhoneDto) {
    return this.phonesService.create(createPhoneDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all phones' })
  @ApiResponse({ status: 200, description: 'List of phones returned' })
  async findAll() {
    return this.phonesService.findAll();
  }

  @Get('customer/:customerId')
  @ApiOperation({ summary: 'Get all phones for a specific customer' })
  @ApiResponse({ status: 200, description: 'List of customer phones returned' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async findByCustomerId(
    @Param('customerId', ParseUUIDPipe) customerId: string,
  ) {
    return this.phonesService.findByCustomerId(customerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get phone by ID' })
  @ApiResponse({ status: 200, description: 'Phone found' })
  @ApiResponse({ status: 404, description: 'Phone not found' })
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.phonesService.findById(id);
  }

  @Get(':id/repairs')
  @ApiOperation({ summary: 'Get phone with all its repairs' })
  @ApiResponse({ status: 200, description: 'Phone with repairs returned' })
  async findWithRepairs(@Param('id', ParseUUIDPipe) id: string) {
    return this.phonesService.findWithRepairs(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update phone information' })
  @ApiResponse({ status: 200, description: 'Phone updated successfully' })
  @ApiResponse({ status: 404, description: 'Phone not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePhoneDto: UpdatePhoneDto,
  ) {
    return this.phonesService.update(id, updatePhoneDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete phone' })
  @ApiResponse({ status: 200, description: 'Phone deleted successfully' })
  @ApiResponse({ status: 404, description: 'Phone not found' })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.phonesService.delete(id);
    return { message: 'Phone deleted successfully' };
  }
}
