'use client'

import React, { useState } from 'react'

export const HeaderContext = React.createContext()

export  function Header(){
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