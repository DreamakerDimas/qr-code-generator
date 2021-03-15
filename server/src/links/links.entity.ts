import { type } from 'node:os';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  PrimaryColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Links {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  filename: string; // path to bucket file

  @Column({ default: true })
  isActive: boolean;

  @Column()
  fileUrl: string; // full URL path

  @Column()
  innerUrl: string;

  @Column()
  outerUrl: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne((type) => User, (user) => user.links, { onDelete: 'CASCADE' })
  user: User;
}
