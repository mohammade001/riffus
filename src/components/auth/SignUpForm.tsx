"use client"
import { handleSignUpForm } from "@/lib/auth/signupform";
import { useActionState } from "react";
import ImageUploader from "./ImageUploader";


export default function SignUpForm() {

  const [formState, formAction, peding] = useActionState(handleSignUpForm, {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
    error: {
      messageName: "",
      messageEmail: "",
      messagePassword: "",
      messageConfirmPassword: "",
      messageImage: "",
    },
  })
  return (
    <div >
      <form action={formAction}>
        <h2>Create Account</h2>

        <ImageUploader />
        <div >
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            defaultValue={formState?.name}
          />
          <p className="text-red-50">{formState.error?.messageName}</p>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            defaultValue={formState?.email}
          />
          <p className="text-red-50">{formState.error?.messageEmail}</p>

        </div>

        <div >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            defaultValue={formState?.password}
            minLength={6}
          />
          <p className="text-red-50">{formState.error?.messagePassword}</p>

        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            defaultValue={formState?.confirmPassword}
            minLength={6}
          />
          <p className="text-red-50">{formState.error?.messageConfirmPassword}</p>

        </div>

        <button type="submit">{peding ? "peding..." : "Sign Up"}</button>
      </form>
    </div>
  );

}
