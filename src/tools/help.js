const helpMessage = `
Usage: yarn help [options]

Options:
  --CHAIN_URL=<chain_url>          The chain URL
  --PRIVATE_KEY=<private_key>      The private key
  --CHECK_TIME=<check_time>        The check time
  --TX_WAIT_TIME=<tx_wait_time>    The transaction wait time
  --PRIORITY_FEE=<priority_fee>    The priority fee
  --TX_MAX_FEE_PRE_GASLIMIT=<tx_max_fee_pre_gaslimit>    The maximum fee per gas limit
  --EXECUTE=<execute>              The execute flag

Examples:
  yarn start                           Display help and usage instructions
  yarn start --CHAIN_URL=example.com   Specify the chain URL
  yarn start --PRIVATE_KEY=abc123      Specify the private key
  yarn start --CHAIN_URL=your_chain_url --PRIVATE_KEY=your_private_key --CHECK_TIME=10 --TX_WAIT_TIME=1 --PRIORITY_FEE=2.0 --TX_MAX_FEE_PRE_GASLIMIT=1000 --EXECUTE=1

Note: You can also pass the options as command-line arguments without the "--" prefix.

`;

console.log(helpMessage);
