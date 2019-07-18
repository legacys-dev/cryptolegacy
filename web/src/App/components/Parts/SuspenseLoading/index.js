import React, {Suspense} from 'react'
import Loading from './Loading'

const SuspenseLoading = ({children}) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}
export default SuspenseLoading
