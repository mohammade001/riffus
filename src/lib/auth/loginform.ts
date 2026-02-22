"use server";

import { redirect } from "next/navigation";
import { handleValidationEmail } from "./authValidation";

export type loginstate = {
  email: string;
  password: string;
  error?: { messageEmail?: string; messageLogin?: string };
};

export async function handleLoginForm(
  prevFormState: loginstate,
  formData: FormData,
) {

  // برای اولین بار که رندر میشود توی سرورمقدار undifind برای همین  custant تغییر می دهیم مقدار اولیه را
  const custant: loginstate = prevFormState ?? {
    email: "",
    password: "",
    error: { messageEmail: "", messageLogin: "" },
  };

  //get data & validation
  const logingInput = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (!handleValidationEmail(logingInput.email).valid) {
    return {
      email: logingInput.email,
      password: logingInput.password,
      error: { messageEmail: handleValidationEmail(logingInput.email).message },
    };
  }

  //get data & validation
  
  //post backend
  try {
    const respons = await fetch("http://localhost:4000", {
      method: "POST",
      body: JSON.stringify(logingInput),
    });

    const data = await respons.json();
    //مثلا اشتباه بودن ایمیل یا رمز عبور کاربر در  status=400ارسال میشه

    if (respons.status === 400) {
      return {
        email: logingInput.email,
        password: logingInput.password,
        error: {
          messageLogin: /*data.message*/ "Your email or password is incorrect.",
        },
      };
    }

    if (!respons.ok) {
      throw new Error("Something went wrong. Please try again later.");
    }

    redirect("/");
  } catch (error) {
    console.log("error :", error);
  }

  //post backend

  //save data context or redux

  //save data context or redux

  console.log(logingInput);
  return custant;
}
