import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn({ comment: '主键id' })
  id: number

  @CreateDateColumn({ comment: '创建时间' })
  createdAt: Date

  @UpdateDateColumn({ nullable: true, comment: '更新时间' })
  updatedAt: Date

  @DeleteDateColumn({ nullable: true, comment: '删除时间' })
  deletedAt?: Date
}
