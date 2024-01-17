/**
 * @interface ScheType
 * @property {number} scheId - 스케쥴 고유 번호
 * @property {number} teamId - 스케쥴이 속한 팀 고유 번호
 * @property {string} name - 스케쥴 이름
 * @property {Date} startDate - 스케쥴 시작 일시
 * @property {Date} endDate - 스케쥴 종료 일시
 * @property {string} explanation - 스케쥴 설명
 * @property {string} color - 팀 색상, 캘린더 스케쥴 좌측에 표시될 색깔
 *
 * @interface CalendarProps
 * @property {void function(SCheType)} onClick - 캘린더 클릭 시 실행할 함수
 * @property {string} height - 캘린더 높이 / px, vh, % 등의 단위를 포함하므로 string으로 정의
 * @property {string} width - 캘린더 너비
 * @property {ScheType[]} schedules - 캘린더에 표시할 스케쥴들
 */

export interface ScheType {
  scheId: number;
  teamId: number;
  name: string;
  startDate: Date;
  endDate: Date;
  explanation: string;
  color: string; // 개인 일정의 경우 color를 빈 문자열로 설정하시면 됩니다.
}

export interface CalendarProps {
  onClick: (sche: ScheType) => void;
  height: string;
  width: string;
  schedules: ScheType[];
}
