import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class DatesCRD {
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn({ update: false })
  createdAt: Date;
}
