// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
import express from 'express';
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import pufferVaultABI from "./abi";
import BigNumber from "bignumber.js";

const CONTRACT_ADDRESS = "0xD9A442856C234a39a81a089C06451EBAa4306a72";
const INFURA_ID = process.env.INFURA_ID;

const client = createPublicClient({
  chain: mainnet,
  transport: http(`https://mainnet.infura.io/v3/${INFURA_ID}`),
});

async function getConversionRate(): Promise<BigNumber> {
  try {
    const [totalAssets, totalSupply] = await Promise.all([
      client.readContract({
        address: CONTRACT_ADDRESS,
        abi: pufferVaultABI,
        functionName: "totalAssets",
                             }),
      client.readContract({
        address: CONTRACT_ADDRESS,
        abi: pufferVaultABI,
        functionName: "totalSupply",
      }),
    ]);

    // Check for zero total supply
    if (totalSupply.toString() === "0") {
      console.log("Total supply is zero. Cannot calculate conversion rate.");
      return new BigNumber(0)
    }

    // TODO(pierregee): penalties and rewards as part of the conversion rate
    const conversionRate = new BigNumber(totalAssets.toString()).dividedBy(
      totalSupply.toString(),
    );

    console.log("Conversion rate:", conversionRate.toFixed());

    return conversionRate;
  } catch (error) {
    // TODO(pierregee): improve error handling
    console.error("Error:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

const app = express();
const port = process.env.PORT || 3001; 

app.get('/api/conversion-rate', async (req, res) => {
  try {
    const conversionRate = await getConversionRate();
    res.json({ conversionRate: conversionRate.toFixed(18) }); 
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch conversion rate' });
  }
});

app.listen(port, () => {
  console.log(`Microservice listening on port ${port}`);
});