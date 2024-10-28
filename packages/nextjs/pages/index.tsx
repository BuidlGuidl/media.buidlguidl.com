import React from "react";
import type { NextPage } from "next";
import { StreamContractInfo } from "~~/components/StreamContractInfo";

const Home: NextPage = () => {
  return (
    <>
      <div className="max-w-6xl space-y-12 px-4 py-12">
        <h1 className="font-[900] text-xl">Welcome</h1>
        <div>
          <p className="font-[100] mt-0 text-4xl">
            Funding high leverage BuidlGuidl members for their designs, social media contributions, and other media
            related work.
          </p>
          <p className="text-xs">Made possible by the BuidlGuidl!</p>
        </div>
        <div className="mb-10 max-w-xl">
          <StreamContractInfo />
        </div>
      </div>
    </>
  );
};

export default Home;
