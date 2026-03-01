import React, { useState, useRef, useEffect } from 'react';
import { FiArrowLeft, FiSmartphone } from 'react-icons/fi';

const OTPVerification = () => {
    const [otp, setOtp] = useState( ['', '', '', ''] );
    const [error, setError] = useState( '' );
    const [resendDisabled, setResendDisabled] = useState( false );
    const [timer, setTimer] = useState( 60 ); // 60 seconds resend cooldown

    const inputRefs = useRef( [] );

    // Auto-focus first input on mount
    useEffect( () => {
        inputRefs.current[0]?.focus();
    }, [] );

    // Timer for resend button
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

    const handleChange = ( e, index ) => {
        const value = e.target.value;
        if ( !/^\d*$/.test( value ) ) return; // only digits

        const newOtp = [...otp];
        newOtp[index] = value.slice( -1 ); // take last digit
        setOtp( newOtp );

        // Auto-focus next input
        if ( value && index < 3 ) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = ( e, index ) => {
        if ( e.key === 'Backspace' && !otp[index] && index > 0 ) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = ( e ) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData( 'text' ).trim();
        if ( /^\d{4}$/.test( pastedData ) ) {
            setOtp( pastedData.split( '' ) );
            inputRefs.current[3]?.focus();
        }
    };

    const handleVerify = ( e ) => {
        e.preventDefault();
        const code = otp.join( '' );
        if ( code.length !== 4 ) {
            setError( 'Please enter a 4-digit code' );
            return;
        }

        setError( '' );
        // Simulate API call
        console.log( 'Verifying OTP:', code );
        // Here → axios.post('/api/verify-otp', { otp: code })
        // Then redirect or show success
        alert( 'OTP Verified! 🎉 (demo)' );
    };

    const handleResend = () => {
        setResendDisabled( true );
        setTimer( 60 );
        setOtp( ['', '', '', ''] );
        setError( '' );
        inputRefs.current[0]?.focus();
        // Here → call resend OTP API
        console.log( 'Resending OTP...' );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                {/* Back button & Logo */}
                <div className="flex items-center mb-8">
                    <button className="text-green-600 hover:text-green-700 transition-colors">
                        <FiArrowLeft size={24} />
                    </button>
                    <div className="flex-1 flex justify-center">
                        <div className="bg-green-500 p-3 rounded-2xl shadow-lg">
                            <svg
                                className="w-10 h-10 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.45-1.272.606-1.45c.156-.178.339-.223.452-.223.113 0 .226.001.326.01.123.011.287-.046.45.341.156.37.531 1.275.578 1.367.047.092.078.202.016.326-.062.124-.092.202-.172.312-.079.109-.166.243-.238.326-.079.087-.162.182-.069.358.093.176.414.682.886 1.104.609.543 1.122.712 1.282.79.159.078.252.065.345-.039.093-.104.397-.464.502-.623.105-.159.21-.133.354-.08.144.053.915.431 1.072.509.156.078.26.117.299.182.038.065.038.376-.106.781z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Card */}
                <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl border border-gray-100/50 overflow-hidden">
                    <div className="p-8 lg:p-10">
                        <div className="text-center mb-8">
                            <div className="mx-auto mb-4 flex justify-center">
                                <div className="bg-green-100 p-4 rounded-full">
                                    <FiSmartphone className="h-8 w-8 text-green-600" />
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
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
                            <div className="flex justify-center gap-4 mb-8" onPaste={handlePaste}>
                                {otp.map( ( digit, index ) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={( e ) => handleChange( e, index )}
                                        onKeyDown={( e ) => handleKeyDown( e, index )}
                                        ref={( el ) => ( inputRefs.current[index] = el )}
                                        className={`w-14 h-14 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none transition-all
                      ${digit
                                                ? 'border-green-500 bg-green-50 text-green-700'
                                                : 'border-gray-300 hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-400'
                                            }`}
                                    />
                                ) )}
                            </div>

                            {/* Verify Button */}
                            <button
                                type="submit"
                                className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5"
                            >
                                Verify & Continue
                            </button>
                        </form>

                        {/* Resend */}
                        <div className="mt-6 text-center text-sm text-gray-600">
                            {resendDisabled ? (
                                <p>Resend code in <span className="font-medium">{timer}s</span></p>
                            ) : (
                                <button
                                    onClick={handleResend}
                                    className="text-green-600 hover:text-green-700 font-medium transition-colors"
                                >
                                    Didn't receive the code? Resend
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="bg-gray-50 px-8 py-5 text-center text-sm text-gray-500 border-t border-gray-100">
                        Code expires in 10 minutes • For your security
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;