export function handleValidationEmail(email: string): {
  message?: string;
  valid: boolean;
} {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || email.trim() === "") {
    return {
      message: "Please enter your email.",
      valid: false,
    };
  }

  if (!regex.test(email)) {
    return {
      message: "The email you entered is invalid.",
      valid: false,
    };
  }

  return {
    valid: true,
  };
}

export function handlePasswordValidator(password: string): {
  message?: string;
  valid: boolean;
} {
  const minLength = 6;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  if (!password || password.trim()==="" || password.length < minLength) {
    return { valid: false, message: "Enter your Password" };
  }

  if (!passwordRegex.test(password)) {
    return {
      valid: false,
      message: "Your password must contain different letters",
    };
  }

  return { valid: true };
}

export function handleuserNameValidator(userName: string): {
  message?: string;
  valid: boolean;
} {
  const usernameRegex =
    /^^[a-zA-Z0-9_]{3,20}$/;

  if (!userName || userName.trim()==="" || usernameRegex.test(userName)) {
    return {valid:false,message:'The username is incorrect'};
  }
  return {valid:true};
}
