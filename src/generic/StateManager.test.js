import StateManager, {
    ERROR_ROUTER_NOT_INJECTED,
    ERROR_REDUCER_NOT_INJECTED
} from './StateManager';

import Router from './Router';

import chai, {assert} from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

describe('StateManager', () => {
    it('should throw an error if instantiated without `Router` injection', () => {
        assert.throws(() => new StateManager(), ERROR_ROUTER_NOT_INJECTED);
    });

    it('should throw an error if instantiated without `reducer` injection', () => {
        assert.throws(() => new StateManager(new Router()), ERROR_REDUCER_NOT_INJECTED);
    });

    describe('#dispatch()', () => {
        it('should create the expected state for a given action', () => {
            const action = () => ({type: 'TEST'});

            const reducer = (prevState, action) => {
                switch (action.type) {
                    case 'TEST': {
                        const nextState = Object.assign({foo: ''}, prevState);

                        nextState.foo = 'bar';

                        return nextState;
                    }
                }

                return prevState;
            };

            const stateManager = new StateManager(new Router(), reducer);

            return stateManager.dispatch(action)
                .then((prevState, nextState) => {
                    assert.isOk(nextState);
                    assert.equal(nextState.foo, 'bar');
                });
        });
    });
});
