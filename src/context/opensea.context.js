import  {createContext , useEffect, useState, useMemo} from 'react'
import { useMoralis } from 'react-moralis'

export const OpenseaContext = createContext()

const OpenseaProvider = (props) => {
    const { 
        Moralis, 
        user, 
        logout, 
        authenticate, 
        enableWeb3, 
        isInitialized, 
        isInitializing, 
        isAuthenticated, 
        isWeb3Enabled 
    } = useMoralis()
  
    const [values, setValues] = useState({tokenAddress : "", tokenId : ""})

    const web3Account = useMemo(
      () => isAuthenticated && user.get("accounts")[0],
      [user, isAuthenticated]
    )
  
    const [asset, setAsset] = useState(null)
  
    // Get NFT Asset Data
    const getAsset = async() => {
      const asset = await Moralis.Plugins.opensea.getAsset({
        network: 'testnet',
        tokenAddress: values.tokenAddress,
        tokenId: values.tokenId,
      });
  
      setAsset(asset)
      console.log(asset)
    }
  
    // get NFT orders
    const getOrder = async() => {
      const order = await Moralis.Plugins.opensea.getOrders({
        network: 'testnet',
        tokenAddress: values.tokenAddress,
        tokenId: values.tokenId,
        orderSide: 0,
        page: 1, // pagination shows 20 orders each page
      });
  
      console.log(order)
    }
  
    // Create sell orders for an NFT
    const createSellOrder = async() => {
      if(!asset) return alert("You must select an asset!")
      // Expire this auction one day from now.
      // Note that we convert from the JavaScript timestamp (milliseconds):
      const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24);
  
      const sellAsset = await Moralis.Plugins.opensea.createSellOrder({
        network: 'testnet',
        tokenAddress: values.tokenAddress,
        tokenId: values.tokenId,
        tokenType: asset.assetContract.schemaName,
        userAddress: web3Account,
        startAmount: 1,
        endAmount: 1,
        expirationTime: expirationTime // Only set if you startAmount > endAmount
      });
  
      console.log(sellAsset)
    }
  
    // Create Buy order
    const createBuyOrder = async() => {
      if(!asset) return alert("You must select an asset!")
      try{
        const buyOrder = await Moralis.Plugins.opensea.createBuyOrder({
          network: 'testnet',
          tokenAddress: values.tokenAddress,
          tokenId: values.tokenId,
          tokenType: asset.assetContract.schemaName,
          amount: 0.0001,
          userAddress: web3Account,
          paymentTokenAddress: '0xc778417e063141139fce010982780140aa0cd5ab',
        });
    
        console.log(buyOrder)
      }
      catch(error){
        console.log(error)
      }
    }
  
    useEffect(() => {
      if(isInitialized){
        Moralis.initPlugins()
        console.log("Initialized!")
      }
      else if(isInitializing){
        console.log("Waiting...")
      }
      else{
        console.log("Failed to initialized")
      }
    },[isInitialized])
  
    useEffect(() => {
      if(isAuthenticated && !isWeb3Enabled){
        enableWeb3()
        console.log("enabled web3")
      }
    },[isAuthenticated])

    return (
        <OpenseaContext.Provider value={{
            asset,
            values,
            isAuthenticated,
            web3Account,
            getOrder,
            getAsset,
            createSellOrder,
            createBuyOrder,
            setValues,
            logout, 
            authenticate, 
        }}>
            {props.children}
        </OpenseaContext.Provider>
    )
}

export default OpenseaProvider