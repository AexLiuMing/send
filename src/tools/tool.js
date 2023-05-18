const fs = require("fs");

// OpenJsonFileOut opens a JSON file and returns the parsed JSON.
function OpenJsonFileOut(path) {
    try {
        const data = fs.readFileSync(path, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error(`Failed to read config file ${path}: file does not exist`);
        } else {
            console.error(`Failed to read or parse config file ${path}: ${err.message}`);
        }
        process.exit(1);
    }
}
async function GetGasFees(web3) {
    try {
        const block = await web3.eth.getBlock('latest');
        const baseFee = BigInt(block.baseFeePerGas);
        const priorityFeeFromEnv = process.env.priorityFee || 1.5
        const priorityFee = priorityFeeFromEnv * Math.pow(10, 9);
        const txMaxPriorityFeePerGas = BigInt(priorityFee);
        const txMaxFeePerGas = baseFee + txMaxPriorityFeePerGas;
        console.log(`txMaxFeePerGas: ${txMaxFeePerGas},txMaxPriorityFeePerGas: ${txMaxPriorityFeePerGas}`)
        return { txMaxPriorityFeePerGas, txMaxFeePerGas };
    } catch (error) {
        console.error("Error getting gas fees:", error);
        process.exit(1);
    }
}

function GetTimeForSeconds(){
    const now = Date.now();
    return Math.floor(now / 60000);  //Accurate to minutes
}

async function IsTransactionPending(web3, txHash) {
    const receipt = await web3.eth.getTransactionReceipt(txHash);
    return receipt === null;
}



module.exports = {
    OpenJsonFileOut,
    GetGasFees,
    GetTimeForSeconds,
    IsTransactionPending
};