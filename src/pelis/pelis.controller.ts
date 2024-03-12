import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { PelisService } from './pelis.service';
import { CreatePeliDto } from './dto/create-peli.dto';
import { UpdatePeliDto } from './dto/update-peli.dto';
import { FavoritasService } from './favoritas.service';
import { PendientesService } from './pendientes.service';

@Controller('pelis')
export class PelisController {
  constructor(private readonly pelisService: PelisService,
    private readonly favoritasService: FavoritasService,
    private readonly pendientesService: PendientesService 
    ) {}

  @Post()
  create(@Body() createPeliDto: CreatePeliDto) {
    return this.pelisService.create(createPeliDto);
  }

  @Get()
  findAll() {
    return this.pelisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pelisService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePeliDto: UpdatePeliDto) {
    return this.pelisService.update(id, updatePeliDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.pelisService.remove(id);
  }

  @Get('genero/:genero')
  async findByGenre(@Param('genero') genero: string) {
    const pelis = await this.pelisService.findByGenre(genero);
    if (!pelis || pelis.length === 0) {
      throw new NotFoundException('No se encontraron películas para el género proporcionado.');
    }
    return pelis;
  }

  @Get('/nombre/:nombre')
async findByName(@Param('nombre') nombre: string) {
  const pelis = await this.pelisService.findByName(nombre);
  if (!pelis || pelis.length === 0) {
    throw new NotFoundException('No se encontraron películas para el nombre proporcionado.');
  }
  return pelis;
}

@Get('favoritas')
async getFavoritas() {
  return await this.favoritasService.getFavoritas();
}

@Post('favoritas/:id')
async addFavorita(@Param('id') id: number) {
  return await this.favoritasService.addFavorita(id);
}

@Delete('favoritas/:id')
async removeFavorita(@Param('id') id: number) {
  return await this.favoritasService.removeFavorita(id);
}

@Get('pendientes')
async getPendientes() {
  return await this.pendientesService.getPendientes();
}

@Post('pendientes/:id')
async addPendiente(@Param('id') id: number) {
  return await this.pendientesService.addPendiente(id);
}

@Delete('pendientes/:id')
async removePendiente(@Param('id') id: number) {
  return await this.pendientesService.removePendiente(id);
}

}
