import { route } from '@orion-js/app'
import { getJobOutput } from 'app/helpers/awsGlacier'

route('/get-aws-job-output/:vaultName/:jobId', async function({
  params,
  query,
  pathname,
  request,
  headers,
  response,
  getBody
}) {
  const { vaultName, jobId } = params

  let result
  try {
    result = await getJobOutput({ vaultName, jobId })
  } catch (error) {
    console.log(error)
  }

  return result.body
})
