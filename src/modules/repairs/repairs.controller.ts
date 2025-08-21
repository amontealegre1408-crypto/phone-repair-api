import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { RepairsService } from './repairs.service';
import { CreateRepairDto } from './dto/create-repair.dto';
import { UpdateRepairDto } from './dto/update-repair.dto';
import { RepairQueryDto } from './dto/repair-query.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../auth/enum/role.enum';

@ApiTags('Repairs')
@ApiBearerAuth()
@Controller({
  path: 'repairs',
  version: ['1'],
})
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN, UserRole.MANAGER)
export class RepairsController {
  constructor(private repairsService: RepairsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new repair for a phone' })
  @ApiResponse({ status: 201, description: 'Repair successfully created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async create(@Body() createRepairDto: CreateRepairDto) {
    return this.repairsService.create(createRepairDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all repairs with optional filters' })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['pending', 'in_progress', 'completed', 'delivered', 'cancelled'],
  })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({ name: 'phoneId', required: false, type: String })
  @ApiQuery({ name: 'customerId', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'List of repairs returned' })
  async findAll(@Query() queryDto: RepairQueryDto) {
    if (Object.keys(queryDto).length > 0) {
      return this.repairsService.findWithFilters(queryDto);
    }

    return await this.repairsService.findAllWithCount();

  }

  @Get('ordered-by-date')
  @ApiOperation({
    summary: 'Get all repairs ordered by date (most recent first)',
    description: 'Returns all repairs sorted by creation date, newest first',
  })
  @ApiResponse({ status: 200, description: 'Repairs sorted by date returned' })
  async findAllOrderedByDate() {
    return this.repairsService.findAllOrderedByDate();
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get repair statistics' })
  @ApiResponse({ status: 200, description: 'Repair statistics returned' })
  async getStatistics() {
    return this.repairsService.getRepairStatistics();
  }

  @Get('phone/:phoneId')
  @ApiOperation({ summary: 'Get all repairs for a specific phone' })
  @ApiParam({ name: 'phoneId', description: 'Phone ID (UUID)' })
  @ApiResponse({ status: 200, description: 'Repairs for given phone returned' })
  async findByPhoneId(@Param('phoneId', ParseUUIDPipe) phoneId: string) {
    return this.repairsService.findByPhoneId(phoneId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get repair by ID' })
  @ApiParam({ name: 'id', description: 'Repair ID (UUID)' })
  @ApiResponse({ status: 200, description: 'Repair found' })
  @ApiResponse({ status: 404, description: 'Repair not found' })
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.repairsService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update repair information' })
  @ApiParam({ name: 'id', description: 'Repair ID (UUID)' })
  @ApiResponse({ status: 200, description: 'Repair updated successfully' })
  @ApiResponse({ status: 404, description: 'Repair not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRepairDto: UpdateRepairDto,
  ) {
    return this.repairsService.update(id, updateRepairDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete repair' })
  @ApiParam({ name: 'id', description: 'Repair ID (UUID)' })
  @ApiResponse({ status: 200, description: 'Repair deleted successfully' })
  @ApiResponse({ status: 404, description: 'Repair not found' })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.repairsService.delete(id);
    return { message: 'Repair deleted successfully' };
  }
}
