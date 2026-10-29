type Batch = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  format: "Online" | "Classroom" | "1-on-1";
  mode: string;
  seats: number;
  totalSeats: number;
  price: number;
  currency: string;
  location: string;
  gtr: boolean;
  isWeekend: boolean;
  days: string[];
  time: string;
  hoursPerDay: number;
};

function getDayNames(startDate: string, endDate: string): string[] {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days: string[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  const current = new Date(start);
  while (current <= end) {
    days.push(dayNames[current.getDay()]);
    current.setDate(current.getDate() + 1);
  }
  return [...new Set(days)]; // unique days
}

function seededRandom(seed: number): number {
  // Deterministic "random" based on batch ID so seats don't change on refresh
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export function transformRmsToBatches(
  onlineSchedule: any[],
  classroomSchedule: any[],
  pricing: { PS_Fee?: number; ILO_fee_GT?: number; ILO_Fee_1On1?: number } | null
): Batch[] {
  const batches: Batch[] = [];
  let id = 1;

  const onlinePrice = pricing?.ILO_fee_GT || pricing?.PS_Fee || 42500;
  const onlineCurrency = pricing?.ILO_fee_GT ? "USD" : "INR";

  // Online batches
  for (const rm of onlineSchedule) {
    const startDate = rm.StartDate ? new Date(rm.StartDate).toISOString().split('T')[0] : '';
    const endDate = rm.EndDate ? new Date(rm.EndDate).toISOString().split('T')[0] : '';
    if (!startDate || !endDate) continue;

    const startTime = rm.StartTime?.toString().substring(0, 5) || '09:00';
    const endTime = rm.EndTime?.toString().substring(0, 5) || '17:00';
    const hours = rm.ToatlHour || rm.TotalHour || '08:00';
    const hoursNum = parseInt(hours) || 8;
    const modeStr = hoursNum <= 4 ? `${hoursNum} Hrs/Day` : `${hoursNum} Hrs/Day`;
    const isWeekend = String(rm.Mode || '').toLowerCase().includes('weekend');
    const batchId = rm.TrainerBatchId || id;
    const seatSeed = seededRandom(batchId);
    const seats = Math.floor(seatSeed * 10) + 3; // 3-12 seats

    batches.push({
      id: id++,
      title: `AZ-104 Online ${hoursNum}h`,
      startDate,
      endDate,
      format: "Online",
      mode: modeStr,
      seats,
      totalSeats: 15,
      price: onlinePrice,
      currency: onlineCurrency,
      location: "Virtual",
      gtr: rm.Type === 1 || rm.Type === '1',
      isWeekend,
      days: getDayNames(startDate, endDate),
      time: `${startTime} – ${endTime}`,
      hoursPerDay: hoursNum,
    });
  }

  // Classroom batches
  for (const rm of classroomSchedule) {
    const startDate = rm.StartDate ? new Date(rm.StartDate).toISOString().split('T')[0] : '';
    const endDate = rm.EndDate ? new Date(rm.EndDate).toISOString().split('T')[0] : '';
    if (!startDate || !endDate) continue;

    const startTime = rm.StartTime?.toString().substring(0, 5) || '09:00';
    const endTime = rm.EndTime?.toString().substring(0, 5) || '17:00';
    const location = rm.Location || 'Classroom';
    const price = rm.CoursePrice || pricing?.PS_Fee || 92500;
    const currency = rm.Currency || 'INR';
    const batchId = rm.TrainerBatchId || id;
    const seatSeed = seededRandom(batchId);
    const seats = Math.floor(seatSeed * 8) + 2; // 2-9 seats

    batches.push({
      id: id++,
      title: `AZ-104 ${location}`,
      startDate,
      endDate,
      format: "Classroom",
      mode: "8 Hrs/Day",
      seats,
      totalSeats: 12,
      price: typeof price === 'number' ? price : parseFloat(price) || 92500,
      currency: currency === '1' ? 'INR' : currency === '2' ? 'USD' : currency,
      location,
      gtr: true,
      isWeekend: false,
      days: getDayNames(startDate, endDate),
      time: `${startTime} – ${endTime}`,
      hoursPerDay: 8,
    });
  }

  return batches;
}
