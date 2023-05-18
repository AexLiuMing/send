
# sendTx

## Usage

    1.yarn
    2.yarn start

## .env


```
PRIVATE_ KEY=''

CHECK_ TIME=60 Check time="Cycle every time in minutes

TxWaitTime=1 The number of minutes to wait for the first transaction failure. After waiting, use this nonce to initiate the transaction again

PriorityFeeFromEnv=2.5 Priority fee defaults to 1.5gwei

TxMaxFeePerGasLimit=1000 The default maximum cost is 500gwei. If the altitude exceeds this, the program will exit


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
