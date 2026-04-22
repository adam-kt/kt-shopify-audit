import { SquareClient, SquareEnvironment } from "square";

// Accept any casing / whitespace variant so a stray `Production` in Vercel's
// UI doesn't silently fall through to Sandbox and hit real-money APIs with
// sandbox creds (or vice versa).
const envFlag = (process.env.SQUARE_ENVIRONMENT ?? "").trim().toLowerCase();
const isProduction = envFlag === "production" || envFlag === "prod";

export const square = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment: isProduction ? SquareEnvironment.Production : SquareEnvironment.Sandbox,
});
