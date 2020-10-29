import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';
import Image from './Image';

@Entity('orphanages')
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @Column()
  @IsNotEmpty()
  latitude: number;

  @Column()
  @IsNotEmpty()
  longitude: number;

  @Column()
  @IsNotEmpty()
  @MaxLength(300)
  about: string;

  @Column()
  @IsNotEmpty()
  @MaxLength(100)
  instructions: string;

  @Column()
  @IsNotEmpty()
  @MaxLength(30)
  opening_hours: string;

  @Column()
  @IsNotEmpty()
  open_on_weekends: boolean;

  @OneToMany(() => Image, image => image.orphanage, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'orphanage_id' })
  images: Image[];
}
