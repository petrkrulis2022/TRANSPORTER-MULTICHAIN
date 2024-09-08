"use client";

import Image from "next/image";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import React, { useState, useEffect } from 'react'
import { CROWDFUNDING_FACTORY } from "./constants/ccipcontracts";
import { useReadContract } from "thirdweb/react";
import { baseSepolia } from "thirdweb/chains";
import { getContract } from "thirdweb";




export default function Home() {
  
 //const account = useActiveAccount();
  //usecontract hook
  /*const contract = getContract({
    client: client,
    chain: baseSepolia,
    address: CROWDFUNDING_FACTORY,
  })
    // Get all campaigns deployed with CrowdfundingFactory
  const {data: campaigns, isLoading: isLoadingCampaigns, refetch: refetchCampaigns } = useReadContract({
    contract: contract,
    method: "function getAllCampaigns() view returns ((address campaignAddress, address owner, string name)[])",
    params: []
  });  
  */
  
  return (
    <main className="p-4 pb-10 min-h-[100vh] flex flex-col items-end justify-start container max-w-screen-lg mx-auto">
      <div className="py-4 self-end">
        <ConnectButton
          client={client}
          appMetadata={{
            name: "Example App",
            url: "https://example.com",
          }}
        />
      </div>

      <div className="py-20 flex-grow">
        <Header />
        <Header1 />
        <ThirdwebResources />
      </div>
    </main>
  );
}

function Header1() {
  return (
    
      <div className="fixed top-0 left-80   p-4 flex justify-between items-center space-x-4">
        <ArticleCard
          title="Get testnet tokens"
          href="https://faucets.chain.link/"
          description="Chainlink faucet"
        />
  
        <ArticleCard
          title="Github Repo"
          href="https://github.com/petrkrulis2022/TRANSPORTER-MULTICHAIN"
          description="Github Repo"
        />
  
        
      </div>
    
  );
}

function Header(){
  const [total, setTotal] = useState(0)
    const [account, setAccount] = useState('')
  const networks = [
    "Arbitrum Sepolia",
    "Avalanche Fuji",
    "Base Sepolia",
    "Polygon Amoy",
    "Ethereum Sepolia",
    "Optimism Sepolia"
  ]
  
  const tokens = ["ETH", "USDC", "LINK", "GHO", "BnM", "LnM"]
  
  const stakeOptions = [
    "Send tokens to Your Metamsk accounts)",
    "Send tokens to Wallet address ( EOA)",
    "Buy NFT on destination chain",
    "Mint BNBS+ Stablecoin on BNB testnet",
    "Stake with LIDO stETH",
    "Stake with RocketPool rETH",
    "Stake with CCIP Staker.sol"
  ]
  const updateTotal = () => {
    const amounts = [
      parseFloat(document.getElementById('amount1').value) || 0,
      parseFloat(document.getElementById('amount2').value) || 0,
      parseFloat(document.getElementById('amount3').value) || 0
    ]
    setTotal(amounts.reduce((a, b) => a + b, 0))
  }
  
  const handleMaxClick = (id) => {
    document.getElementById(id).value = '100'
    updateTotal()
  }
  return (
   
      <div className="networks">
        <h2>Networks</h2>
        {[1, 2, 3].map((num) => (
          <div key={num} className="row">
            <select>
              <option value="">Select</option>
              {networks.map((network, index) => (
                <option key={index} value={network}>{network}</option>
              ))}
            </select>
            <select>
              <option value="">Select</option>
              {tokens.map((token, index) => (
                <option key={index} value={token}>{token}</option>
              ))}
            </select>
            <input type="number" id={`amount${num}`} placeholder="Amount" onChange={updateTotal} />
            <button onClick={() => handleMaxClick(`amount${num}`)}>MAX</button>
          </div>
        ))}
        <div className="row">
          <select>
            <option value="">Select Destination Chain</option>
            {networks.map((network, index) => (
              <option key={index} value={network}>{network}</option>
            ))}
          </select>
          <select>
            <option value="">Select require action on destination chain</option>
            {stakeOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="row">
          <label>Total Value Sent in USDC</label>
          <input type="number" readOnly value={total} />
        </div>
        <button onClick={updateTotal}>Send</button>
      </div>
  )
   
 
}

function ThirdwebResources() {
  return (
    <div className="fixed bottom-0 left-80   p-4 flex justify-between items-center space-x-4">
      <ArticleCard
        title="CCIP Explorer"
        href="https://ccip.chain.link/msg/0x84fb02c84aa4da86cfee5f880a6cb594d5d3fd476b4cf233d4e296a0dabca15d"
        description="CCIP Explorer"
      />

      <ArticleCard
        title="BNBS+ Stablecoin"
        href="https://drive.google.com/file/d/16O-wOoS51xr__Xto2N_CO8B4C6ix0ndo/view?usp=drive_link"
        description="BNBS+ Stablecoin on BNB Chain"
      />

      <ArticleCard
        title="thirdweb Dashboard"
        href="https://thirdweb.com/dashboard"
        description="Deploy, configure, and manage your smart contracts from the dashboard."
      />
    </div>
  );
}

function ArticleCard(props: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <a
      href={props.href + "?utm_source=next-template"}
      target="_blank"
      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
    >
      <article>
        <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
        <p className="text-sm text-zinc-400">{props.description}</p>
      </article>
    </a>
  );
}
