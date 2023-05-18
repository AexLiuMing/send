const Web3 = require("web3");
const path = require('path');
const {OpenJsonFileOut, GetGasFees, GetTimeForSeconds, IsTransactionPending} = require("./tools/tool");
const config = path.join(__dirname, './contract.json');
const chainContractsDates = OpenJsonFileOut(config);

// new web3 and contract
function NewWeb3AndContract() {
    const web3 = new Web3(process.env.CHAINURL);
    let contracts = [];

    for (const {abiPath, address} of chainContractsDates) {
        const abi = require(abiPath);
        const contract = new web3.eth.Contract(abi, address);
        contracts.push(contract);
    }

    return {web3, contracts};
}

// send sign tx
async function sendTx(web3, signedTx, nonce, funcName) {
    console.log(`start send tx: ${funcName} , nonce: ${nonce}`)
    const tx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    await new Promise(resolve => setTimeout(resolve, process.env.TxWaitTime * 60000 || 60000))
    const pending = await IsTransactionPending(web3, tx.transactionHash);
    if (pending) {
        console.log(`this tx is pending, so we will send again, nonce: ${nonce}, functionName: ${funcName}`)
        nonce--;
        return nonce;
    }
    console.log(`send tx success, txHash: ${tx.transactionHash}, nonce: ${nonce}, functionName: ${funcName}`)
}


async function SendTransaction(web3, contracts, startTime, account) {
    let nonce = await web3.eth.getTransactionCount(account.address);
    console.log("nonce: ", nonce)
    const nowTime = GetTimeForSeconds();
    for (let i = 0; i < chainContractsDates.length; i++) {
        const contract = contracts[i];
        for (const func of chainContractsDates[i].functions) {
            const callTime = func.callTime;
            const time = nowTime - startTime
            console.log(`nowTime: ${nowTime}, startTime: ${startTime}, callTime: ${callTime}, time: ${time}`)
            if (time >= callTime) {
                startTime = nowTime;
                await sendTransactionForFunction(web3, contract, func, account, nonce);
                nonce++;
            }
        }
    }
    return startTime;
}

async function sendTransactionForFunction(web3, contract, func, account, nonce) {
    const {functionName} = func;
    const inputParams = func.params || [];
    const contractAddress = contract.options.address;
    console.log(`start send tx,contractAddress:${contractAddress}, nonce: ${nonce}, functionName: ${functionName}`);

    const callData = contract.methods[functionName](...inputParams).encodeABI();
    const {txMaxPriorityFeePerGas, txMaxFeePerGas} = await GetGasFees(web3);
    const txMaxFeePerGasLimitForEnv = process.env.txMaxFeePerGasLimit || 500;
    const maxFee = Math.round(Number(txMaxFeePerGas) * 1.05);

    if (Number(maxFee) > txMaxFeePerGasLimitForEnv * Math.pow(10, 9)) {
        console.log(`maxFeePerGas is very high, better than ${txMaxFeePerGasLimitForEnv} gwei, now is ${txMaxFeePerGas}, so exit`);
        process.exit(1);
    }

    const limit = func.gasLimit || await contract.methods[functionName](...inputParams).estimateGas({from: account.address});

    const txParams = {
        from: account.address,
        to: contractAddress,
        maxPriorityFeePerGas: web3.utils.toHex(Number(txMaxPriorityFeePerGas)),
        maxFeePerGas: web3.utils.toHex(maxFee),
        gasLimit: web3.utils.toHex(Math.round(limit * 1)),
        data: callData,
        nonce: nonce,
    };

    const signedTx = await account.signTransaction(txParams);

    try {
        await sendTx(web3, signedTx, nonce, functionName);
    } catch (e) {
        console.log(`error: ${e.message}, nonce: ${nonce}, functionName: ${functionName}, params: ${inputParams}`);
        console.log("start await, repeated attempts to send transactions");
        await new Promise(resolve => setTimeout(resolve, process.env.TxWaitTime * 60000 || 15000));
        nonce++;
        await sendTx(web3, signedTx, nonce, functionName);

    }
}


module.exports = {
    NewWeb3AndContract,
    SendTransaction
}
