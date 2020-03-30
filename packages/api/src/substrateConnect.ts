import { ApiPromise, WsProvider } from '@polkadot/api';
import { types } from '@subsocial/types/substrate/preparedTypes';
import { newLogger } from '@subsocial/utils';

const logger = newLogger('SubstrateConnection');
let api: ApiPromise;

export { api };
export class DfApi {

  protected static api: ApiPromise;

  protected static connected = false;

  public static connect = async (url?: string): Promise<ApiPromise> => {
    const rpcEndpoint = url || 'ws://127.0.0.1:9944/';
    const provider = new WsProvider(rpcEndpoint);

    // Create the API and wait until ready:
    logger.info(`Connecting to Substrate API at ${rpcEndpoint}`);
    DfApi.api = await ApiPromise.create({ provider, types });
    DfApi.connected = true

    return DfApi.api
  }

  public static disconnect = () => {
    const { api: localApi, connected } = DfApi;
    if (api !== undefined && localApi && localApi.isReady && connected) {
      try {
        localApi.disconnect();
        logger.info('Disconnected from Substrate API.');
      } catch (err) {
        logger.error('Failed to disconnect from Substrate. Error:', err)
      } finally {
        DfApi.connected = false
      }
    }
  }

  /** Retrieve the chain & node information via RPC calls and log into console.  */
  protected static logChainInfo = async () => {
    const system = DfApi.api.rpc.system;

    const [ chain, nodeName, nodeVersion ] = await Promise.all(
      [ system.chain(), system.name(), system.version() ]);

    logger.info(`Connected to Substrate chain '${chain}' (${nodeName} v${nodeVersion})`)
  }
}

export const Api = DfApi;
export default DfApi;

// const MAX_CONN_TIME_SECS = 10

export const getApi = async () => {
  if (api) {
    logger.info('Get Substrate API: SSR api');
    return api;
  } else {
    logger.info('Get Substrate API: DfApi.setup()');
    api = await DfApi.connect();
    return api;
  }
}