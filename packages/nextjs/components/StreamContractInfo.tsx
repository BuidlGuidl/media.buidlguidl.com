import React from "react";
import { BigNumber } from "ethers";
import { useAccount } from "wagmi";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { Address, Balance } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const StreamContractInfo = () => {
  const { address } = useAccount();
  const { data: streamContract } = useDeployedContractInfo("CohortStreams");

  const { data: owner } = useScaffoldContractRead({
    contractName: "CohortStreams",
    functionName: "owner",
  });

  const { data: builderData } = useScaffoldContractRead({
    contractName: "CohortStreams",
    functionName: "streamedBuilders",
    args: [address],
  }) as {
    data: { cap: BigNumber } | undefined;
  };

  const amIAStreamdBuilder = builderData?.cap.gt(0);

  return (
    <>
      <div className="mt-16 text-base">
        <div className="p-6 pb-10 bg-[#fff] text-[#000] rounded-tl-lg rounded-tr-lg flex flex-col items-center">
          <p>Stream Contract</p>
          <div className="flex flex-col sm:flex-row gap-2 items-center sm:items-baseline">
            <div className="flex flex-col items-center">
              <Address address={streamContract?.address} />
              <span className="text-sm text-[#323aa8]">Mainnet</span>
            </div>
            {""}
            <span className="hidden sm:block">/</span>
            <Balance address={streamContract?.address} className="text-3xl" />
          </div>
          {address && amIAStreamdBuilder && (
            <div className="mt-3">
              <label
                htmlFor="withdraw-modal"
                className="btn btn-primary btn-sm px-2 rounded-full font-normal space-x-2 normal-case"
              >
                <BanknotesIcon className="h-4 w-4" />
                <span>Withdraw</span>
              </label>
            </div>
          )}
        </div>
        <div className="bg-[#FFFFFFcc] text-[#000] p-6 pb-12 rounded-bl-lg rounded-br-lg flex flex-col items-center">
          <p className="mb-3">Owner</p>
          <Address address={owner} />
        </div>
      </div>
    </>
  );
};
