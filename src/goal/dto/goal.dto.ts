import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IGoalDTO {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    final_goal: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    current_goal: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    user_id: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    status: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    time_measure: string;
}