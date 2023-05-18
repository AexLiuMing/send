
# sendTx

## Usage

    1.yarn
    2.yarn start

## .env


```
CHAIN_URL=''

PRIVATE_KEY=''

CHECK_TIME=60 Check time="Cycle every time in minutes

TX_WAIT_TIME=1 The number of minutes to wait for the first transaction failure. After waiting, use this nonce to initiate the transaction again

PRIORITY_FEE=2.5 Priority fee defaults to 1.5gwei

TX_MAX_FEE_PRE_GASLIMIT=1000 The default maximum cost is 500gwei. If the altitude exceeds this, the program will exit

EXECUTE=1

[
  {
    "contractName": "test",
    "address": "0x405718D06edFB42026D6E419880CDA05bF3117AF",
    "abiPath": "./abis/test.json",
    "functions": [
      {
        "functionName": "setDatas",
        "callTime": 2
      },
      {
        "functionName": "setTestdata",
        "params": ["10"],
        "callTime": 3
      }
    ]
  }
]


[
  {
    "contractName": "MegaPoker",
    "address": "0xDC6163c353500E38A56edF87a8191B6120B70F57",
    "abiPath": "./abis/MegaPoker.json",
    "functions": [
      {
        "functionName": "poke",
        "callTime": 3,
        "gasLimit": 500000
      }
    ]
  }
]






```

ContractName: Contract Name

Address: Contract address

AbiPath: abi file path

Functions: The method to be called

FunctionName: Method name

Params: parameters

CallTime: The call time interval is measured in minutes

gasLimit: gasLimit


docker run -d \
-v "abis":/app/src/abis \
-v "contract.json":/app/src/contract.json \
-v ".env":/app/.env \
--name sendtx \
ghcr.io/aexliuming/sendtx:latest


yarn helps


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
