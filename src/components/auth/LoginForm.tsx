'use client'
import { handleLoginForm } from '@/lib/auth/loginform';
import React, { useActionState } from 'react'

export default function LoginForm() {
    const [formState, formAction, peding] = useActionState(handleLoginForm, {
        email: '',
        password: '',
        error: { messageEmail: "", messageLogin: "" }
    })

    console.log(formState);

    return (
        <div >
            <form action={formAction} >
                <h2>Login</h2>
                <p className='text-white'>{formState?.error?.messageLogin ?? null}</p>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        defaultValue={formState?.email}
                    />
                    <p className='text-white'>{formState?.error?.messageEmail ?? null}</p>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        defaultValue={formState?.password}
                    />
                </div>

                <button >{peding ? "peding" : "Sign In"}</button>
            </form>
        </div>
    );
}
