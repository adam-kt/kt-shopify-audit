import { SquareClient, SquareEnvironment } from "square";

// Initialize Square client
// Set SQUARE_ACCESS_TOKEN in .env.local
export const square = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment:
    process.env.SQUARE_ENVIRONMENT === "production"
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});
