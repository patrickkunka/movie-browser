import StateManager, {
    ERROR_ROUTER_NOT_INJECTED,
    ERROR_REDUCER_NOT_INJECTED
} from './StateManager';

import Router from './Router';

import chai, {assert} from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

const mockReducer = (prevState, action) => {
    if (action.type === 'TEST') {
        const nextState = Object.assign({}, prevState);

        nextState.foo = 'bar';

        return nextState;
    }

    return prevState;
};

const mockRoutes = [{pattern: '/', action: () => ({type: 'TEST'})}];

describe('StateManager', () => {
    it('should throw an error if instantiated without `Router` injection', () => {
        assert.throws(() => new StateManager(), ERROR_ROUTER_NOT_INJECTED);
    });

    it('should throw an error if instantiated without `reducer` injection', () => {
        assert.throws(() => new StateManager(new Router(mockRoutes)), ERROR_REDUCER_NOT_INJECTED);
    });

    describe('#getState()', () => {
        it('should return the current state', () => {
            const stateManager = new StateManager(new Router(mockRoutes), new Function());
            const state = stateManager.getState();

            assert.isOk(state);
            assert.typeOf(state, 'object');
        });
    });

    describe('#dispatch()', () => {
        it('should create the expected state for a provided action', () => {
            const action = () => ({type: 'TEST'});

            const stateManager = new StateManager(new Router(mockRoutes), mockReducer);
            const prevState = stateManager.getState();

            return stateManager.dispatch(action)
                .then(nextState => {
                    assert.isOk(prevState);
                    assert.isOk(nextState);
                    assert.notEqual(prevState, nextState);
                    assert.equal(nextState.foo, 'bar');
                });
        });
    });

    describe('#navigate()', () => {
        it('should create the expected state for a provided URL', () => {
            const router = new Router(mockRoutes);
            const stateManager = new StateManager(router, mockReducer);

            return stateManager.navigate('/')
                .then(nextState => {
                    assert.equal(nextState.foo, 'bar');
                });
        });
    });
});