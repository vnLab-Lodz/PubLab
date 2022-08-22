import { AssetObject } from '../../shared/types';
import { readAsset } from '../ipc';
import usePromiseSubscription from './usePromiseSubscription';

export default function useAssetURI(path?: string, encoding?: BufferEncoding) {
  const [asset, error, isPending] = usePromiseSubscription<
    AssetObject | undefined
  >(
    (async () => {
      let loadedAsset;
      if (path) {
        loadedAsset = await readAsset(path, encoding);
      }
      return loadedAsset;
    })(),
    undefined,
    [path]
  );

  return {
    uri: asset && path ? createURI(asset) : undefined,
    error,
    isPending,
  };
}

function createURI(asset: AssetObject) {
  const { mimeType, encoding, data } = asset;
  return `data:${mimeType};${encoding},${data}`;
}
