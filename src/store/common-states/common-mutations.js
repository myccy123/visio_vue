export default {
    setDefTab: (state, defTab) => {
        state.defTab = defTab;
    },
    setColOptions: (state, colOptions) => {
        state.colOptions = colOptions;
    },
    setLoading: (state, loading) => {
        state.loading = loading;
    },
    setIsSignin: (state, isSignin) => {
        sessionStorage.setItem('isSignin', isSignin);
        state.isSignin = isSignin;
    },
    setUserInfo: (state, userInfo) => {
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        state.userInfo = userInfo;
    }
}