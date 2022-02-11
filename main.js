const config = require('./config.json')
const fs = require('fs')
const {dirname} = require('path')
const {exec} = require('child_process')

const cacheFilePath = `${config.cmv2_path}/.cache/${config.cache_file_name}`
const cacheFile = JSON.parse(fs.readFileSync(cacheFilePath))
const metaUris = []

Object.values(cacheFile.items).forEach(v => {
  metaUris.push(v.link) // gets link from the original metadata file stored on arweave
})

// the following command navigates to your CMv2 directory and launches the command to fetch mint addresses
const script = `cd ${config.cmv2_path} && ts-node js/packages/cli/src/candy-machine-v2-cli.ts get_all_mint_addresses -e ${config.environment} -k ${config.keypair}`

let metadata = []

const getNewMetadata = async () => {
  await exec(script, ((error, stdout) => {
    const data = '[' + stdout.split('[')[1] // extracts the interesting part
    const addresses = JSON.parse(data)

    metadata = metaUris.map((uri, index) => {
      return {"mint_account": addresses[index], "new_uri": uri}
    })

    fs.mkdir(dirname(config.output), { recursive: true}, (e) => {
      if (e) return e
      fs.writeFileSync(config.output, JSON.stringify(metadata))
    })
  }))
}

getNewMetadata()
