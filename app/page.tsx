"use client";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Job } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [pagination, setPagination] = useState({
    totalJobs: 0,
    totalPages: 1,
  });

  const fetchJobs = async (page: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/api/v1/jobs`,
        { params: { page, limit } }
      );
      setJobs(response.data.data.jobs);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const createJob = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/api/v1/jobs`
      );
      console.log("Job created:", response.data.jobId);
      fetchJobs(page);
    } catch (error) {
      console.error("Error creating job:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  const handleNextPage = () => {
    if (page < pagination.totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Job Queue</h1>

      <Button onClick={createJob} disabled={loading}>
        {loading ? "Loading..." : "Create New Job"}
      </Button>

      <div className="mt-8">
        {jobs.length > 0 ? (
          <>
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  status={job.status}
                  result={job?.result}
                />
              ))}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-between mt-4">
              <Button onClick={handlePrevPage} disabled={page === 1}>
                Previous
              </Button>
              <span>
                Page {page} of {pagination.totalPages}
              </span>
              <Button
                onClick={handleNextPage}
                disabled={page === pagination.totalPages}
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
}
