export interface AllScheSearchDTO {
  [x: string]: any;
  mySchedules: ScheduleDTO[];
  teamSchedules: TeamScheduleDTO[];
}

export interface AllScheSearchDTO {
  mySchedules: ScheduleDTO[];
  teamSchedules: TeamScheduleDTO[];
}

interface ScheduleDTO {
  scheId: number;
  name: string;
  startTime: Date;
  endTime: Date;
  explanation: string;
}
interface TeamScheduleDTO {
  teamId: number;
  teamname: string;
  isHide: boolean;
  color: string;
  schedules: ScheduleDTO[];
}
