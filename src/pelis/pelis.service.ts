import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePeliDto } from './dto/create-peli.dto';
import { UpdatePeliDto } from './dto/update-peli.dto';
import { Repository } from 'typeorm';
import { Peli } from './entities/peli.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PelisService {

  constructor(
    @InjectRepository(Peli)
    private readonly pelisRepository: Repository<Peli>
  ) { }

  async create(createPeliDto: CreatePeliDto) {
    try{
    const newPeli = this.pelisRepository.create(createPeliDto);
    return await this.pelisRepository.save(newPeli);
  } catch (error) {
    throw new ConflictException('No se puedo crear la película es posible que ya exista una peli con este nombre')
  }
}

  async findAll() {
    try {
    return await this.pelisRepository.find();
    } catch (error) {
      throw new ConflictException('No se pudo encontrar ninguna peli');
    }
  }

  async findOne(id: number) {
    try {
    return await this.pelisRepository.findOneBy({id});
    } catch (error) {
      throw new ConflictException('No se pudo encontrar esta peli');
    }
  }

  async update(id: number, updatePeliDto: UpdatePeliDto) {

    return await this.pelisRepository.update(id, updatePeliDto);
  }

  async remove(id: number) {
    try {
      const result = await this.pelisRepository.softDelete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Película no encontrada.');
      }
      return { success: true };
    } catch (error) {
      throw new NotFoundException('No se pudo eliminar la película.');
    }
  }

  async findByGenre(genero: string) {
    try {
      return await this.pelisRepository.find({ where: {genero}});
    } catch (error) {
      throw new NotFoundException('No se pudieron encontrar películas con este género.');
    }
  }

  async findByName(nombre: string) {
    try {
      return await this.pelisRepository.find({ where: {nombre}});
    } catch (error) {
      throw new NotFoundException('No se pudo encontrar ninguna película con este nombre.');
    }
  }
}
