export interface ScheduleDTO {
  [x: string]: any;
  name: string;
  startDate: Date;
  endDate: Date;
  explanation: string;
}
export interface TeamScheduleDTO {
  [x: string]: any;
  teamId: number;
  teamname: string;
  schedules: ScheduleDTO[];
}

export interface AllScheSearchDTO {
  [x: string]: any;
  MySchedules: ScheduleDTO[];
  TeamSchedules: TeamScheduleDTO[];
}
