"use client";

import Image from "next/image";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import React, { useState, useEffect } from 'react'
import { CROWDFUNDING_FACTORY } from "./constants/contracts";
import { useReadContract } from "thirdweb/react";
import { baseSepolia } from "thirdweb/chains";
import { getContract } from "thirdweb";




export default function Home() {
  
 //const account = useActiveAccount();
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
          href="https://portal.thirdweb.com/typescript/v5"
          description="get testnet tokens on Chainlink faucet"
        />
  
        <ArticleCard
          title="Components and Hooks"
          href="https://portal.thirdweb.com/typescript/v5/react"
          description="Learn about the thirdweb React components and hooks in thirdweb SDK"
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
    "RocketPool rETH",
    "LIDO stETH",
    "SWELL swETH",
    "ETHERFI eETH"
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
            <option value="">Select Destination</option>
            {networks.map((network, index) => (
              <option key={index} value={network}>{network}</option>
            ))}
          </select>
          <select>
            <option value="">Stake with on Destination Chain</option>
            {stakeOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="row">
          <label>Total Value Staked in USDC</label>
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
        title="Get testnet tokens"
        href="https://portal.thirdweb.com/typescript/v5"
        description="get testnet tokens on Chainlink faucet"
      />

      <ArticleCard
        title="Components and Hooks"
        href="https://portal.thirdweb.com/typescript/v5/react"
        description="Learn about the thirdweb React components and hooks in thirdweb SDK"
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
