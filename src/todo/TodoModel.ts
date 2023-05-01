import { TodoStatusEnum } from '../common/Constants&errorMessages';

export class TodoModel {
  id: string;
  name: string;
  description: string;
  date: Date;
  status: string;
  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.date = new Date(Date.now());
    this.name = name;
    this.description = description;
    this.status = TodoStatusEnum.waiting;
  }
}
