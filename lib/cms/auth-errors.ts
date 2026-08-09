import type { AuthError } from "@supabase/supabase-js";

export function getAuthErrorMessage(error: AuthError | Error): string {
  const code = "code" in error ? error.code : undefined;
  const message = error.message ?? "Login failed";

  switch (code) {
    case "invalid_credentials":
      return "Invalid email or password. Check your Supabase admin user in Authentication → Users.";
    case "email_not_confirmed":
      return "Email not confirmed. In Supabase Dashboard, enable Auto Confirm User when creating the admin account.";
    case "user_banned":
      return "This account is disabled. Check Supabase Authentication → Users.";
    case "over_request_rate_limit":
      return "Too many login attempts. Wait a minute and try again.";
    default:
      return message;
  }
}
