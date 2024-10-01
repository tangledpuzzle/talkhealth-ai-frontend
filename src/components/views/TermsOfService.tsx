import Link from "next/link";

export default function TermsOfService() {
  const lastUpdated = "September 19, 2023";

  return (
    <div className="h-auto overflow-y-auto text-black overflow-x-hidden w-full relative px-4 sm:px-6 flex">
      <div className="mx-auto flex flex-col justify-start items-start max-w-3xl w-full mt-14 font-oracle !leading-normal tracking-tight text-xl text-black/60 pb-6 sm:pb-10">
        <p className="italic">Last updated: {lastUpdated}</p>

        <P>
          These Terms of Use (“Terms”) govern your use of Inflection AI, Inc.
          (“Inflection AI”, “we”, “us”) products and services including our
          website and conversational AIs (“Services”).
        </P>

        <P>
          These Terms incorporate by reference our Privacy Policy, as well as
          any other written policies and documentation that we may provide from
          time to time. You agree to use our Services in compliance with these
          Terms.
        </P>

        <P>
          Your use of our Services in any manner means that you agree to the
          Terms. Unfortunately, if you do not agree with these Terms, you may
          not access or use our Services.
        </P>

        <Heading>Our Services</Heading>
        <P>
          Inflection AI believes that conversational AI will fundamentally
          reshape the way that we interact and use computers in our everyday
          lives. As you interact with our Services, we will learn more about how
          to make this emerging technology ever more helpful, collaborative, and
          fun to communicate with.
        </P>
        <P>
          Given the early state of this technology, we also acknowledge that
          there are areas that we will need to continually improve on to make
          sure that our Services can reach their full potential. As part of
          that, you recognize that:
        </P>
      </div>
    </div>
  );
}

const Url = (props: React.ComponentPropsWithoutRef<typeof Link>) => (
  <Link className="text-gpt-green-dark underline" {...props} />
);

const Heading = (props: React.ComponentPropsWithoutRef<"h2">) => (
  <h2
    className="text-gpt-green-dark font-medium text-[25px] mt-10 mb-4"
    {...props}
  />
);

const P = (props: React.ComponentPropsWithoutRef<"p">) => (
  <p className="mt-6" {...props} />
);
