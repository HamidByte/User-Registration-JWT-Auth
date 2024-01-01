const jwt = require('jsonwebtoken');

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTkxYTQ0MGMxNGZjYmU3Nzg1ODIzNjgiLCJpYXQiOjE3MDQwNDU5MzksImV4cCI6MTcwNDA0OTUzOX0.oQIRpTtnlt4vXL-FFNy_YJc7Hbd6X0K6eHRhindCTfI';

jwt.verify(token.split(' ')[1], 'aVerySecureSecretKey123', { algorithms: ['HS256'] }, (err, decoded) => {
  if (err) {
    console.error('Token decoding error:', err);
  } else {
    console.log('Decoded token:', decoded);
  }
});