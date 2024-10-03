import { Job } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { pollApi } from "@/utils/helperFunction";

type JobCardProps = Job;

const successResponse: Job["status"] = "resolved";
const pollingInterval = 5000; // 5 seconds
const maxPollingDuration = 300000; // 300 seconds (5 minutes)

const JobCard = ({ id, status, result = [] }: JobCardProps) => {
  const [isImageVisible, setIsImageVisible] = useState<boolean>(false);
  const [currJobStatus, setCurrJobStatus] = useState<Job["status"]>(status);
  const [currJobResult, setCurrJobResult] = useState<string[]>(result);

  const pollApiAndUpdateJobStatus = useCallback(async () => {
    const data = await pollApi({
      apiEndpoint: `${process.env.NEXT_PUBLIC_SERVER}/api/v1/jobs/${id}`,
      successResponse,
      pollingInterval,
      maxPollingDuration,
    });
    if (data) {
      setCurrJobStatus(data.status);
      setCurrJobResult(data.result!);
    }
  }, [id]);

  useEffect(() => {
    if (currJobStatus === "pending") {
      pollApiAndUpdateJobStatus();
    }
  }, [currJobStatus, pollApiAndUpdateJobStatus]);

  return (
    <div className="border p-4 rounded-md flex md:flex-row flex-col justify-between items-center gap-4">
      <div className="md:text-left text-center">
        <p className="font-bold">Job ID: {id}</p>
        <p>Status: {currJobStatus}</p>
      </div>
      <div className="flex flex-col items-center">
        {currJobStatus === "resolved" ? (
          <div className="flex md:flex-row flex-col gap-2">
            <Button onClick={() => setIsImageVisible(true)}>View Image</Button>
            <Button onClick={() => setIsImageVisible(false)}>Hide Image</Button>
          </div>
        ) : (
          <p className="text-black">Loading...</p>
        )}
        {currJobStatus === "resolved" &&
          isImageVisible &&
          currJobResult.length > 0 && (
            <div className="relative w-44 h-44 overflow-hidden">
              <Image src={currJobResult[0]} alt={id} fill objectFit="contain" />
            </div>
          )}
      </div>
    </div>
  );
};

export default JobCard;
