import crypto from 'crypto';

const newOtp = ()=>{
const secret = 'yourSecretKey123';

const timestamp = Date.now().toString();
//console.log('Timestamp:', timestamp); // e.g., 'Timestamp: 1697855233456'


const hmac = crypto.createHmac('sha256', secret);
//console.log('HMAC object:', hmac); // Yeh ek object hoga, dummy value nahi hai kyunki yeh object hai

const updatedHmac = hmac.update(timestamp);
//console.log('HMAC after update:', updatedHmac); // Yeh bhi ek object hi return karega

const hash = updatedHmac.digest('hex');
//console.log('Final Hash:', hash); // e.g., 'Final Hash: a3f92b1c5d...'


const numericOTP = parseInt(hash.substring(0, 6), 16).toString().padStart(6, '0').slice(0,6);
//console.log('Numeric OTP:', numericOTP); // e.g., 'Numeric OTP: 123456'
//console.log(numericOTP);

return numericOTP

}

export default newOtp