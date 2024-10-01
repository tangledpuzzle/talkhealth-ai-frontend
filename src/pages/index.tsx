import { GetServerSideProps } from "next";

export default function Home() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: "/main",
      permanent: false,
    },
  };
};