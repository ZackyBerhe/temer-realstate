"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { generateMetadata, SEOConfig } from "@/lib/seo";

// Since this is a client component with dynamic auth, we can't export metadata directly
// The metadata will be handled by the layout or through client-side updates

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/admin/dashboard");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <AdminLoginForm />;
}
