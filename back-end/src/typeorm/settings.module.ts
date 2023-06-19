import { Entity } from 'typeorm/decorator/entity/Entity';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Movie } from './movie.entity';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';

@Entity()
export class Settings {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => Movie, (movie) => movie.settings)
  featuredMovie: Movie;
}
