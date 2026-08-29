"use client";

import { Suspense } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import ChangeUserPasswordForm from "./ChangeUserPasswordForm";

export default function ChangeUserPasswordPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-900"></div>
          </div>
        }
      >
        <ChangeUserPasswordForm />
      </Suspense>
    </ProtectedRoute>
  );
}
