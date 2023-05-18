const {NewWeb3AndContract, SendTransaction, SendTxOnce} = require("./app");
const {GetTimeForSeconds} = require("./tools/tool");
const {SetENV} = require("./tools/cmd");
require('dotenv').config();


function main() {
    let {CHAIN_URL,PRIVATE_KEY,CHECK_TIME,TX_WAIT_TIME,PRIORITY_FEE,TX_MAX_FEE_PRE_GASLIMIT,EXECUTE} = process.env;

    if (!CHAIN_URL || !PRIVATE_KEY || !CHECK_TIME || !TX_WAIT_TIME || !PRIORITY_FEE || !TX_MAX_FEE_PRE_GASLIMIT || !EXECUTE) {
        const setEnvResult = SetENV();
        CHAIN_URL = setEnvResult.chainUrl;
        PRIVATE_KEY = setEnvResult.privateKey;
        CHECK_TIME = setEnvResult.checkTime;
        TX_WAIT_TIME = setEnvResult.txWaitTime;
        PRIORITY_FEE = setEnvResult.priorityFee;
        TX_MAX_FEE_PRE_GASLIMIT = setEnvResult.txMaxFeePreGasLimit;
        EXECUTE = setEnvResult.execute;
    }
    console.log(`sendtx start, chainUrl: ${CHAIN_URL}, checkTime: ${CHECK_TIME}, txWaitTime: ${TX_WAIT_TIME}, priorityFee: ${PRIORITY_FEE}, txMaxFeePreGasLimit: ${TX_MAX_FEE_PRE_GASLIMIT}, execute: ${EXECUTE}`)

    const {web3, contracts} = NewWeb3AndContract(CHAIN_URL)
    let errorNum = 0;
    console.log("start send tx", new Date().toLocaleString());
    let startTime = GetTimeForSeconds();
    console.log("startTime: ", startTime)
    const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    if (EXECUTE === "1" ) {
        SendTxOnce(web3, contracts,account,TX_MAX_FEE_PRE_GASLIMIT,TX_WAIT_TIME,PRIORITY_FEE).then(() => {
            console.log("send tx successful ", new Date().toLocaleString());
        }).catch((error) => {
            console.error("send tx error ", error);
        })
        return;
    }
    setInterval(async () => {
        try {
            console.log("start check ",new Date().toLocaleString());
            startTime = await SendTransaction(web3, contracts, startTime,account,TX_MAX_FEE_PRE_GASLIMIT,TX_WAIT_TIME,PRIORITY_FEE)
        } catch (e) {
            console.error("error: ", e)
            errorNum++;
            console.error("errorNum: ", errorNum)
            if (errorNum > 3) {
                console.log("errorNum > 3, exit");
                process.exit(1);
            }
        }
        console.log("check successful ", new Date().toLocaleString());
    }, CHECK_TIME * 60000 || 60000)
}

main()