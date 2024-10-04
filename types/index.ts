export type Job = {
  id: string;
  status: "pending" | "resolved" | "failed";
  result?: string[];
};

export type TApiPollingParameters = {
  apiEndpoint: string;
  successResponse: Job["status"];
  failureResponse: Job["status"];
  pollingInterval: number;
  maxPollingDuration: number;
};
