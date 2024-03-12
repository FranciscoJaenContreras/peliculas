import { PartialType } from '@nestjs/mapped-types';
import { CreatePeliDto } from './create-peli.dto';
import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class UpdatePeliDto {
    @IsString()
    @MinLength(4)
    nombre:string;

    @IsNumber()
    @Min(0,{message:'La duracion no puede ser negativa'})
    duracion:number;

    @IsString()
    genero: string;
}
