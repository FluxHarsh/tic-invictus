const generateOTP = () => {
  return "1234"; // fixed demo OTP
};

const sendOTP = async (phone) => {
  const otp = generateOTP();

  console.log(` Demo OTP for ${phone}: ${otp}`);

  return otp;
};

module.exports = {
  generateOTP,
  sendOTP,
};
