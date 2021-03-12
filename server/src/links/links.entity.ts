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

  @ManyToOne((type) => User, (user) => user.id, { onDelete: 'CASCADE' })
  userId: string;
  // https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md#joining-relations

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
