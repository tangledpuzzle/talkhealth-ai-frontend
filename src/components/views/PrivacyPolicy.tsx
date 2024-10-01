import Link from "next/link";

export default function PrivacyPolicy() {
  const lastUpdated = "September 19, 2023";

  return (
    <div className="h-auto overflow-y-auto text-black overflow-x-hidden w-full relative px-4 sm:px-6 flex">
      <div className="mx-auto flex flex-col justify-start items-start max-w-3xl w-full mt-14 font-oracle !leading-normal tracking-tight text-xl text-black/60 pb-6 sm:pb-10">
        <p className="italic">Last updated: {lastUpdated}</p>

        <P>
          Please see our <Url href="#privacy-snapshot">Privacy Snapshot</Url>{" "}
          for a high-level overview of our privacy practices.
        </P>

        <P>
          This Privacy Policy outlines how{" "}
          <Url href="https://inflection.ai" target="_blank" rel="noreferrer">
            Inflection AI, Inc.
          </Url>{" "}
          (“Inflection AI”, “we”, “us”) your personal information through our
          website –{" "}
          <Url href="https://pi.ai" target="_blank" rel="noreferrer">
            pi.ai
          </Url>
          , our mobile applications, our interactions with you through other
          modes of communication (such as SMS or instant messaging), and any
          other sites or services that link to this Privacy Policy
          (collectively, the “Services”).
        </P>

        <Heading>Our General Approach</Heading>
        <P>
          Conversational artificial intelligence is at the technological
          frontier. We believe that this emerging technology will fundamentally
          change the way that we engage with and think about computers in our
          everyday lives. Ultimately, our goal is to use AI to build safe,
          smart, kind, and engaging conversational partners.
        </P>
        <P>
          Our Privacy Policy reflects our belief that achieving this goal and
          making the technology truly useful for all will require a deep
          understanding of how our users talk and collaborate with AIs. As users
          interact with our AIs, we learn a lot about how to make AI better and
          more useful to you.
        </P>
        <P>
          Users deserve transparency regarding how that process works,
          particularly when it comes to their data. This Policy is one part of
          that transparency. It documents what data we collect, how we keep it
          secure, and describes how we use that data to improve our Services for
          everyone. Here are the top level points:
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
