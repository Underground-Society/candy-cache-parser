```
  ____ ____ ____
 / ___/ ___|  _ \
| |  | |   | |_) |
| |__| |___|  __/
 \____\____|_|
```
[![GitHub License](https://github-basic-badges.herokuapp.com/license/Underground-Society/candy-cache-parser.svg)]()
---
# candy-cache-parser

## What it does
This little helper lets you generate a json metadata file for Solana NFT mutation with Metaboss after a 'hiddenSettings' mint.
It takes your Metaplex cache file and creates a brand new json file corresponding to the expected format by Metaboss for batch update.

## How it works
Just fill the config.json file with the requested information


```json
{
  "environment": "mainnet", // devnet or mainnet
  "cache_file_name": "mainnet-temp.json", // the name of the file in metaplex/.cache/ that you wish to use
  "cmv2_path": "/Users/<USER>/metaplex", // the path to your metaplex folder
  "keypair": "/Users/<USER>/wallet/wallet.json", // the path to your keypair you've been using for the candy machine
  "output": "./output/metadata.json" // you can leave this as is, this is the output path for your generated file
}
```

Then run 
```
yarn ccp
```

After a few instants, your file should be ready in the output path you specified
It will look like:
```json
[
  {
    "mint_account": "yourFirstTokenMintAddress",
    "new_uri": "https://arweave.net/theActualUriOfThisNftWhichWontBeHiddenAnymore"
  },
  {
    "mint_account": "yourSecondTokenMintAddress",
    "new_uri": "https://arweave.net/yourSecondNFTMetadataFileWhichWillReplaceTheOldOne"
  },
  ...
]
```
## Roadmap
- Error Handling
- A nice CLI
- Ability to pass arweaves uris directly for cases metadata isn't uploaded from the beginning (would prevent people to find out metadata before reveal)

## License
[MIT License](LICENSE)