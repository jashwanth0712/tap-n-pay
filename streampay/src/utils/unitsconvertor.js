export const formatBalance = (rawBalance) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(5)
    return balance
  }
  
  export const formatChainAsNum = (chainIdHex) => {
    const chainIdNum = parseInt(chainIdHex)
    return chainIdNum
  }