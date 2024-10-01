import React from "react";
import Nav from "@/layouts/main/nav";
import PrivacyPolicySection from "@/components/terms-policy/PrivacyPolicySection";
import Footer from "@/layouts/main/footer";
const PrivatePolicy = () => {
    return (
        <div>
            <Nav />
            <PrivacyPolicySection />
            <Footer/>
        </div>
    );
};

export default PrivatePolicy;
