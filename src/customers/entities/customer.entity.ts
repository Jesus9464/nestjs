// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Entity();
// export class Customer {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'varchar', length: 255 })
//   name: string;

//   @Column({ type: 'varchar', length: 255 })
//   lastName: string;

//   @Column({ type: 'number' })
//   phone: string;
// }

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  lastName: string;

  @Column({ type: 'varchar' })
  phone: string;
}
