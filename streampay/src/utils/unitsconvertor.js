export const formatBalance = (rawBalance) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(5)
    return balance
  }
  
  export const formatChainAsNum = (chainIdHex) => {
    const chainIdNum = parseInt(chainIdHex)
    return chainIdNum
  }
  export const  sliceString=(str)=> {
    if (str.length <= 9) {
      return str; // The string is too short to apply the slicing pattern.
    }
    
    const firstFour = str.substring(0, 6);
    const lastTwo = str.substring(str.length - 3);
    
    return `${firstFour}...${lastTwo}`;
  }