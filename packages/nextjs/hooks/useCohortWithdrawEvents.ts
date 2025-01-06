import { gql, useQuery } from "urql";
import contracts from "~~/generated/hardhat_contracts";

const WithdrawalsQuery = gql`
  query Withdrawls($cohortAddress: String!) {
    cohortWithdrawals(where: { cohortContractAddress: $cohortAddress }, orderBy: "timestamp", orderDirection: "desc") {
      items {
        reason
        builder
        amount
        timestamp
        id
      }
    }
  }
`;

export const useCohortWithdrawEvents = () => {
  const [{ data: newWithdrawEventsData, fetching: isLoadingNew }] = useQuery({
    query: WithdrawalsQuery,
    variables: {
      cohortAddress: contracts[10][0].contracts.CohortStreams.address,
    },
  });

  const newContractWithdrawEvents = newWithdrawEventsData?.cohortWithdrawals.items || [];

  const data = [...newContractWithdrawEvents];

  const isLoading = isLoadingNew;

  return { data, isLoading };
};
