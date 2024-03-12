import { Module } from '@nestjs/common';
import { PelisModule } from './pelis/pelis.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PelisModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5436,
      username: 'postgres',
      password: 'postgres',
      database: 'db_crud',
      autoLoadEntities: true,
      synchronize: true
    }),
  ],
})
export class AppModule {}
