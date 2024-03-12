import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Peli } from "./entities/peli.entity";
import { Repository } from "typeorm";


@Injectable()
export class PendientesService {
  constructor(
    @InjectRepository(Peli)
    private readonly pelisRepository: Repository<Peli>
  ) {}

  async getPendientes(): Promise<Peli[]> {
    return await this.pelisRepository.find({ where: { pendiente: true } });
  }

  async addPendiente(id: number): Promise<Peli> {
    const peli = await this.pelisRepository.findOne({ where: { id: id } });
    if (!peli) {
      throw new NotFoundException('Película no encontrada.');
    }
    peli.pendiente = true;
    return await this.pelisRepository.save(peli);
  }

  async removePendiente(id: number): Promise<void> {
    const peli = await this.pelisRepository.findOne({ where: { id: id }});
    if (!peli) {
      throw new NotFoundException('Película no encontrada.');
    }
    peli.pendiente = false;
    await this.pelisRepository.save(peli);
  }
}