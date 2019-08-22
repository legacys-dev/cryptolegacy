import {resolver} from '@orion-js/app'
import Users from 'app/collections/Users'
import {enrollCard} from 'app/helpers/qvo'


export default resolver({
  params: {},
  returns: String,
  async resolve(params, viewer) {
    const user = await Users.findOne({_id: viewer.userId});
    const qvoUserId = user.qvoCustomerId;
    const {inscription_uid,redirect_url,expiration_date} = await enrollCard(qvoUserId,'google.cl');
    return redirect_url
  }
})
