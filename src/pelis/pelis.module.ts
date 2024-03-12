import { Module } from '@nestjs/common';
import { PelisService } from './pelis.service';
import { PelisController } from './pelis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Peli } from './entities/peli.entity';
import { FavoritasService } from './favoritas.service';
import { PendientesService } from './pendientes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Peli])],
  controllers: [PelisController],
  providers: [PelisService, FavoritasService, PendientesService],
})
export class PelisModule {}
