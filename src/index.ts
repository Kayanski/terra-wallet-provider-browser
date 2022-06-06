import {
  Connection,
  ConnectType,
  WalletStates,
  WalletStatus,
} from '@terra-money/wallet-controller';

import {
  useState
} from "./useState";


import { getController, initController } from './controller';
import { Subscription, combineLatest } from 'rxjs';

const controller = getController();

let [connectState, setConnectState] = useState({});

let subscription: Subscription | null = null;

// On mounted, do this directly --> Bubble update
function mount(){
	subscription = combineLatest([
	    controller.availableConnectTypes(),
	    controller.availableInstallTypes(),
	    controller.availableConnections(),
	    controller.states(),
	  ]).subscribe(
	    ([
	      _availableConnectTypes,
	      _availableInstallTypes,
	      _availableConnections,
	      _states,
	    ]) => {
	    	setConnectState({
		      availableInstallTypes: _availableInstallTypes,
		      availableConnectTypes:_availableConnectTypes,
		      availableConnections: _availableConnections,
		      state: _states,
		      support_features: 
		        _states.status === WalletStatus.WALLET_CONNECTED
		          ? Array.from(_states.supportFeatures)
		          : [],
		    		
	    	})
	    },
	  );
	}


async function unMount(){
   subscription?.unsubscribe();
}

function getConnectState(){
	return connectState
}


export {
	initController,
	getController,
	mount,
	unMount,
	getConnectState,
	WalletStatus
}