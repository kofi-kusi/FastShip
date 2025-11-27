import { LoginForm } from "~/components/login-form"

export function SellerLoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm user="seller"/>
      </div>
    </div>
  )
}

export function PartnerLoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm user="partner"/>
      </div>
    </div>
  )
}
