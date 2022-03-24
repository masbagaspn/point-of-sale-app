import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {  endpoint, ERROR_CODE } from "../API";

import { assets } from "../assets";
import logo from "../assets/logo.png"
import Button from "./Button";

export default function SignIn() {
    
    const [passwordDisplay, setDisplay] = useState(false);
    const [passwordConfirmationDisplay, setConfirmationDisplay] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const {register, handleSubmit, watch, formState: { errors }} = useForm({
        criteriaMode: "all",
        mode: "onTouched"
    });
    const password = watch("password");
    const md5 = require('md5');

    const toggleVisibility = () => {
        setDisplay(!passwordDisplay);
    }

    const toggleConfirmationVisibility = () => {
        setConfirmationDisplay(!passwordConfirmationDisplay);
    }
    

    const onSubmit = async(data) => {

        try{
            const response = await fetch(endpoint.userRegister, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer" + data.token
                },
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    phoneNumber: '081111111',
                    fullName: data.username,
                    password: md5(data.password),

                })
            });

            const resJSON = await response.json();

            if(resJSON.success === false){
                setMessage(`${ERROR_CODE[resJSON.errorCode]}`);
                console.log(`${resJSON.errorCode}: ${resJSON.errorMessage}`)
            } else {
                data.username = '';
                data.password = '';
                console.log('Login Successfull!');
            }
        } catch(err) {
            return console.log(err);
        } finally{
            setLoading(false)
        }
    };

    

    return (
        <div className='w-full min-h-screen bg-gray-50 flex items-center'>
            <div className='relative bg-white mx-auto rounded-md shadow-md shadow-gray-300 w-[90%] max-w-[700px]'>

                <img src={logo} alt="sac-icon" className="absolute block left-10 top-10 w-8"/>

                <div className='mt-14 pb-6 re'>
                    <h2 className='text-center text-2xl py-1 font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent'>Sign Up</h2>
                    <p className='text-center text-sm font-medium text-gray-500 bg-transparent'>Let's create  a new account!.</p>
                </div>

                <form method="POST" onSubmit={handleSubmit(onSubmit)} 
                    className='w-full mx-auto py-4 px-8 rounded-md space-y-6 
                        md:grid md:grid-cols-2 md:gap-6 md:space-y-0'>

                    <div className='flex flex-col relative'>
                        <label htmlFor="username" className='text-sm font-bold text-blue-600 mb-2'>Username</label>
                        <input 
                            type="text" 
                            {...register("username",{
                                required: "This is required",
                                minLength: {
                                    value: 8,
                                    message: "Your username is too short"
                                }
                            })}
                            placeholder='Enter your username'
                            className={`p-2 border-2 border-gray-200 rounded-md outline-none focus:border-blue-500 placeholder:text-sm ${errors.username && "focus:border-red-400 border-red-400"}`}
                        /> 
                        {errors.username && <span className='absolute top-0 right-0 text-red-400 italic text-xs'>{errors.username.message}</span>}
                    </div>

                    <div className='flex flex-col relative'>
                        <label htmlFor="email" className='text-sm font-bold text-blue-600 mb-2'>E-mail</label>
                        <input 
                            type="email" 
                            {...register("email",{
                                required: "This is required",
                                minLength: {
                                    value: 8,
                                    message: "Your email is too short"
                                }
                            })}
                            placeholder='Enter your email'
                            className={`p-2 border-2 border-gray-200 rounded-md outline-none focus:border-blue-500 placeholder:text-sm ${errors.email && "focus:border-red-400 border-red-400"}`}
                        /> 
                        {errors.email && <span className='absolute top-0 right-0 text-red-400 italic text-xs'>{errors.email.message}</span>}
                    </div>

                    <div className='flex flex-col relative'>
                        <label htmlFor="password" className='text-sm font-bold text-blue-600 mb-2'>Password</label>
                        <input 
                            type={passwordDisplay ? "text" : "password"}
                            {...register("password", {
                                required: "This is required",
                                minLength: {
                                    value: 8,
                                    message: "Your password is too short"
                                }
                            })}
                            onPaste = {(e) => {
                                e.preventDefault()
                                return false;
                            }}
                            placeholder='Enter your password'
                            className={`p-2 border-2 border-gray-200 rounded-md outline-none focus:border-blue-500 placeholder:text-sm ${errors.password && "focus:border-red-400 border-red-400"}`}
                        />
                        {errors.password && <span className='absolute top-0 right-0 text-red-400 italic text-xs'>{errors.password.message}</span>}
                        <img 
                            src={passwordDisplay ? assets.eye_on : assets.eye_off}
                            alt='eye-icon' 
                            onClick={toggleVisibility} 
                            className='block w-3 absolute right-4 top-11 cursor-pointer'
                        />
                    </div>

                    <div className='flex flex-col relative'>
                        <label htmlFor="passwordConfirmation" className='text-sm font-bold text-blue-600 mb-2'>Password Confirmation</label>
                        <input 
                            type={passwordConfirmationDisplay ? "text" : "password"}
                            {...register("passwordConfirmation", {
                                required: "This is required",
                                validate: val => 
                                    val === password || "The password did not match"
                            })}
                            onPaste = {(e) => {
                                e.preventDefault()
                                return false;
                            }}
                            placeholder='Re-Enter your password'
                            className={`p-2 border-2 border-gray-200 rounded-md outline-none focus:border-blue-500 placeholder:text-sm ${errors.passwordConfirmation && "focus:border-red-400 border-red-400"}`}
                        />
                        {errors.passwordConfirmation && <span className='absolute top-0 right-0 text-red-400 italic text-xs'>{errors.passwordConfirmation.message}</span>}
                        <img 
                            src={passwordConfirmationDisplay ? assets.eye_on : assets.eye_off}
                            alt='eye-icon' 
                            onClick={toggleConfirmationVisibility} 
                            className='block w-3 absolute right-4 top-11 cursor-pointer'
                        />
                    </div>

                    {message && <p className='text-right text-red-400 italic text-sm'>{message}</p> }

                    <Button loading={loading} text="Sign Up" className="md:col-start-1 md:col-span-2 md:row-start-3"/>
                </form>
                <p className="text-center text-sm text-gray-500 my-10">Already have an account? 
                    <Link to="/" className="text-blue-500 text-bold cursor-pointer outline-1 outline-blue-500"> Sign in here!</Link>
                </p>
            </div>
        </div>
    )
}
