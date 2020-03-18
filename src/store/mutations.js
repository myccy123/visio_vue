import chartMutations from './chart-states/chart-mutations';
import commonMutations from './common-states/common-mutations';

const mutations = {
    ...chartMutations,
    ...commonMutations,
}

export default mutations;