import {Queue} from "bullmq";

const connection = {
  host: 'paybank-redis',
  port: 6379
}

const queueName = 'twoFactorQueue'

const queue = new Queue(queueName, {connection})

export const getJob = async () => {
  const jobs = await queue.getJobs()
  
  // fails if none records exist in Redis
  return jobs[0].data.code
}

export const cleanJobs = async () => {
  await queue.obliterate()
}