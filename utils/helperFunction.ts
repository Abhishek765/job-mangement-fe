import { Job, TApiPollingParameters } from "@/types";
import axios from "axios";

export const pollApi = async ({
  apiEndpoint,
  successResponse,
  failureResponse,
  pollingInterval,
  maxPollingDuration,
}: TApiPollingParameters): Promise<Job | null> => {
  const startTime = Date.now();
  let timerId: NodeJS.Timeout;
  const makeRequest = async (): Promise<Job | null> => {
    try {
      const response = await axios.get(apiEndpoint);
      const data = await response.data.data;
      // stop polling cases
      if (data.status === failureResponse) {
        console.log("Failure response received:");
        if (timerId) {
          clearTimeout(timerId);
        }
        return data;
      }
      if (data.status === successResponse) {
        console.log("Success response received:");
        if (timerId) {
          clearTimeout(timerId);
        }
        return data;
      }

      const elapsedTime = Date.now() - startTime;

      if (elapsedTime < maxPollingDuration) {
        return new Promise((resolve) => {
          timerId = setTimeout(async () => {
            const result = await makeRequest();
            resolve(result);
          }, pollingInterval);
        });
      } else {
        console.log("Maximum polling duration reached. Stopping polling.");
        return null; // Max duration reached, stop polling
      }
    } catch (error) {
      console.error("Error making API request:", error);
      const elapsedTime = Date.now() - startTime;

      if (elapsedTime < maxPollingDuration) {
        return new Promise((resolve) => {
          timerId = setTimeout(async () => {
            const result = await makeRequest();
            resolve(result);
          }, pollingInterval);
        });
      } else {
        console.log("Maximum polling duration reached. Stopping polling.");
        return null;
      }
    }
  };

  return makeRequest();
};
