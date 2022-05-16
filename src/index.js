import { providers, utils } from 'ethers';
import { ColonyNetwork } from '@colony/sdk';

const { formatUnits } = utils;

// If MetaMask is installed there will be an `ethereum` object on the `window`
// NOTE: Make sure MetaMask is connected to Gnosis chain (see https://www.xdaichain.com/for-users/wallets/metamask/metamask-setup)
const provider = new providers.Web3Provider(window.ethereum);

// Get the Colony's XDAI funding in the ROOT pot (id 1)
const start = async () => {
  // This will try to connect the page to MetaMask
  await provider.send('eth_requestAccounts', []);
  // Create a new connection to the Colony Network contracts using the MetaMask "wallet"
  const colonyNetwork = new ColonyNetwork(provider.getSigner());
  // Connect to the MetaColony (this could be replaced with your own colony using `colonyNetwork.getColony(COLONY_ADDRESS)`)
  const metaColony = await colonyNetwork.getMetaColony();
  // Get the CLNY funding for the MetaColony (CLNY is it's native token)
  const funding = await metaColony.getBalance();
  // The funding will be in wei (x * 10^18), so we format into a readable string using ethers' formatUnits function
  document.querySelector('#funding').innerHTML = formatUnits(funding) + ' CLNY';
};

start();
