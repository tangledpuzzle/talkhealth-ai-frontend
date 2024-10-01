import React from "react";
import Nav from "@/layouts/main/nav";
import TermsCondition from "@/components/terms-policy/TermsConditions";
import Footer from "@/layouts/main/footer";

const Terms = () => {
  return (
    <div>
      <Nav />
      <TermsCondition />
      <Footer/>
    </div>
  );
};

export default Terms;
