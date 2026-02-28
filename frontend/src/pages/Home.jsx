import React, { useRef, useState } from 'react';
import { FiPhone, FiUser, FiLock, FiMail } from 'react-icons/fi';
import axios from 'axios'
const Home = () => {

    const [formFields, setFormFields] = useState( {
        name: '', email: '', password: '', number: '', c_password: ''
    } )


    const { name, email, password, number, c_password } = formFields


    const handleChange = ( e ) => {
        setFormFields( {
            ...formFields,
            [e.target.name]: e.target.value
        } )
    }

    const handleRegister = async ( e ) => {
        e.preventDefault()
        const registerData = {
            name, email, password, number
        }

        const response = await axios.post( 'http://localhost:5174/api/auth/register', registerData )

        console.log( response )
    }




    const themeOptions = [
        { value: 'default', label: 'Default Green', color: 'bg-green-500' },
        { value: 'dark', label: 'Dark Mode', color: 'bg-gray-800' },
        { value: 'blue', label: 'Ocean Blue', color: 'bg-blue-500' },
        { value: 'purple', label: 'Royal Purple', color: 'bg-purple-500' },
        { value: 'orange', label: 'Sunset Orange', color: 'bg-orange-500' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                {/* Header with WhatsApp branding */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-green-500 p-3 rounded-2xl shadow-lg">
                            <svg
                                className="w-12 h-12 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.45-1.272.606-1.45c.156-.178.339-.223.452-.223.113 0 .226.001.326.01.123.011.287-.046.45.341.156.37.531 1.275.578 1.367.047.092.078.202.016.326-.062.124-.092.202-.172.312-.079.109-.166.243-.238.326-.079.087-.162.182-.069.358.093.176.414.682.886 1.104.609.543 1.122.712 1.282.79.159.078.252.065.345-.039.093-.104.397-.464.502-.623.105-.159.21-.133.354-.08.144.053.915.431 1.072.509.156.078.26.117.299.182.038.065.038.376-.106.781z" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">WhatsApp Theme Registration</h2>
                    <p className="mt-2 text-sm text-gray-600">Customize your WhatsApp experience</p>
                </div>

                {/* Registration Form - Uncontrolled with ref */}
                <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
                    <form className="space-y-5">
                        {/* Full Name Field */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={handleChange}
                                    name="name"
                                    id="fullName"
                                    defaultValue=""
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    id="email"
                                    defaultValue=""
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone Number Field */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiPhone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    name="number"
                                    value={number}
                                    onChange={handleChange}
                                    id="phone"
                                    defaultValue=""
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                    placeholder="+1 234 567 8900"
                                    required
                                />
                            </div>
                        </div>

                        {/* Theme Preference Dropdown */}


                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    value={password}
                                    onChange={handleChange}
                                    type="password"
                                    name="password"
                                    id="password"
                                    defaultValue=""
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    value={c_password}
                                    onChange={handleChange}
                                    name="c_password"
                                    id="confirmPassword"
                                    defaultValue=""
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Terms and Conditions Checkbox */}
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    defaultChecked={false}
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-colors"
                                    required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-medium text-gray-700">
                                    I agree to the{' '}
                                    <a href="#" className="text-green-600 hover:text-green-500 transition-colors">
                                        Terms and Conditions
                                    </a>
                                </label>
                                <p className="text-gray-500">and confirm that I am at least 16 years old.</p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                onClick={handleRegister}
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                            >
                                Register & Apply Theme
                            </button>
                        </div>
                    </form>

                    {/* Additional Info */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            By registering, you'll be able to apply and save your favorite WhatsApp theme.
                        </p>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default Home;