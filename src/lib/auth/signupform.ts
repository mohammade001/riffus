"use server";

import { redirect } from "next/navigation";
import {
  handlePasswordValidator,
  handleuserNameValidator,
  handleValidationEmail,
} from "./authValidation";

type signupState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: File | null;
  error?: {
    messageName?: string;
    messageEmail?: string;
    messagePassword?: string;
    messageConfirmPassword?: string;
    messageImage?: string;
  };
};

export async function handleSignUpForm(
  prevFormState: signupState,
  formData: FormData,
) {
  // برای اولین بار که رندر میشود توی سرورمقدار undifind برای همین  custant تغییر می دهیم مقدار اولیه را
  const custant: signupState = prevFormState ?? {
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
  };
  //get data & validation
  const signUpInput = {
    name: formData.get("fullName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    image: formData.get("image") as File | null,
  };

  const signUpOutput: signupState = {
    name: signUpInput.name,
    email: signUpInput.email,
    password: signUpInput.password,
    confirmPassword: signUpInput.confirmPassword,
    image: signUpInput.image,
    error: {
      messageName: "",
      messageEmail: "",
      messagePassword: "",
      messageConfirmPassword: "",
      messageImage: "",
    },
  };

  console.log(signUpInput);

  //   if (signUpInput.image) {
  //   }
  const userNameValidator = handleuserNameValidator(signUpInput.name);
  if (!userNameValidator.valid) {
    return {
      ...signUpOutput,
      error: {
        messageName: userNameValidator.message,
      },
    };
  }

  const validationEmail = handleValidationEmail(signUpInput.email);
  if (!validationEmail.valid) {
    return {
      ...signUpOutput,
      error: {
        messageEmail: validationEmail.message,
      },
    };
  }

  const passwordValidator = handlePasswordValidator(signUpInput.password);
  if (!passwordValidator.valid) {
    return {
      ...signUpOutput,
      error: {
        messagePassword: passwordValidator.message,
      },
    };
  }

  if (!signUpInput.confirmPassword || signUpInput.confirmPassword.trim()) {
    return {
      ...signUpOutput,
      error: {
        messageConfirmPassword: "Enter Confirm Password",
      },
    };
  } else if (signUpInput.password !== signUpInput.confirmPassword) {
    return {
      ...signUpOutput,
      error: {
        messageConfirmPassword: "Confirm Password does not match",
      },
    };
  }

  //get data & validation

  //post backend
  try {
    const respons = await fetch("http://localhost:4000", {
      method: "POST",
      body: JSON.stringify(signUpInput),
    });

    const data = await respons.json();
    //مثلا اشتباه بودن ایمیل یا رمز عبور کاربر در  status=400ارسال میشه

    if (respons.status === 400) {
      // hhhhh
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

  return custant;
}
