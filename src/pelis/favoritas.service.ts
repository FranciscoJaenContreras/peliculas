import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Peli } from "./entities/peli.entity";
import { Repository } from "typeorm";



@Injectable()
export class FavoritasService {
  constructor(
    @InjectRepository(Peli)
    private readonly pelisRepository: Repository<Peli>
  ) {}

  async getFavoritas(): Promise<Peli[]> {
    return await this.pelisRepository.find({ where: { favorita: true } });
  }

  async addFavorita(id: number): Promise<Peli> {
    const peli = await this.pelisRepository.findOne({where: { id: id }});
    if (!peli) {
      throw new NotFoundException('Película no encontrada.');
    }
    peli.favorita = true;
    return await this.pelisRepository.save(peli);
  }

  async removeFavorita(id: number): Promise<void> {
    const peli = await this.pelisRepository.findOne({where: { id: id }});
    if (!peli) {
      throw new NotFoundException('Película no encontrada.');
    }
    peli.favorita = false;
    await this.pelisRepository.save(peli);
  }
}