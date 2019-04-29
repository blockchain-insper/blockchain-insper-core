// import * as IPFS from 'ipfs-http-client';

const ipfsClient = require('ipfs-http-client')

const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

// To run with local ipfs daemon use code below
// const ipfsApi = require(‘ipfs-api’);
// const ipfs = new ipfsClient('/ip6/::1/tcp/4001');

export default {
  ipfs
}