import StateManager from './StateManager';

class Navigator {
    constructor(stateManager) {
        if (!(stateManager instanceof StateManager)) throw new Error(ERROR_STATE_MANAGER_NOT_INJECTED);

        this.stateManager = stateManager;

        this.bindHandlers();
    }
}

export const ERROR_STATE_MANAGER_NOT_INJECTED = '[Navigator] State manager must be injected';

export default Navigator;