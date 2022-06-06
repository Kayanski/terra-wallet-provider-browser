import {
  getChainOptions,
  WalletController,
} from '@terra-money/wallet-controller';

import {
  useState
} from "./useState";


let [instance, setInstance]  = useState({});


export async function initController() {
  const chainOptions = await getChainOptions();

  setInstance(new WalletController({
    ...chainOptions,
  }));
}

export function getController(): WalletController {
  return instance;
}
