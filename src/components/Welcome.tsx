import { useState, useEffect, ChangeEvent } from "react"
import { SiEthereum } from "react-icons/si"
import { BsInfoCircle } from "react-icons/bs"
import Input from "./Input"
import { Loader } from "."
import { ConnectButton } from "web3uikit"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../../constant"
import { BigNumberish, TransactionResponse, ethers } from "ethers"

interface contractAddressesInterface {
    [key: string]: string[]
}

export default function Welcome() {
    const commonStyle: string =
        "min-h-[70px] sm:px-0 px-2  flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white"

    const [width, setWidth] = useState(window.innerWidth)
    const [amount, setAmount] = useState("0")
    const [receiver, setReceiver] = useState("")
    const [keyword, setKeyword] = useState("")
    const [msg, setMsg] = useState("")
    const [txCount, setTxCount] = useState("")
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()

    const chainId: string = parseInt(chainIdHex!).toString()
    const addresses: contractAddressesInterface = contractAddresses
    const contractAddress = chainId in addresses ? addresses[chainId][0] : null
    console.log(contractAddress)
    const {
        runContractFunction: transfer,
        isLoading,
        isFetching
    } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress!, // To specify network ID
        functionName: "someName",
        params: {
            receiver: receiver,
            amount: ethers.parseEther(amount),
            message: msg,
            keyword: keyword
        },
        msgValue: ethers.parseEther(amount)
    })

    const { runContractFunction: getTransactionsCount } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress!, // To specify network ID
        functionName: "getTransactionsCount",
        params: {}
    })

    // async function updateUI() {
    //     setTxCount(((await getTransactionsCount()) as BigNumberish).toString())
    // }

    async function updateUI() {
        try {
            const txCount = (
                (await getTransactionsCount()) as BigNumberish
            ).toString()
            setTxCount(txCount)
        } catch (error) {
            // Handle any errors
            console.error(error)
        }
    }

    useEffect(() => {
        updateUI()
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
        // !!!!!!!!!!!
        // The condition parameters should include isWeb3Enabled in order to let the
        // UI know when the UI is connected to the contract;; and the chainID is letting
        // us know when we change the wallet network.
        // !!!!!!!!!!!
    }, [isWeb3Enabled, chainId])

    const handleSubmit = async () => {
        if (isWeb3Enabled) {
            await transfer({
                onSuccess: async (tx) => {
                    handleSuccess(tx as TransactionResponse)
                    console.log(tx)
                },
                onError: (e) => console.log(e)
            })
        } else {
            alert("Please connect your wallet first!")
        }
    }

    const handleSuccess = async (tx: TransactionResponse) => {
        // !!!!!!!!!!!
        // We need to wait for the transaction to complete before updating the UI
        // !!!!!!!!!!!
        await tx.wait(1)
        updateUI()
    }

    return (
        <div className="w-full flex justify-center items-center ">
            <div className="flex md:flex-row flex-col items-start justify-between mf:p-20 py-12 px-4 md:max-w-[1200px] md:w-full gap-20">
                <div className="flex flex-1 justify-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Send Crypto <br /> across the world
                    </h1>

                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Explore the crypto world. Buy and sell cryptocurrencies
                        easily on Krypto.
                    </p>

                    {/* <button
                        type="button"
                        onClick={connectWallet}
                        className="flex flex-row justify-center items-center my-5 bg-[#2952e3] rounded-full cursor-pointer
                    hover:bg-[#2546bd] text-white py-3 text-base font-semibold"
                    >
                        Connect Wallet
                    </button> */}

                    <ConnectButton
                        moralisAuth={false}
                        className="connect-wallet-btn"
                        //     className="flex flex-row justify-center items-center my-5 bg-[#2952e3] rounded-full cursor-pointer
                        // hover:bg-[#2546bd] text-white py-3 text-base font-semibold"
                    />

                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`rounded-tl-2xl ${commonStyle}`}>
                            Reliabilty
                        </div>
                        <div
                            className={`${
                                width < 640 ? "rounded-tr-2xl" : ""
                            } ${commonStyle}`}
                        >
                            Security
                        </div>
                        <div
                            className={`${
                                width < 640 ? "" : "rounded-tr-2xl"
                            } ${commonStyle}`}
                        >
                            Ethereum
                        </div>

                        <div
                            className={`${
                                width < 640 ? "" : "rounded-bl-2xl"
                            } ${commonStyle}`}
                        >
                            Web 3.0
                        </div>
                        <div
                            className={`${
                                width < 640 ? "rounded-bl-2xl" : ""
                            } ${commonStyle}`}
                        >
                            Decentralized
                        </div>
                        <div className={`rounded-br-2xl ${commonStyle}`}>
                            Low Fees
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:h-72 w-full my-5 eth-card white-glassmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#fff" />
                                </div>
                                <BsInfoCircle
                                    fontSize={17}
                                    color="#fff"
                                    className="cursor-pointer"
                                />
                            </div>
                            <div>
                                <p className="text-white font-light text-sm">
                                    {account
                                        ? `Wallet address: ${account}`
                                        : "Please connect to your wallet"}
                                </p>
                                {txCount ? (
                                    <p className="text-white font-semibold text-lg mt-1">
                                        There already {txCount} transactions
                                        have been sent
                                    </p>
                                ) : (
                                    <p className="text-white font-semibold text-lg mt-1">
                                        Loading data...
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-5 sm:mt-6 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <Input
                            placeholder="Address To"
                            name="addressTo"
                            type="text"
                            handleChange={(
                                e: ChangeEvent<HTMLInputElement>
                            ) => {
                                setReceiver(e.target.value)
                            }}
                        />
                        <Input
                            placeholder="Amount (ETH)"
                            name="amount"
                            type="number"
                            handleChange={(
                                e: ChangeEvent<HTMLInputElement>
                            ) => {
                                setAmount(e.target.value)
                            }}
                        />
                        <Input
                            placeholder="Keyword (Gif)"
                            name="keyword"
                            type="text"
                            handleChange={(
                                e: ChangeEvent<HTMLInputElement>
                            ) => {
                                setKeyword(e.target.value)
                            }}
                        />
                        <Input
                            placeholder="Enter Message"
                            name="message"
                            type="text"
                            handleChange={(
                                e: ChangeEvent<HTMLInputElement>
                            ) => {
                                setMsg(e.target.value)
                            }}
                        />

                        <div className="h-[1px] w-full bg-gray-400 my-2" />

                        {true ? (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                            >
                                Send now
                            </button>
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
