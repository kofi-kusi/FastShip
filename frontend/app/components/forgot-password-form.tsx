import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { useContext } from "react";
import { AuthContext, type UserType } from "~/contexts/AuthContext";
import api from "~/lib/api";
import { toast } from "sonner";

export function ForgotPasswordForm({
  className,
  user,
  ...props
}: { user: UserType } & React.ComponentProps<"div">) {

  async function sendResetLink(data: FormData) {
    const email = data.get("email")?.toString();
    

    if (!email) {
      return;
    }

    const userApi = user === "seller" ? api.seller : api.partner
    await userApi.forgotPassword({email})

    toast("Reset link has been sent to your email.")

  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" action={sendResetLink}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Reset Password</h1>
                <p className="text-muted-foreground text-balance">
                  Enter your email address for a password reset link
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <Button type="submit">Send</Button>
              </Field>
             </FieldGroup> 
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/rowan-freeman-clYlmCaQbzY-unsplash.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
