const {NewWeb3AndContract, SendTransaction} = require("./app");
const {GetTimeForSeconds} = require("./tools/tool");
require('dotenv').config();


function main() {
    const {web3, contracts} = NewWeb3AndContract()
    let errorNum = 0;
    console.log("start send tx", new Date().toLocaleString());
    let startTime = GetTimeForSeconds();
    console.log("startTime: ", startTime)
    const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
    setInterval(async () => {
        try {
            console.log("start check ",new Date().toLocaleString());
            startTime = await SendTransaction(web3, contracts, startTime,account)
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
    }, process.env.CHECK_TIME * 60000 || 60000)
}

main()