export interface ScheduleDTO {
  name: string;
  startDate: Date;
  endDate: Date;
  explanation: string;
}
export interface TeamScheduleDTO {
  teamId: number;
  teamname: string;
  schedules: ScheduleDTO[];
}

export interface AllScheSearchDTO {
  MySchedules: ScheduleDTO[];
  TeamSchedules: TeamScheduleDTO[];
}
