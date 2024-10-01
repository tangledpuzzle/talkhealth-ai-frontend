import React, { useEffect, useState } from "react";
import GoogleOAuthProvide from "@/context/GoogleOAuthProvider";
// import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

const Protect = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return <GoogleOAuthProvide>{children}</GoogleOAuthProvide>;
};

export default Protect;
