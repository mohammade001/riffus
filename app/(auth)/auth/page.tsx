import LoginForm from "@/components/auth/LoginForm"
import SignUpForm from "@/components/auth/SignUpForm"

type SearchParams = { auth: string }

export default async function AuthPage({ searchParams }: { searchParams: SearchParams }) {
const sP=await searchParams
  const auth = sP.auth
  return (
    <>
      {auth === 'signup' ? <SignUpForm /> : <LoginForm />}
    </>
  )
}
