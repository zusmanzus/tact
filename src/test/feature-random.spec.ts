import { beginCell, toNano } from 'ton-core';
import { ContractSystem } from 'ton-emulator';
import { __DANGER_resetNodeId } from '../grammar/ast';
import { RandomContract } from './features/output/random_RandomContract';

describe('feature-random', () => {
    beforeEach(() => {
        __DANGER_resetNodeId();
    });
    it('should implement random correctly', async () => {

        // Init
        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let contract = system.open(await RandomContract.fromInit());
        await contract.send(treasure, { value: toNano('10') }, { $$type: 'Deploy', queryId: 0n });
        await system.run();

        // Check random
        // NOTE: This values are generated by emulator and deterministic
        //       this values also ensure that randomize_lt was called
        //       since without it it would be different
        expect(await contract.getRandomInt()).toBe(12029244659758160506229899028078921673473662712472979861368849515350569944843n);
        expect(await contract.getRandom(0n, 10000n)).toBe(1038n);
    });
});