export class Task {
  id: number;
  title: string;
  description: string;
  creationDate: Date;
  startDate: Date;
  endDate: Date;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
    this.creationDate = new Date();
  }
}
