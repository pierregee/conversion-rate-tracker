// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
import { createPublicClient, http } from "viem";
import { mainnet, holesky } from "viem/chains";
import pufferVaultABI from "./abi";
import BigNumber from "bignumber.js";
import { Handler, HandlerEvent } from "@netlify/functions";

const INFURA_ID = process.env.INFURA_ID;
type Address = `0x${string}`;

const PUFFER_VAULT_ADDRESSES: Record<string, Address> = {
  mainnet: "0xD9A442856C234a39a81a089C06451EBAa4306a72",
  holesky: "0x9196830bB4c05504E0A8475A0aD566AceEB6BeC9",
};

type NetworkOption = keyof typeof PUFFER_VAULT_ADDRESSES;

function getClientAndAddress(network: NetworkOption) {
  const chain = network === "holesky" ? holesky: mainnet 
  const url =
    network === "mainnet" 
      ? `https://mainnet.infura.io/v3/${INFURA_ID}`
      : `https://holesky.infura.io/v3/${INFURA_ID}`;
  const client = createPublicClient({
    chain,
    transport: http(url),
  });
  const address = PUFFER_VAULT_ADDRESSES[network];
  return { client, address };
}

async function getConversionRate(network: NetworkOption): Promise<BigNumber> {
  try {
    const { client, address } = getClientAndAddress(network);

    const [totalAssets, totalSupply] = await Promise.all([
      client.readContract({
        address: address,
        abi: pufferVaultABI,
        functionName: "totalAssets",
      }),
      client.readContract({
        address: address,
        abi: pufferVaultABI,
        functionName: "totalSupply",
      }),
    ]);

    if (totalSupply.toString() === "0") {
      console.log("Total supply is zero. Cannot calculate conversion rate.");
      return new BigNumber(0);
    }

    const conversionRate = new BigNumber(totalAssets.toString()).dividedBy(
      totalSupply.toString(),
    );

    console.log("Conversion rate:", conversionRate.toFixed());

    return conversionRate;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export const handler: Handler = async function (event: HandlerEvent) {
  try {
    const network =
      (event.queryStringParameters?.network as NetworkOption) || "mainnet";
    const conversionRate = await getConversionRate(network);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ conversionRate: conversionRate.toFixed(8) }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch conversion rate" }),
    };
  }
};
