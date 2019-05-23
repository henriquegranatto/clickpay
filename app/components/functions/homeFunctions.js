'use struct'
// IMPOTING COMPONENTS
import api from '../../src/connect'

exports.getIndexInfo = async () =>
{
   const request = {type: 'user-index', data: {publicCode: api.publicCode, token: api.token}}
   const response = await api.send(request)
   return response
}