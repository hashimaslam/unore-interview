import axios from 'axios';
const APIURL = `https://gateway.thegraph.com/api/${process.env.API_KEY}/subgraphs/id/GAGwGKc4ArNKKq9eFTcwgd1UGymvqhTier9Npqo1YvZB`;

const startDate = new Date('2023-09-26');
const timeStamp = Math.floor(startDate.getTime() / 1000);
console.log(timeStamp);

const tokensQuery = `
  query Withdraws($timestamp: Int!) {
    withdraws(where: { timestamp_gte: $timestamp }) {
      id
      to
      from
      amountUSD
      timestamp
      hash
    }
  }
`;

const totalAmountByWallet = `
  query Withdraws($timestamp: Int!, $walletAddress: String!) {
    withdraws(where: { timestamp_gte: $timestamp, from: $walletAddress }) {
      id
      to
      from
      amountUSD
      timestamp
    }
  }
`;

const tokensQueryVariables = {
  timestamp: timeStamp,
};

export async function getWithdraws() {
  try {
    const response = await axios.post(APIURL, {
      query: tokensQuery,
      variables: tokensQueryVariables,
    });
    const data = response.data.data;

    return data.withdraws;
  } catch (error) {
    console.error('Error querying GraphQL API:', error);
    return error;
  }
}

export async function getTotalAmountUSD(walletAddress: string) {
  try {
    const response = await axios.post(APIURL, {
      query: totalAmountByWallet,
      variables: {
        ...tokensQueryVariables,
        walletAddress,
      },
    });

    const data = response.data.data;

    const totalAmountUSD = data.withdraws.reduce((total: number, withdrawal: { amountUSD: string }) => {
      return total + parseFloat(withdrawal.amountUSD);
    }, 0);

    return totalAmountUSD.toFixed(2);
  } catch (error) {
    return error;
  }
}
