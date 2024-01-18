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
export interface TeamScheduleDTO {
  teamId: number;
  teamname: string;
  isHide: boolean;
  color: string;
  schedules: ScheduleDTO[];
}
