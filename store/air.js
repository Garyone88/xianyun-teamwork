export const state = ()=>{
    return {
        allPrice:"",
    }
}

export const mutations = {
    setAllPrice(state,data){
        state.allPrice = data;
    }
}