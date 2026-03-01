import React, { useState } from 'react';
import { FiPhone, FiUser, FiLock, FiMail } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const [formFields, setFormFields] = useState( {
        name: '',
        email: '',
        password: '',
        number: '',
        c_password: '',
        theme: '#00C950',
    } );

    const [error, setError] = useState( '' );
    // const [loading, setLoading] = useState(false); // optional

    const { name, email, password, number, c_password, theme } = formFields;

    const handleChange = ( e ) => {
        setFormFields( {
            ...formFields,
            [e.target.name]: e.target.value,
        } );
    };


    const navigate = useNavigate()

    const handleRegister = async ( e ) => {
        e.preventDefault();
        setError( '' );

        if ( password !== c_password ) {
            setError( 'Passwords do not match' );
            return;
        }

        // setLoading(true);
        try {
            const registerData = { name, email, password, number, theme };
            const response = await axios.post( 'http://localhost:5174/api/auth/register', registerData );
            console.log( 'Success:', response.data );
            navigate( '/otp' )
            // You can redirect or show success message here
        } catch ( err ) {
            console.error( err );
            setError( err.response?.data?.message || 'Registration failed' );
        }
        // setLoading(false);
    };

    const themeOptions = [
        { value: 'default', label: 'Default Green', color: 'bg-green-500', border: 'border-green-500' },
        { value: 'dark', label: 'Dark Mode', color: 'bg-gray-800', border: 'border-gray-700' },
        { value: 'blue', label: 'Ocean Blue', color: 'bg-blue-500', border: 'border-blue-500' },
        { value: 'purple', label: 'Royal Purple', color: 'bg-purple-500', border: 'border-purple-500' },
        { value: 'orange', label: 'Sunset Orange', color: 'bg-orange-500', border: 'border-orange-500' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-5">
                        <div className="bg-green-500 p-4 rounded-3xl shadow-xl transform hover:scale-105 transition-transform">
                            <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.45-1.272.606-1.45c.156-.178.339-.223.452-.223.113 0 .226.001.326.01.123.011.287-.046.45.341.156.37.531 1.275.578 1.367.047.092.078.202.016.326-.062.124-.092.202-.172.312-.079.109-.166.243-.238.326-.079.087-.162.182-.069.358.093.176.414.682.886 1.104.609.543 1.122.712 1.282.79.159.078.252.065.345-.039.093-.104.397-.464.502-.623.105-.159.21-.133.354-.08.144.053.915.431 1.072.509.156.078.26.117.299.182.038.065.038.376-.106.781z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        WhatsApp Theme Studio
                    </h1>
                    <p className="mt-3 text-lg text-gray-600">
                        Create your perfect WhatsApp vibe — register now
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl border border-gray-100/50 overflow-hidden">
                    <form onSubmit={handleRegister} className="p-8 lg:p-10">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center">
                                {error}
                            </div>
                        )}

                        {/* Grid for form fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                                <div className="relative">
                                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all outline-none placeholder-gray-400"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all outline-none placeholder-gray-400"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                                <div className="relative">
                                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="number"
                                        value={number}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all outline-none placeholder-gray-400"
                                        placeholder="+92 300 1234567"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Theme Selector (spans both columns) */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2.5">
                                    Choose Your WhatsApp Theme
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {themeOptions.map( ( option ) => (
                                        <label
                                            key={option.value}
                                            className={`relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${theme === option.value
                                                ? `${option.border} ring-2 ring-offset-2 ring-green-400`
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="theme"
                                                value={option.value}
                                                checked={theme === option.value}
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            <div className={`w-12 h-12 ${option.color} rounded-full shadow-inner mb-2`}></div>
                                            <span className="text-sm font-medium text-gray-700 text-center">
                                                {option.label}
                                            </span>
                                        </label>
                                    ) )}
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all outline-none placeholder-gray-400"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="password"
                                        name="c_password"
                                        value={c_password}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all outline-none placeholder-gray-400"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="mt-8 flex items-start">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-0.5"
                            />
                            <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                                I agree to the{' '}
                                <a href="#" className="text-green-600 hover:text-green-500 font-medium">
                                    Terms & Conditions
                                </a>{' '}
                                and confirm I am at least 16 years old.
                            </label>
                        </div>

                        {/* Submit */}
                        <div className="mt-10">
                            <button
                                type="submit"
                                className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5"
                            // disabled={loading}
                            >
                                {/* {loading ? 'Creating...' :  */}
                                Register & Unlock Theme
                                {/* } */}
                            </button>
                        </div>
                    </form>

                    <div className="bg-gray-50 px-8 py-5 text-center text-sm text-gray-500 border-t border-gray-100">
                        Already have an account?{' '}
                        <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                            Sign in
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;