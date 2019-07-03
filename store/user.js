

export const state = ()=>{
    return {
        userInfo: {
            token: "",
            user: {
                nickname: "未来守护者"
            }
        }
    }
}

export const mutations = {
    setUserInfo(state, data){
        state.userInfo = data;
    },
    clearUserInfo(state){
        state.userInfo = {};
    }
}

export const actions = {
    // commit 从 store解构出来；
    login({commit},data){
        return this.$axios({
            url:"/accounts/login",
            method:"POST",
            data
        }).then(res=>{
            commit("setUserInfo",res.data)
        })
    }
}