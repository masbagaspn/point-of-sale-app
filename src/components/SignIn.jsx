import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { endpoint, ERROR_CODE } from "../API";
import { ErrorMessage } from "@hookform/error-message";

import { assets } from "../assets";
import logo from "../assets/logo.png"
import Button from "./Button";
import md5 from "md5";

export default function SignIn() {
    
    const [passwordDisplay, setDisplay] = useState(false);
    const [passwordIcon, setPasswordIcon] = useState(assets.eye_off);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const {register, handleSubmit, formState: { errors }} = useForm({
        criteriaMode: "all",
        mode: "onChange"
    });

    const toggleVisibility = () => {
        setDisplay(!passwordDisplay);

        if(passwordDisplay){
            setPasswordIcon(assets.eye_on);
        } else{
            setPasswordIcon(assets.eye_off);
        }
    }

    const onSubmit = async(data) => {
        
        data.password = md5(data.password);
        setLoading(true);
        
        try{
            const response = await fetch(endpoint.userLogin, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer" + data.token
                },
                body: JSON.stringify({
                    data
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
            <div className='relative bg-white mx-auto rounded-md shadow-md shadow-gray-300 w-[90%] max-w-[450px]'>

                <img src={logo} alt="sac-icon" className="absolute block left-10 top-10 w-8"/>

                <div className='mt-14 pb-6 re'>
                    <h2 className='text-center text-2xl py-1 font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent'>Login</h2>
                    <p className='text-center text-sm font-medium text-gray-500 bg-transparent'>Fill in with your account details.</p>
                </div>

                <form method="POST" onSubmit={handleSubmit(onSubmit)} className='w-full mx-auto py-4 px-10 rounded-md bg-white space-y-4'>

                    <div className='flex flex-col'>
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
                            className='p-2 border-2 border-gray-200 rounded-md outline-none focus:border-blue-500 placeholder:text-sm'
                        />
                        <ErrorMessage
                            errors = {errors}
                            name = "username"
                            render = {({messages}) => 
                                messages && Object.entries(messages).map(([type, message]) => (
                                    <p key={type} className='text-right text-red-400 italic text-sm mt-2'>{message}</p>
                                ))
                            }
                        />
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
                            placeholder='Enter your password'
                            className='p-2 border-2 border-gray-200 rounded-md outline-none focus:border-blue-500 placeholder:text-sm'
                        />
                        <ErrorMessage
                            errors = {errors}
                            name = "password"
                            render = {({messages}) => 
                                messages && Object.entries(messages).map(([type, message]) => (
                                    <p key={type} className='text-right text-red-400 italic text-sm mt-2'>{message}</p>
                                ))
                            }
                        />
                        <img 
                            src={passwordIcon}
                            alt='eye-icon' 
                            onClick={toggleVisibility} 
                            className='block w-3 absolute right-4 top-11 cursor-pointer'
                        />
                    </div>

                    {message && <p className='text-right text-red-400 italic text-sm mb-5'>{message}</p> }

                    <Button loading={loading} text="Sign In"/>
                </form>
                <p className="text-center text-sm text-gray-500 my-10">Do not have an account? 
                    <Link to="/signup" className="text-blue-500 text-bold cursor-pointer outline-1 outline-blue-500"> Sign up here!</Link>
                </p>
            </div>
        </div>
    )
}
