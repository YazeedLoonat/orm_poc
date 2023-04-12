export type ValidationReturnType = {
  message: string;
  runTimeForGatheringData: number;
  cpuUsagePercentChange?: cpuUsagePercentChange;
  memoryUsagePercentChange?: memoryUsagePercentChange;
};

type cpuUsagePercentChange = {
  user: number;
  system: number;
};

type memoryUsagePercentChange = {
  rss: number;
  heapTotal: number;
  heapUsed: number;
  external: number;
  arrayBuffers: number;
};
