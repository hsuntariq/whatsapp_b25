import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { FiArrowLeft, FiSmartphone } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verfiyOTP } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { BounceLoader } from 'react-spinners'
const OTPVerification = () => {
  const [otp, setOtp] = useState( "" ); // OTP as string
  const [error, setError] = useState( "" );
  const [resendDisabled, setResendDisabled] = useState( false );
  const [timer, setTimer] = useState( 60 );
  const navigate = useNavigate();

  const inputRefs = useRef( [] );

  // focus first input
  useEffect( () => {
    inputRefs.current[0]?.focus();
  }, [] );

  // resend timer
  useEffect( () => {
    let interval;

    if ( resendDisabled && timer > 0 ) {
      interval = setInterval( () => {
        setTimer( ( prev ) => prev - 1 );
      }, 1000 );
    } else if ( timer === 0 ) {
      setResendDisabled( false );
    }

    return () => clearInterval( interval );
  }, [resendDisabled, timer] );

  // input change
  const handleChange = ( e, index ) => {
    const value = e.target.value;

    if ( !/^\d*$/.test( value ) ) return;

    let newOtp = otp.split( "" );

    newOtp[index] = value.slice( -1 );

    const updatedOtp = newOtp.join( "" );

    setOtp( updatedOtp );

    if ( value && index < 3 ) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // backspace navigation
  const handleKeyDown = ( e, index ) => {
    if ( e.key === "Backspace" && !otp[index] && index > 0 ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // paste OTP
  const handlePaste = ( e ) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData( "text" ).trim();

    if ( /^\d{4}$/.test( pastedData ) ) {
      setOtp( pastedData );
      inputRefs.current[3]?.focus();
    }
  };


  const dispatch = useDispatch()

  const { user, userLoading, userSuccess, userError, userMessage } = useSelector( ( state ) => state.auth )



  useEffect( () => {
    if ( userError ) {
      toast.error( userMessage )
    }

    if ( userSuccess ) {
      navigate( '/main-page' )
    }

  }, [userError, userSuccess] )



  // verify OTP
  const handleVerify = async ( e ) => {
    e.preventDefault();

    if ( otp.length !== 4 ) {
      setError( "Please enter a 4-digit code" );
      return;
    }

    setError( "" );

    const otpData = {
      otp, email: user.email
    }

    dispatch( verfiyOTP( otpData ) )


  };

  // resend OTP
  const handleResend = () => {
    setResendDisabled( true );
    setTimer( 60 );
    setOtp( "" );
    setError( "" );

    inputRefs.current[0]?.focus();

    console.log( "Resending OTP..." );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Back Button */}
        <div className="flex items-center mb-8">
          <button className="text-green-600 hover:text-green-700">
            <FiArrowLeft size={24} />
          </button>

          <div className="flex-1 flex justify-center">
            <div className="bg-green-500 p-3 rounded-2xl shadow-lg">
              <FiSmartphone className="text-white w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-4">
                <FiSmartphone className="h-8 w-8 text-green-600" />
              </div>

              <h1 className="text-3xl font-bold text-gray-900">
                Verify Your Number
              </h1>

              <p className="mt-3 text-gray-600">
                We sent a 4-digit code to your phone number
                <br />
                <span className="font-medium">+92 3XX XXX XXXX</span>
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleVerify}>
              {/* OTP Inputs */}
              <div
                className="flex justify-center gap-4 mb-8"
                onPaste={handlePaste}
              >
                {[0, 1, 2, 3].map( ( index ) => {
                  const digit = otp[index] || "";

                  return (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={( e ) => handleChange( e, index )}
                      onKeyDown={( e ) => handleKeyDown( e, index )}
                      ref={( el ) => ( inputRefs.current[index] = el )}
                      className={`w-14 h-14 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none
                      ${digit
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-300 focus:border-green-500"
                        }`}
                    />
                  );
                } )}
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl"
              >
                {userLoading ? <BounceLoader size={10} color="white" /> : 'Verify & Continue'}

              </button>
            </form>

            {/* Resend */}
            <div className="mt-6 text-center text-sm text-gray-600">
              {resendDisabled ? (
                <p>
                  Resend code in <span className="font-medium">{timer}s</span>
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Didn't receive the code? Resend
                </button>
              )}
            </div>
          </div>

          <div className="bg-gray-50 px-8 py-5 text-center text-sm text-gray-500">
            Code expires in 10 minutes • For your security
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
