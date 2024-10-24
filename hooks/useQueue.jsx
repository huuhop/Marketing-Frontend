import { useEffect, useMemo, useReducer, useState } from "react";
import { sleep } from "~/utils/web";
import Axios from "axios";

const ActionType = {
  ADD: "add",
  SHIFT: "shift",
  EMPTY: "empty",
  REMOVE: "remove",
};

const jobsReducer = (jobs, action) => {
  switch (action.type) {
    case ActionType.ADD: {
      return [...jobs, action.job];
    }
    case ActionType.SHIFT: {
      const next = [...jobs];
      next.shift();
      return next;
    }
    case ActionType.EMPTY: {
      return [];
    }
    case ActionType.REMOVE: {
      return [...jobs].filter((job) => job.name !== action.name);
    }
    default: {
      return jobs;
    }
  }
};

const queueCancelControllers = {};

const useQueue = ({
  delayExecJob = null,
  taskSuccessCallback = ({ name, data }) => {},
}) => {
  const [jobs, dispatch] = useReducer(jobsReducer, []);
  const [currentJob, setCurrentJob] = useState(null);
  const [isExecutingTask, setIsExecutingTask] = useState(false);

  useEffect(() => {
    const execFunc = async () => {
      if (jobs.length > 0 && !isExecutingTask) {
        const job = jobs[0];
        try {
          setIsExecutingTask(true);
          setCurrentJob(job);
          const task = job.task ? job.task : () => {};
          console.info(`Task: ${job.name} is executing!`);

          queueCancelControllers[job.name] = Axios.CancelToken.source();
          const responseTask = await task(queueCancelControllers[job.name]);

          taskSuccessCallback({
            name: job.name ?? null,
            data: responseTask,
            metadata: job?.metadata,
          });
          console.info(`Task: ${job.name} is finished!`);

          if (delayExecJob !== null) {
            await sleep(delayExecJob);
          }
        } catch (err) {
          console.info(`Queue error`, { job, err: err.message });
        } finally {
          dispatch({ type: ActionType.SHIFT });
          setIsExecutingTask(false);
          setCurrentJob(null);
          queueCancelControllers[job.name] = undefined;
        }
      }
    };

    execFunc();
  }, [jobs, isExecutingTask, delayExecJob]);

  const taskName = currentJob?.name ?? null;

  const listTaskName = useMemo(() => {
    return jobs.map((job) => job.name);
  }, [jobs]);

  const addJob = async (job) => {
    dispatch({ type: ActionType.ADD, job });
  };

  const cancelJob = (name) => {
    if (queueCancelControllers[name] && name === currentJob?.name) {
      queueCancelControllers[name].cancel();
    } else {
      dispatch({ type: ActionType.REMOVE, name });
    }
  };

  const empty = async () => {
    dispatch({ type: ActionType.EMPTY });
  };

  return {
    addJob,
    empty,
    isExecutingTask,
    taskName,
    listTaskName,
    currentJob,
    jobs,
    cancelJob,
  };
};

export default useQueue;
