'use struct'
// IMPOTING COMPONENTS
import api from '../../src/connect'

exports.login = async (email, password) =>
{
   const request = {type: 'user-login', data: {email: email, password: password}}
   const rgxPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&[^`´"'\/|,.-<>:?]).{8,10}$/
   const rgxEemail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

   if(rgxPassword.test(password) && rgxEemail.test(email))
   {
      const response = await api.send(request)

      if(response.publicCode && response.token)
      {
         api.publicCode = response.publicCode
         api.token = response.token

         return {message: 2000}
      }
   }
   else
   {
      return {message: 4001}
   }
}