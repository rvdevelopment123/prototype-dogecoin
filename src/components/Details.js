import { useContext, useEffect, useState } from 'react'
// import {AssetsContext} from '../../context/asset.context'
// import {ListingContext} from '../../context/listing.context'
import {OpenseaContext} from '../context/opensea.context'
import { useParams, Link } from 'react-router-dom'
import Footer from "./Footer.js"

function Details () {
    let { assetId,tokenId } = useParams()

    const {
      asset,
      values,
      isAuthenticated,
      isPluginInstalled,
      web3Account,
      order,
      getOrder,
      getAsset,
      createSellOrder,
      createBuyOrder,
      setValues,
      logout, 
      authenticate, 
    } = useContext(OpenseaContext)
    
    const [amount, setAmount] = useState(0)

    const handleOrder = async () => {
      if(!amount) return alert("Amount is required")
      console.log("Order is processing...")
      await createBuyOrder(amount)
      await getOrder()
      await getAsset()
      console.log("Order action executed")
      setTimeout( e => window.location.reload(), 500)
    }

    useEffect(() => {
      setValues({tokenAddress : assetId, tokenId})
      console.log({tokenAddress : assetId, tokenId})
      window.scrollTo(0,0)
    },[assetId,tokenId])

    useEffect(() => {
      const _ = async() => {
          await getOrder()
          getAsset()
      }
      if(values.tokenAddress && values.tokenId && isPluginInstalled) _()

    },[values,isPluginInstalled])

    function timeSince(date) {

      var seconds = Math.floor((new Date() - date) / 1000);
    
      var interval = seconds / 31536000;
    
      if (interval > 1) {
        return Math.floor(interval) + " years";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes";
      }
      return Math.floor(seconds) + " seconds";
    }
    
    return <>
      {
        asset ? <>
      <div className="bg-light p-3 mb-4">
        <div className="container d-flex justify-content-end">
          <Link to={"/sell/"+assetId+"/"+tokenId} className="btn btn-primary px-5 py-3 fs-5 fw-bolder"
          disabled={web3Account === asset.owner.address ? false : true}>
            Sell
          </Link>
        </div>
      </div>
      <div className="modal fade" id="createOrderModal" tabIndex="-1" aria-labelledby="createOrderModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <header className="sc-1xf18x6-0 sc-xyql9f-3 eimawt cmYDzE">
                <h4 className="sc-1xf18x6-0 sc-1w94ul3-0 sc-xyql9f-5 haVRLx bjsuxj emRahP text-center">Place a bid</h4>
              </header>
              <section className="sc-1xf18x6-0 sc-xyql9f-2 jpQsNF NmbCx">
                <div className="sc-1xf18x6-0 sc-1twd32i-0 sc-1wwz3hp-0 haVRLx kKpYwv kuGBEl sc-1fkdq1o-1 UPKyL">
                  <div className="sc-1xf18x6-0 sc-1twd32i-0 jvONNN kKpYwv">
                    <div className="sc-1xf18x6-0 sc-1twd32i-0 sc-1wwz3hp-0 gfbErs kKpYwv kuGBEl d-block">
                      <label className="sc-1xf18x6-0 sc-1w94ul3-0 sc-5y2dd1-0 haVRLx jnCfKq EDtcj text-center">Price</label>
                    </div><br/>
                    <div className="sc-1m1dfwq-0 eNinak">
                      <div className="sc-8qscmp-0 jVimYV">
                        <div className="sc-17icy78-0 klcZh Input--valid">
                          <div className="Input--main input-group">
                            <div className="Input--label Input--left-label input-group-text">
                              <div className="sc-1xf18x6-0 sc-1twd32i-0 haVRLx kKpYwv PaymentTokenInputV2--payment-asset PaymentTokenInputV2--input-left">
                                <div className="sc-1xf18x6-0 sc-1twd32i-0 sc-12mizad-0 iQOhGx kKpYwv">
                                  <div size="24" className="sc-1xf18x6-0 sc-1twd32i-0 sc-1wwz3hp-0 sc-b4hiel-0 sc-cjf6mn-0 sc-sbw25j-0 sc-s8gv83-0 fhVUfN kKpYwv kuGBEl iVtKaT euUQqP jwEsBT bLwasA">
                                    <img alt="" src="https://openseauserdata.com/files/accae6b6fb3888cbff27a013729c22dc.svg" size="15" className="sc-1xf18x6-0 sc-sbw25j-1 fhVUfN kGXfai"/>
                                  </div>
                                </div>
                                <div className="sc-1xf18x6-0 sc-1twd32i-0 sc-1wwz3hp-0 sc-b4hiel-0 sc-1idymv7-1 haVRLx kKpYwv kuGBEl iVtKaT cjftsJ">
                                  <span fontSize="14px" className="sc-1xf18x6-0 sc-1w94ul3-0 sc-1idymv7-2 hyzwIu iqOLSY">WETH</span>
                                </div>
                              </div>
                            </div>
                            <div className="Input--prefix"></div>
                            <input autocapitalize="off" autocomplete="off" onChange={e => setAmount(e.target.value)} autocorrect="off" className="browser-default Input--input" data-testid="Input" inputmode="decimal" placeholder="Amount" required="" spellcheck="false" type="text" />
                              <div className="Input--label Input--right-label input-group-text">
                                <div className="sc-1xf18x6-0 sc-1w94ul3-0 cTvSkV jIeJKA PaymentTokenInputV2--price-display PaymentTokenInputV2--input-right">$0.00</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="sc-1xf18x6-0 sc-1twd32i-0 sc-jjxyhg-0 cpiPas kKpYwv gakOkv">
                      <span display="flex" className="sc-1xf18x6-0 sc-1w94ul3-0 sc-13us3ky-0 jUxJqB sZAwe gYhERy"></span>
                      <span className="sc-1xf18x6-0 sc-1w94ul3-0 sc-13us3ky-0 elFyTS sZAwe gYhERy">Available: 0.0000 WETH</span>
                    </div> */}
                  </div>
                  <div className="sc-11it458-0 iRtaPJ">
                    <div className="AcknowledgementCheckboxes--tos-row">
                      <span className="sc-zw7s59-3 dICFpI AcknowledgementCheckboxes--tos-row-checkbox" type="checkbox">
                        <input type="checkbox" id="tos" name="tos" className="sc-zw7s59-1 hjgjTV"/>
                      </span>
                      <label className="sc-1xf18x6-0 sc-1w94ul3-0 haVRLx esBwvv AcknowledgementCheckboxes--tos-text" htmlFor="tos">I agree to OpenSea's 
                        <a target="_blank" href="/tos" className="sc-1pie21o-0 elyzfO">Terms of Service</a>
                      </label>
                    </div>
                  </div>
                </section>
                <footer className="sc-1xf18x6-0 sc-xyql9f-4 emEEkd dQZvCL">
                  <div>
                    <button width="100%" disabled="" onClick={handleOrder} type="button" className="sc-1xf18x6-0 sc-glfma3-0 jPlHEK jzlogA">Place Bid</button>
                  </div>
                </footer>
                {/* <div className="sc-1xf18x6-0 sc-1twd32i-0 kZfJst kKpYwv">
                  <button type="button" className="sc-ty1bh0-0 infdiL"><i aria-label="Close" value="close" size="24" className="sc-1gugx8q-0 sc-xyql9f-1 fTdhIH gLyxZv material-icons">close</i></button></div> */}
            </div>
          </div>
        </div>
      </div>
      <main className="py-5">
        <section>
          <div className="container">
            <div className="row mb-4">

              <div className="col-md-5">
                <div className="card--container mb-4">
                  <div className="card--header py-2 px-3 d-flex justify-content-between">
                    <svg fill="gray" viewBox="-38.39985 -104.22675 332.7987 625.3605" style={{width: "12px"}}>
                      <path d="M125.166 285.168l2.795 2.79 127.962-75.638L127.961 0l-2.795 9.5z"></path>
                      <path d="M127.962 287.959V0L0 212.32z"></path>
                      <path d="M126.386 412.306l1.575 4.6L256 236.587l-128.038 75.6-1.575 1.92z"></path>
                      <path d="M0 236.585l127.962 180.32v-104.72z"></path>.
                      <path d="M127.961 154.159v133.799l127.96-75.637z"></path>
                      <path d="M127.96 154.159L0 212.32l127.96 75.637z"></path>
                    </svg>

                    <div className="jffCaG jYqxGr">
                      <div className="elqhCm jYqxGr">
                        <button type="button" className="btgkrL">
                          <i size="20" aria-label="Favorite" defaultValue="favorite_border"
                            className="dVzTXK fNbWaJ material-icons">favorite_border</i></button>
                      </div>
                      <p className="elqhCm gwsEKa">
                        <div className="dLqDlm jYqxGr ksFzlZ iXcsEj">43</div>
                      </p>
                    </div>
                  </div>
                  <div className="square--img">
                    <div className="img--responsive">
                      <img
                        src={asset.image_url}
                        alt=""/>
                    </div>
                  </div>
                </div>

                <div className="card--container">
                  <div className="ejFaWs fhezOG Panel--isFramed">
                    <div className="hypfZU Panel--panel">
                      <button className="btgkrL BasePanel--header Panel--header">
                        <i className="dVAVbi material-icons Panel--icon">subject</i>
                        <span>Description</span>
                      </button>
                      <div className="BasePanel--body Panel--body">
                        <div className="Panel--content-container"
                          style={{height: "initial",maxHeight: "200px", overflow: "auto"}}>
                          <div className="Panel--isContentPadded item--description">
                            <section className="item--creator">
                              <div className="elqhCm fkuTPI AccountLink--ellipsis-overflow item--creator-account">
                                Created by&nbsp;
                                
                                <a className="hubhNL laCjUo AccountLink--ellipsis-overflow"
                                  href="/0x85d30747868a5081f53BC7B9450301e761620a4f?tab=created"><span>{asset.assetContract.name}</span></a>
                              </div>
                            </section>
                            <div className="elqhCm item--description-text">
                              <span>
                                {asset.description}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ejFaWs fhezOG Panel--isFramed">
                    <div className="hypfZU Panel--panel">
                      <button className="btgkrL BasePanel--header Panel--header" type="button">
                        <i className="dVAVbi Panel--icon material-icons Panel--icon">label</i>
                        <span>Properties</span>
                      </button>
                      <div className="BasePanel--body Panel--body">
                        <div className="Panel--content-container" style={{height: "initial"}}>
                          <div className="Panel--isContentPadded item--properties">
                            {
                              asset.traits.length && asset.traits.map(i => {
                                  return <a href="/" className="ekTmzq">
                                  <div className="esyMuQ item--property">
                                    <div className="Property--type">{i.trait_type}</div>
                                    <div className="Property--defaultValue">{i.value}</div>
                                    <div className="Property--rarity">16% have this trait</div>
                                  </div>
                                </a>
                              })
                            }
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ejFaWs Panel--isFramed">
                    <div className="hypfZU Panel--panel">
                      <button className="btgkrL BasePanel--header Panel--header" type="button">
                        <i className="dVAVbi Panel--icon material-icons Panel--icon">vertical_split</i>
                        <span>About Baby Doge Army</span>
                      </button>
                      <div className="BasePanel--body Panel--body">
                        <div className="Panel--content-container" style={{height: "initial"}}>
                          <div className="Panel--isContentPadded">
                            <div className="item--about-container">
                              <a href="/" className="ekTmzq">
                                <div className="kMPTZo item--about-image" style={{height: "100%", width: "80px"}}>
                                  <img alt="" className="Image--image"
                                    src={asset.assetContract.image_url || ""}
                                    style={{objectFit: "cover"}}/>
                                </div>
                              </a>
                            </div>
                            <div className="bRCNrx jYqxGr">
                              <div className="fresnel-container fresnel-greaterThanOrEqual-lg ">
                                <div className="FlexEndreact__FlexEnd-sc-rss0by-0 elqhCm jYqxGr eEhtsU">
                                  <div className="elqhCm jYqxGr daKevg">
                                    <a className="ekTmzq kXZare kdWcfm eztnHW" href="http://babydogenft.com"
                                      rel="nofollow noopener" target="_blank" aria-label="Website-link">
                                      <div className="kBjTDg jYqxGr">
                                        <div className="elqhCm jYqxGr dBmaRW">
                                          <svg className="" fill="#8A939B" viewBox="1 1 22 22"
                                            style={{height: "20px", width: "20px"}}>
                                            <path clipRule="evenodd"
                                              d="M2 12C2 6.48 6.47 2 11.99 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 11.99 22C6.47 22 2 17.52 2 12ZM15.97 8H18.92C17.96 6.35 16.43 5.07 14.59 4.44C15.19 5.55 15.65 6.75 15.97 8ZM12 4.04C12.83 5.24 13.48 6.57 13.91 8H10.09C10.52 6.57 11.17 5.24 12 4.04ZM4 12C4 12.69 4.1 13.36 4.26 14H7.64C7.56 13.34 7.5 12.68 7.5 12C7.5 11.32 7.56 10.66 7.64 10H4.26C4.1 10.64 4 11.31 4 12ZM5.08 16H8.03C8.35 17.25 8.81 18.45 9.41 19.56C7.57 18.93 6.04 17.66 5.08 16ZM5.08 8H8.03C8.35 6.75 8.81 5.55 9.41 4.44C7.57 5.07 6.04 6.34 5.08 8ZM12 19.96C11.17 18.76 10.52 17.43 10.09 16H13.91C13.48 17.43 12.83 18.76 12 19.96ZM9.5 12C9.5 12.68 9.57 13.34 9.66 14H14.34C14.43 13.34 14.5 12.68 14.5 12C14.5 11.32 14.43 10.65 14.34 10H9.66C9.57 10.65 9.5 11.32 9.5 12ZM14.59 19.56C15.19 18.45 15.65 17.25 15.97 16H18.92C17.96 17.65 16.43 18.93 14.59 19.56ZM16.5 12C16.5 12.68 16.44 13.34 16.36 14H19.74C19.9 13.36 20 12.69 20 12C20 11.31 19.9 10.64 19.74 10H16.36C16.44 10.66 16.5 11.32 16.5 12Z"
                                              fillRule="evenodd"></path>
                                          </svg>
                                        </div>
                                      </div>
                                    </a>
                                    <a className="ekTmzq kXZare kdWcfm eztnHW" href="https://discord.gg/babydogecoin"
                                      rel="nofollow noopener" target="_blank" aria-label="Discord-link">
                                      <div className="kBjTDg jYqxGr">
                                        <div className="elqhCm jYqxGr dBmaRW">
                                          <svg className="" fill="#8A939B" viewBox="0 0 22 16"
                                            style={{height: "20px", width: "20px"}}>
                                            <path
                                              d="M8.11.5c-.28.002-2.574.067-4.996 1.873 0 0-2.584 4.665-2.584 10.408 0 0 1.507 2.593 5.473 2.719 0 0 .664-.792 1.202-1.477-2.278-.685-3.14-2.108-3.14-2.108s.18.126.502.307c.018 0 .035.019.07.036.055.035.108.054.162.09.448.252.896.45 1.31.611.736.307 1.615.576 2.639.774 1.346.252 2.925.342 4.646.019a12.954 12.954 0 002.603-.774 10.118 10.118 0 002.062-1.063s-.896 1.458-3.247 2.125c.538.666 1.185 1.439 1.185 1.439 3.965-.126 5.473-2.72 5.473-2.7 0-5.746-2.584-10.409-2.584-10.409C16.32.446 13.861.5 13.861.5l-.251.288c3.05.918 4.468 2.27 4.468 2.27a14.856 14.856 0 00-5.4-1.711 15.048 15.048 0 00-3.626.036c-.107 0-.197.019-.306.035-.628.072-2.153.288-4.073 1.135-.663.288-1.059.505-1.059.505S5.088 1.635 8.317.717L8.137.5h-.028zm-.457 6.645c1.022 0 1.849.882 1.83 1.981 0 1.1-.808 1.982-1.83 1.982-1.005 0-1.83-.883-1.83-1.982s.806-1.981 1.83-1.981zm6.55 0c1.004 0 1.83.882 1.83 1.981 0 1.1-.809 1.982-1.83 1.982-1.006 0-1.83-.883-1.83-1.982s.806-1.981 1.83-1.981z">
                                            </path>
                                          </svg>
                                        </div>
                                      </div>
                                    </a>
                                    <a className="ekTmzq kXZare kdWcfm eztnHW" href="https://t.me/babydogecoin"
                                      rel="nofollow noopener" target="_blank" aria-label="Telegram-link">
                                      <div className="kBjTDg jYqxGr">
                                        <div className="elqhCm jYqxGr dBmaRW">
                                          <svg className="" fill="#8A939B" viewBox="0 0 24 16"
                                            style={{height: "20px", width: "20px"}}>
                                            <path clipRule="evenodd"
                                              d="M18.28 15.456c.317.168.725.21 1.09.107.363-.104.631-.337.712-.62.854-3.013 2.928-10.64 3.706-13.38.06-.207-.04-.421-.256-.56A1 1 0 0022.748.9C18.625 2.045 5.921 5.62.729 7.06c-.329.092-.543.33-.532.59.012.262.246.488.583.564 2.329.522 5.385 1.25 5.385 1.25s1.428 3.234 2.173 4.88c.093.206.309.369.593.425.283.055.586-.003.798-.153l3.046-2.157s3.513 1.933 5.506 2.997zM7.45 9.054L9.1 13.14l.367-2.587 10.02-6.778c.106-.072.12-.193.032-.278-.088-.085-.249-.104-.37-.047L7.45 9.054z"
                                              fillRule="evenodd"></path>
                                          </svg>
                                        </div>
                                      </div>
                                    </a>
                                    <a className="ekTmzq kXZare kdWcfm eztnHW" href="https://instagram.com/thebabydogecoin"
                                      rel="nofollow noopener" target="_blank" aria-label="Instagram-link">
                                      <div className="kBjTDg jYqxGr">
                                        <div className="elqhCm jYqxGr dBmaRW"><svg className="" fill="#8A939B"
                                            viewBox="0 0 24 24" style={{height: "20px", width: "20px"}}>
                                            <path
                                              d="M15.75 2H8.25C4.79875 2 2 4.79875 2 8.25V15.75C2 19.2012 4.79875 22 8.25 22H15.75C19.2012 22 22 19.2012 22 15.75V8.25C22 4.79875 19.2012 2 15.75 2ZM20.125 15.75C20.125 18.1625 18.1625 20.125 15.75 20.125H8.25C5.8375 20.125 3.875 18.1625 3.875 15.75V8.25C3.875 5.8375 5.8375 3.875 8.25 3.875H15.75C18.1625 3.875 20.125 5.8375 20.125 8.25V15.75Z">
                                            </path>
                                            <path
                                              d="M12 7C9.23875 7 7 9.23875 7 12C7 14.7613 9.23875 17 12 17C14.7613 17 17 14.7613 17 12C17 9.23875 14.7613 7 12 7ZM12 15.125C10.2775 15.125 8.875 13.7225 8.875 12C8.875 10.2763 10.2775 8.875 12 8.875C13.7225 8.875 15.125 10.2763 15.125 12C15.125 13.7225 13.7225 15.125 12 15.125Z">
                                            </path>
                                            <path
                                              d="M17.375 7.29124C17.743 7.29124 18.0413 6.99295 18.0413 6.62499C18.0413 6.25703 17.743 5.95874 17.375 5.95874C17.0071 5.95874 16.7088 6.25703 16.7088 6.62499C16.7088 6.99295 17.0071 7.29124 17.375 7.29124Z">
                                            </path>
                                          </svg></div>
                                      </div>
                                    </a><a className="ekTmzq kXZare kdWcfm eztnHW"
                                      href="https://etherscan.io/address/0xd9f092bdf2b6eaf303fc09cc952e94253ae32fae"
                                      rel="nofollow noopener" target="_blank" aria-label="Etherscan-link">
                                      <div className="kBjTDg jYqxGr">
                                        <div className="elqhCm jYqxGr dBmaRW"><svg className="" fill="#8A939B" height="18"
                                            viewBox="0 0 293.775 293.671" width="18" xmlns="http://www.w3.org/2000/svg">
                                            <g id="etherscan-logo-circle" transform="translate(-219.378 -213.33)">
                                              <path
                                                d="M280.433,353.152A12.45,12.45,0,0,1,292.941,340.7l20.737.068a12.467,12.467,0,0,1,12.467,12.467v78.414c2.336-.692,5.332-1.43,8.614-2.2a10.389,10.389,0,0,0,8.009-10.11V322.073a12.469,12.469,0,0,1,12.468-12.47h20.778a12.469,12.469,0,0,1,12.467,12.467v90.279s5.2-2.106,10.269-4.245a10.408,10.408,0,0,0,6.353-9.577V290.9a12.466,12.466,0,0,1,12.466-12.467h20.778A12.468,12.468,0,0,1,450.815,290.9v88.625c18.014-13.055,36.271-28.758,50.759-47.639a20.926,20.926,0,0,0,3.185-19.537,146.6,146.6,0,0,0-136.644-99.006c-81.439-1.094-148.744,65.385-148.736,146.834a146.371,146.371,0,0,0,19.5,73.45,18.56,18.56,0,0,0,17.707,9.173c3.931-.346,8.825-.835,14.643-1.518a10.383,10.383,0,0,0,9.209-10.306V353.152"
                                                data-name="Path 1" id="Path_1"></path>
                                              <path
                                                d="M244.417,398.641A146.808,146.808,0,0,0,477.589,279.9c0-3.381-.157-6.724-.383-10.049-53.642,80-152.686,117.4-232.79,128.793"
                                                data-name="Path 2" id="Path_2" transform="translate(35.564 80.269)">
                                              </path>
                                            </g>
                                          </svg></div>
                                      </div>
                                    </a>
                                    <button className="kXZare kdWcfm ButtonGroupreact__StyledButton-sc-1skvztv-0 eztnHW"
                                      type="button">
                                      <div className="kBjTDg jYqxGr">
                                        <i className="dVAVbi material-icons">more_vert</i>
                                      </div>
                                    </button>

                                  </div>
                                </div>
                              </div>
                              <div className="fresnel-container fresnel-lessThan-lg "></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ejFaWs Panel--isFramed">
                    <div className="hypfZU Panel--panel">
                      <button className="btgkrL BasePanel--header Panel--header" type="button">
                        <i className="dVAVbi Panel--icon material-icons Panel--icon">ballot</i>
                        <span>Details</span>
                      </button>
                      <div className="BasePanel--body Panel--body">
                        <div className="Panel--content-container" style={{height: "initial"}}>
                          <div className="Panel--isContentPadded">
                            <div className="elqhCm">
                              <div className="elqhCm jYqxGr gJwgfT bcOZrk">
                                Contract Address
                                <span className="elqhCm cCfKUE kPPsrX">
                                  <a className="ekTmzq" href="/" rel="nofollow noopener" target="_blank">0xd9f0...2fae</a>
                                </span>
                              </div>
                              <div className="elqhCm jYqxGr gJwgfT bcOZrk">
                                Token ID
                                <span className="elqhCm cCfKUE kPPsrX">
                                  <a className="ekTmzq" href="/" rel="nofollow noopener" target="_blank">4326</a>
                                </span>
                              </div>
                              <div className="elqhCm jYqxGr gJwgfT bcOZrk">
                                Token Standard
                                <span className="elqhCm cCfKUE kPPsrX">ERC-721</span>
                              </div>
                              <div className="elqhCm jYqxGr gJwgfT bcOZrk">
                                Blockchain
                                <span className="elqhCm cCfKUE kPPsrX">Ethereum</span>
                              </div>
                              <div className="elqhCm jYqxGr gJwgfT bcOZrk">
                                Creator Fees
                                <span className="elqhCm cCfKUE kPPsrX">5%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="col-md-7">
                <div className="fhezOG">
                  <section className="item--header">
                    <div className="item--collection-info">

                      <div className="item--collection-detail">
                        <div className="jMcPQU">
                          <a className="ekTmzq CollectionLink--link" href="/">
                            <div className="elqhCm">Baby Doge Army</div>
                          </a>
                        </div>
                      </div>

                      <div className="item--collection-toolbar-wrapper">
                        <div className="elqhCm jYqxGr daKevg">
                          <button className="kXZare jdSrqf ButtonGroupreact__StyledButton-sc-1skvztv-0 eztnHW"
                            type="button">
                            <div aria-hidden="true" className="kBjTDg jYqxGr"><i value="refresh" size="24"
                                className="dVAVbi material-icons">refresh</i></div>
                          </button>
                          <a className="ekTmzq kXZare jdSrqf ButtonGroupreact__StyledButton-sc-1skvztv-0 eztnHW"
                            href="https://babydogenft.com/" rel="nofollow noopener" target="_blank">
                            <div aria-hidden="true" className="kBjTDg jYqxGr"><i value="open_in_new" size="24"
                                className="dVAVbi material-icons">open_in_new</i></div>
                          </a><button className="kXZare jdSrqf ButtonGroupreact__StyledButton-sc-1skvztv-0 eztnHW"
                            type="button" aria-expanded="false">
                            <div aria-hidden="true" className="kBjTDg jYqxGr"><i value="share" size="24"
                                className="dVAVbi material-icons">share</i></div>
                          </button><button aria-label="More"
                            className="kXZare jdSrqf ButtonGroupreact__StyledButton-sc-1skvztv-0 eztnHW" type="button"
                            aria-expanded="false">
                            <div aria-hidden="true" className="kBjTDg jYqxGr"><i value="more_vert" size="24"
                                className="dVAVbi material-icons">more_vert</i></div>
                          </button></div>
                      </div>
                    </div>
                    <h1 className="elqhCm item--title" title={asset.name}>{asset.name}</h1>
                  </section>

                  <section className="item--counts">
                    <div className="kyhBeu jYqxGr ksFzlZ iXcsEj cgnEmv">
                      <div className="elqhCm fkuTPI AccountLink--ellipsis-overflow">
                        Owned by&nbsp;
                        <a className="hubhNL laCjUo AccountLink--ellipsis-overflow" href="/">
                          <span>{asset.owner?.user?.username || "Null"}</span>
                        </a>
                      </div>
                    </div>
                    <div className="cayhdi">
                      <div className="jqNBiE jYqxGr ksFzlZ iXcsEj cgnEmv">
                        <i className="dVAVbi material-icons">visibility</i>
                      </div>
                      1.9K views
                    </div>
                    <button className="btgkrL cayhdi iMVWtI" type="button">
                      <div className="jqNBiE jYqxGr ksFzlZ iXcsEj cgnEmv">
                        <i value="favorite" size="24" className="dVAVbi material-icons">favorite</i></div>
                      43 favorites
                    </button>
                  </section>
                </div>

                <div className="card--container mb-4 hYKIws">
                  {
                    !(order?.orders.length) ? 
                    <>
                    <div className="item--frame">
                      <div className="sc-o1vm2f-2 huRwzY">
                          <section className="sc-1xf18x6-0 sc-139h1ex-0 hDbqle eGJCNc">
                            <div className="TradeStation--main">
                                <div className="sc-1xf18x6-0 hDbqle d-flex">
                        <button type="button" className="bUHoWN jzlogA me-3" data-bs-toggle="modal" data-bs-target="#buyModal">
                            <div aria-hidden="true" className="gNHYAf kKpYwv">
                                <i value="account_balance_wallet" className="fTdhIH material-icons">account_balance_wallet</i>
                            </div>
                            Buy now
                        </button>
                        <div className="modal fade" id="buyModal" tabIndex="-1" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable custom-modal">
                              <div className="modal-content">
                                  <header>
                                      <h4 className="modal-title">Complete checkout</h4>
                                  </header>
                                  <section>
                                          <div className="sticky-head">
                                              <div className="col">Item</div>
                                              <div className="col-3 text-end">Subtotal</div>
                                          </div>

                                          <div className="row section--row align-items-center">
                                              <div className="avatar--container">
                                                  <img className="avatar--image" src="https://lh3.googleusercontent.com/JmF8l3y3Mzp5gOaoyXzin9VWL_cK1OqBKBcjIbzgYiJrYGrASdTtyax7ZMByeK10D0Q4uD1P8dIZw5g2xxSIdLQrzDjTD1pYhDXb=w600"/>
                                              </div>
                                              <div className="col">
                                                  <div className="d-flex align-items-center">
                                                      <a className="link--title" href=""> Faucet721 </a>
                                                      <a href="">
                                                        <svg className="verified--icon" viewBox="0 0 30 30">
                                                            <path d="M13.474 2.80108C14.2729 1.85822 15.7271 1.85822 16.526 2.80108L17.4886 3.9373C17.9785 4.51548 18.753 4.76715 19.4892 4.58733L20.9358 4.23394C22.1363 3.94069 23.3128 4.79547 23.4049 6.0278L23.5158 7.51286C23.5723 8.26854 24.051 8.92742 24.7522 9.21463L26.1303 9.77906C27.2739 10.2474 27.7233 11.6305 27.0734 12.6816L26.2903 13.9482C25.8918 14.5928 25.8918 15.4072 26.2903 16.0518L27.0734 17.3184C27.7233 18.3695 27.2739 19.7526 26.1303 20.2209L24.7522 20.7854C24.051 21.0726 23.5723 21.7315 23.5158 22.4871L23.4049 23.9722C23.3128 25.2045 22.1363 26.0593 20.9358 25.7661L19.4892 25.4127C18.753 25.2328 17.9785 25.4845 17.4886 26.0627L16.526 27.1989C15.7271 28.1418 14.2729 28.1418 13.474 27.1989L12.5114 26.0627C12.0215 25.4845 11.247 25.2328 10.5108 25.4127L9.06418 25.7661C7.86371 26.0593 6.6872 25.2045 6.59513 23.9722L6.48419 22.4871C6.42773 21.7315 5.94903 21.0726 5.24777 20.7854L3.86969 20.2209C2.72612 19.7526 2.27673 18.3695 2.9266 17.3184L3.70973 16.0518C4.10824 15.4072 4.10824 14.5928 3.70973 13.9482L2.9266 12.6816C2.27673 11.6305 2.72612 10.2474 3.86969 9.77906L5.24777 9.21463C5.94903 8.92742 6.42773 8.26854 6.48419 7.51286L6.59513 6.0278C6.6872 4.79547 7.86371 3.94069 9.06418 4.23394L10.5108 4.58733C11.247 4.76715 12.0215 4.51548 12.5114 3.9373L13.474 2.80108Z">
                                                            </path>
                                                            <path d="M13.5 17.625L10.875 15L10 15.875L13.5 19.375L21 11.875L20.125 11L13.5 17.625Z" fill="white" stroke="white"></path>
                                                        </svg>
                                                      </a>
                                                  </div>
                                                  <div className="nft-title">Test #2</div>
                                              </div>
                                              <div className="col-3 text-end">
                                                  <div className="d-flex justify-content-end  align-items-center">
                                                      <a href="" rel="nofollow noopener" target="_blank">
                                                          <img className="coin-logo" alt="ETH" src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"/>
                                                      </a>
                                                      <div className="fontSize-1">0.1</div>
                                                  </div>
                                                  <div className="fontSize-3">$40.56</div>
                                              </div>
                                          </div>       
                                                              
                                          <div className="row align-items-center  section--row">
                                              <div className="col"> Total </div>
                                              <div className="col-3 text-end">
                                                  <div className="d-flex justify-content-end align-items-center">
                                                      <a href="/" rel="nofollow noopener" target="_blank">
                                                        <img className="coin-logo" src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg" />
                                                      </a>
                                                      <div className="fontSize-2">0.1</div>
                                                  </div>
                                                  <div>$40.56</div>
                                              </div>                                            
                                          </div>

                                          <div className="d-flex align-items-center gap-2 mt-3">
                                              <input id="agreeInTerms" type="checkbox"/>
                                              <label for="agreeInTerms">I agree to OpenSea's <a target="_blank" href="">Terms of Service</a></label>
                                          </div>
                                        </section>
                                        <footer className="d-flex justify-content-center gap-2 mb-3 mt-5">
                                          <button className="confirm--btn" type="button">Confirm checkout</button>
                                          <button className="addFunds--btn" type="button" data-bs-toggle="modal" data-bs-target="#addFunds">Add Funds</button>
                                        </footer>
                                        
                                        <button type="button" className="btn--close" data-bs-dismiss="modal">
                                          <i className="material-icons">close</i>
                                        </button>
                                    </div>
                                    </div>
                                </div>
                                  <div width="100%,100%,100%,50%" className="sc-1xf18x6-0 sc-9jbsog-0 igRgty iyyTkb">
                                      <button data-bs-toggle="modal" data-bs-target="#createOrderModal" width="100%" type="button" className="sc-1xf18x6-0 sc-glfma3-0 bUHoWN iACHcE">
                                        <div aria-hidden="true" className="sc-1xf18x6-0 sc-1twd32i-0 gNHYAf kKpYwv"><i value="local_offer" size="24" className="sc-1gugx8q-0 fTdhIH material-icons">local_offer</i></div>
                                        Make offer
                                      </button>
                                  </div>
                                </div>
                            </div>
                          </section>
                      </div>
                    </div>
                    </> : <>
                    <div className="TradeStation--main">
                      <div className="TradeStation--ask-label">Highest bid</div>
                      <div className="TradeStation--price-container align-items-center">
                        <div className="iBLrYW Price--main TradeStation--price">
                          <div cursor="pointer" className="fdhxMV">
                            <a className="ekTmzq" href="/" rel="nofollow noopener" target="_blank">
                              <div className=" AMWWS jYqxGr ksFzlZ iXcsEj cgnEmv dukFGY">
                                <img alt="WETH" className="AMWWS hzWBaN"
                                  src="https://openseauserdata.com/files/accae6b6fb3888cbff27a013729c22dc.svg" size="24"/>
                              </div>
                            </a>
                          </div>
                          <div className="jPSCbX Price--amount">{(parseFloat(order.orders[0].basePrice) * 0.000000000000000001).toFixed(6)}</div>
                        </div>

                        <div className="Price--fiat-amount Price--fiat-amount-secondary ps-2">(${parseFloat(order.orders[0].paymentTokenContract.usdPrice || 0).toFixed(2)})</div>

                        <div className=" elqhCm jYqxGr ksFzlZ iXcsEj">
                          <i className="jfXYrJ TradeStation--price-auction-icon TradeStation--price-auction-icon-rising material-icons TradeStation--price-auction-icon TradeStation--price-auction-icon-rising"
                            cursor="pointer" defaultValue="transit_enterexit" size="24">transit_enterexit</i></div>
                      </div>
                      <div display="block,block,block,flex" className="cVpiON">
                        <div className="elqhCm" style={{width: "100%", display: "contents"}}>
                          <div width="[object Object]" className="InlineFlexreact__InlineFlex-sc-9jbsog-0 dFJJZm czWSvr">
                            <button type="button" data-bs-toggle="modal" data-bs-target="#createOrderModal" className="dpXlkZ fzwDgL">
                              <div aria-hidden="true" className="fOxaJL jYqxGr"><i value="account_balance_wallet" size="24"
                                  className="dVAVbi material-icons">account_balance_wallet</i>
                              </div>Place bid
                            </button></div>
                        </div>
                      </div>
                    </div>
                  </>
                  }
                  {order && console.log(order)}
                </div>

                <div className="card--container mb-4">
                  <div className="no-border ejFaWs Panel--isFramed hypfZU Panel--panel">
                    <button className="btgkrL BasePanel--header Panel--header" type="button">
                      <i className="dVAVbi Panel--icon material-icons Panel--icon">toc</i>
                      <span>Offers</span>
                    </button>
                    <div className="BasePanel--body Panel--body">
                      <div className="Panel--content-container" style={{height: "initial"}}>
                        <div>
                          <div className="Ordersreact__DivContainer-sc-1pqzv02-0 cgpQZE">
                        <div className="Blockreact__Block-sc-1xf18x6-0 jNeTzY">
                          <ul role="table" className="Tablereact__TableContainer-sc-120fhmz-0 hbKtaP">
                              <li role="row" className="Tablereact__TableRow-sc-120fhmz-1 fwzXIM">
                                <div className="Blockreact__Block-sc-1xf18x6-0 Tablereact__TableCellContainer-sc-120fhmz-2 elqhCm jKElJJ" role="columnheader">
                                    <div className="Overflowreact__OverflowContainer-sc-7qr9y8-0 jPSCbX" tabIndex="-1">Price</div>
                                </div>
                                <div className="Blockreact__Block-sc-1xf18x6-0 Tablereact__TableCellContainer-sc-120fhmz-2 elqhCm jKElJJ" role="columnheader">
                                    <div className="Overflowreact__OverflowContainer-sc-7qr9y8-0 jPSCbX" tabIndex="-1">USD Price</div>
                                </div>
                                <div className="Blockreact__Block-sc-1xf18x6-0 Tablereact__TableCellContainer-sc-120fhmz-2 elqhCm jKElJJ" role="columnheader">
                                    <div className="Overflowreact__OverflowContainer-sc-7qr9y8-0 jPSCbX" tabIndex="-1">Floor Difference</div>
                                </div>
                                <div className="Blockreact__Block-sc-1xf18x6-0 Tablereact__TableCellContainer-sc-120fhmz-2 elqhCm jKElJJ" role="columnheader">
                                    <div className="Overflowreact__OverflowContainer-sc-7qr9y8-0 jPSCbX" tabIndex="-1">Expiration</div>
                                </div>
                                <div className="Blockreact__Block-sc-1xf18x6-0 Tablereact__TableCellContainer-sc-120fhmz-2 elqhCm jKElJJ" role="columnheader">
                                    <div className="Overflowreact__OverflowContainer-sc-7qr9y8-0 jPSCbX" tabIndex="-1">From</div>
                                </div>
                                <div className="Blockreact__Block-sc-1xf18x6-0 Tablereact__TableCellContainer-sc-120fhmz-2 elqhCm jKElJJ Orders--actions-column" role="columnheader">
                                    <div className="Overflowreact__OverflowContainer-sc-7qr9y8-0 jPSCbX" tabIndex="-1"></div>
                                </div>
                              </li>
                              {
                                order ? 
                                order.orders.map( e => {
                                return <li role="row" className="Tablereact__TableRow-sc-120fhmz-1 fwzXIM">
                                  <div className="Blockreact__Block-sc-1xf18x6-0 Tablereact__TableCellContainer-sc-120fhmz-2 elqhCm kTLznA" role="cell">
                                      <div className="Overflowreact__OverflowContainer-sc-7qr9y8-0 jPSCbX" tabIndex="-1">
                                        <div className="Pricereact__DivContainer-sc-t54vn5-0 iBLrYW Price--main">
                                            <div cursor="pointer" className="Blockreact__Block-sc-1xf18x6-0 fdhxMV">
                                              <a className="styles__StyledLink-sc-l6elh8-0 ekTmzq" href="https://support.opensea.io/hc/en-us/articles/360063498293-What-s-WETH-How-do-I-get-it-" rel="nofollow noopener" target="_blank">
                                                  <div size="16" className="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 FlexColumnreact__FlexColumn-sc-1wwz3hp-0 VerticalAlignedreact__VerticalAligned-sc-b4hiel-0 CenterAlignedreact__CenterAligned-sc-cjf6mn-0 Avatarreact__AvatarContainer-sc-sbw25j-0 dGKsYK jYqxGr ksFzlZ iXcsEj cgnEmv dukFGY">
                                                  <img alt="WETH" className="Blockreact__Block-sc-1xf18x6-0 Avatarreact__ImgAvatar-sc-sbw25j-1 dGKsYK hzWBaN" src="https://openseauserdata.com/files/accae6b6fb3888cbff27a013729c22dc.svg" size="16"/></div>
                                              </a>
                                            </div>
                                            <div className="Overflowreact__OverflowContainer-sc-7qr9y8-0 jPSCbX Price--amount" tabIndex="-1">{(parseFloat(e.basePrice) * 0.000000000000000001).toFixed(6)}<span className="Price--raw-symbol">WETH</span></div>
                                        </div>
                                      </div>
                                  </div>
                                  <div className="Blockreact__Block-sc-1xf18x6-0 Tablereact__TableCellContainer-sc-120fhmz-2 elqhCm kTLznA" role="cell">
                                      <div className="Overflowreact__OverflowContainer-sc-7qr9y8-0 jPSCbX" tabIndex="-1"><span font-size="14px" className="Blockreact__Block-sc-1xf18x6-0 Textreact__Text-sc-1w94ul3-0 cKQpdV dUfmNR">${parseFloat(e.paymentTokenContract.usdPrice || 0).toFixed(2)}</span></div>
                                  </div>
                                  <div className="Blockreact__Block-sc-1xf18x6-0 Tablereact__TableCellContainer-sc-120fhmz-2 elqhCm kTLznA" role="cell">
                                      <div className="Overflowreact__OverflowContainer-sc-7qr9y8-0 jPSCbX" tabIndex="-1">
                                        <div className="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 elqhCm jYqxGr">
                                            <div cursor="pointer" className="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 fdhxMV jYqxGr"><span font-size="14px" className="Blockreact__Block-sc-1xf18x6-0 Textreact__Text-sc-1w94ul3-0 jCpyRY dUfmNR">33% below</span></div>
                                        </div>
                                      </div>
                                  </div>
                                  <div className="Blockreact__Block-sc-1xf18x6-0 Tablereact__TableCellContainer-sc-120fhmz-2 elqhCm kTLznA" role="cell">
                                      <div className="Overflowreact__OverflowContainer-sc-7qr9y8-0 jPSCbX" tabIndex="-1"><span font-size="14px" className="Blockreact__Block-sc-1xf18x6-0 Textreact__Text-sc-1w94ul3-0 cKQpdV dUfmNR">{timeSince(new Date(e.createdTime))}</span></div>
                                  </div>
                                  <div className="Blockreact__Block-sc-1xf18x6-0 Tablereact__TableCellContainer-sc-120fhmz-2 elqhCm kTLznA" role="cell">
                                      <div className="Overflowreact__OverflowContainer-sc-7qr9y8-0 jPSCbX" tabIndex="-1">
                                        <div className="Blockreact__Block-sc-1xf18x6-0 AccountLinkreact__DivContainer-sc-4gdciy-0 elqhCm fkuTPI AccountLink--ellipsis-overflow" data-testid="AccountLink"><a className="styles__StyledLink-sc-l6elh8-0 hubhNL Blockreact__Block-sc-1xf18x6-0 laCjUo AccountLink--ellipsis-overflow" fontWeight="inherit" href="/Sofai168888"><span>Sofai168888</span></a></div>
                                      </div>
                                  </div>
                                  <div className="Blockreact__Block-sc-1xf18x6-0 Tablereact__TableCellContainer-sc-120fhmz-2 elqhCm kTLznA Orders--actions-column" role="cell">
                                      <div className="Overflowreact__OverflowContainer-sc-7qr9y8-0 jPSCbX" tabIndex="-1">
                                        <div className="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 ideQHU jYqxGr"></div>
                                      </div>
                                  </div>
                                </li>
                                }) : "No Offers"
                              }
                              
                          </ul>
                          <div className="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 FlexColumnreact__FlexColumn-sc-1wwz3hp-0 VerticalAlignedreact__VerticalAligned-sc-b4hiel-0 CenterAlignedreact__CenterAligned-sc-cjf6mn-0 elqhCm jYqxGr ksFzlZ iXcsEj cgnEmv"></div>
                          </div>
                      </div>
                    </div>
                    </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            <Footer/>
          </div>
        </section>
      </main>
      </> : 
      <>
        <center>
          <div className="display-6 p-5">Loading Asset...</div>
        </center>
      </>
      }
    </>
}

export default Details