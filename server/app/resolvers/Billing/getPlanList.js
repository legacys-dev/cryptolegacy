import {resolver} from '@orion-js/app'
import {getPlans} from 'app/helpers/qvo'

export default resolver({
  returns: 'blackbox',
  requireLogin: true,
  async resolve(viewer) {
    try {
      const planList = await getPlans()
      return planList.map((plan) => {
          const {id,name,price,currency} = plan
          return { id,name,price,currency }
      })
    } catch (error) {
      console.log('Error:', error)
    }
  }
})
