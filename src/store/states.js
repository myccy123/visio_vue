import chartStates from './chart-states/chart-states';
import commonStates from './common-states/common-states';

const state={
    ...chartStates,//chart管理
    ...commonStates,//通用状态
}

export default state;