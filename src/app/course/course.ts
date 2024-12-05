export class Course {
  id: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  teacherId: string;

  constructor(
    id: number,
    title: string,
    description: string,
    startTime: Date,
    endTime: Date,
    teacherId: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;
    this.teacherId = teacherId;
  }
}
