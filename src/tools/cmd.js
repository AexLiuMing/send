function SetENV() {
    const args = process.argv.slice(2);
    const options = {};

    args.forEach(arg => {
        const [key, value] = arg.split('=');
        if (key && value) {
            options[key.replace('--', '')] = value;
        }
    });
    const chainUrl = options.CHAIN_URL;
    const privateKey = options.PRIVATE_KEY;
    const checkTime = options.CHECK_TIME;
    const txWaitTime = options.TX_WAIT_TIME;
    const priorityFee = options.PRIORITY_FEE;
    const txMaxFeePreGasLimit = options.TX_MAX_FEE_PRE_GASLIMIT;
    const execute = options.EXECUTE;

    return {chainUrl, privateKey, checkTime, txWaitTime, priorityFee, txMaxFeePreGasLimit, execute}
}

module.exports = {
    SetENV
}