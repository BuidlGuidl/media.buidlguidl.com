import { useState } from "react";
import Head from "next/head";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address, Balance, EtherInput } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const streamedBuilders = [
  "0x60583563d5879c2e59973e5718c7de2147971807",
  "0x34aA3F359A9D614239015126635CE7732c18fDF3",
  "0xc1470707Ed388697A15B9B9f1f5f4cC882E28a45",
  "0x61B647D3b5a04Eec7E78B1d9CFbF9deA593c7865",
];

const Home: NextPage = () => {
  const { address } = useAccount();
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const { data: streamContract } = useDeployedContractInfo("YourContract");

  const { data: allBuildersData } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "allBuildersData",
    args: [streamedBuilders],
  });

  const { writeAsync: doWithdraw } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "streamWithdraw",
    args: [ethers.utils.parseEther(amount || "0"), reason],
  });

  const amIAStreamedBuilder = allBuildersData?.some(builderData => builderData.builderAddress === address);
  return (
    <>
      <Head>
        <title>Scaffold-eth App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <h1 className="font-bold text-center text-3xl w-[90%] leading-3">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Jessy's Hacker House <br />
          <span className="text-xl text-gray-400">BuidlGuidl Grants</span>
        </h1>
        <div className="max-w-[40rem] m-auto w-[90%]">
          <p>
            We're running an experiment to retroactively fund open-source work by providing a monthly UBI to open-source
            developers, handpicked by Jessy and Jessy's Hacker House, and rewarding them for their ongoing contributions
            to the ecosystem.
          </p>
          <p>
            Chosen developers can submit their monthly projects, automatically claim grant streams, and showcase their
            work to the public.
          </p>
          <p>This initiative is made possible by BuidlGuidl, with special thanks to Austin Griffith!</p>
        </div>

        <div className="mt-6">
          {address && amIAStreamedBuilder && (
            <div className="flex flex-col gap-3 items-center">
              <input
                type="text"
                className="input input-ghost focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 w-full font-medium placeholder:text-accent/50 text-gray-400 border-2 border-base-300 bg-base-200 rounded-full text-accent"
                placeholder="Reason for withdrawing"
                value={reason}
                onChange={event => setReason(event.target.value)}
              />
              <EtherInput value={amount} onChange={value => setAmount(value)} />
              <button className="btn btn-primary" onClick={doWithdraw}>
                Withdraw
              </button>
            </div>
          )}
        </div>
        <div className="my-6 flex flex-col">
          <span className="font-bold">Stream contract Balance</span>{" "}
          <Balance address={streamContract?.address} className="text-3xl" />
        </div>
        <h1 className="mt-5 mb-3 font-bold text-xl">List of Hackers</h1>
        <div>
          {allBuildersData?.map(builderData => {
            const cap = ethers.utils.formatEther(builderData.cap || 0);
            const unlocked = ethers.utils.formatEther(builderData.unlockedAmount || 0);
            const percentage = Math.floor((parseFloat(unlocked) / parseFloat(cap)) * 100);
            return (
              <div className="pb-8 flex gap-4" key={builderData.builderAddress}>
                <div className="w-1/2 flex">
                  <Address address={builderData.builderAddress} />
                </div>
                <div className="flex flex-col items-center">
                  <div>
                    Ξ {unlocked} / {cap}
                  </div>
                  <progress className="progress w-56" value={percentage} max="100"></progress>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
