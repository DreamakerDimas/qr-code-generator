import { User } from 'src/users/users.entity';
import { Column, Entity, PrimaryColumn, ManyToOne } from 'typeorm';

@Entity()
export class Links {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  fileUrl: string;

  @ManyToOne((type) => User, (user) => user.id)
  userId: string;
}
