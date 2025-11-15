import { authenticate, isAdmin } from "@/app/server/middleware/auth.js";
import { getAllUsers } from "@/app/server/controllers/authController.js";

// GET /api/users
export async function GET(req) {
  return authenticate(req, async () => {
    return isAdmin(req, async () => {
      return getAllUsers(req);
    });
  });
}
