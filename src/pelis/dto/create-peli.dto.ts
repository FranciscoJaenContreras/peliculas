import { IsBoolean, IsNumber, IsString, Min, MinLength, isNumber, isString } from "class-validator";

export class CreatePeliDto {

    @IsString()
    @MinLength(1, { message: "El nombre no puede estar vacío" })
    nombre: string;
    
    @IsNumber()
    @Min(0, { message: "La duración debe ser positiva" }) 
    duracion: number;

    @IsString()
    genero: string;

    @IsBoolean()
    pendiente: boolean;
    
    @IsBoolean()
    favorita: boolean;
}
