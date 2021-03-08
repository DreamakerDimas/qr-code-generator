import { type } from 'node:os';
import { User } from 'src/users/users.entity';
import { Column, Entity, PrimaryColumn, ManyToOne } from 'typeorm';

@Entity()
export class Links {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  filename: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  fileUrl: string;

  @Column()
  innerUrl: string;

  @Column()
  outerUrl: string;

  @ManyToOne((type) => User, (user) => user.id)
  userId: string;
}
