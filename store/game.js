export const state = () => ({
    score: 100,
    items: [],
    itemValues: [],
    openedItems: [],
    gameGridSize: 4 // number of i x i boxes
})

export const mutations = {
    setGameGridSize(state, payload) {
        state.gameGridSize = payload
    },
    setItem(state, payload) {
        const {id, item} = {...payload}
        const index = state.items
        state.items.splice(id,1, item )
    },
    setItemValues(state, payload) {
        state.itemValues = [...payload]
    },
    setItems(state, payload) {
        state.items = [...payload]
    },
    setScore(state, payload) {
        state.score = payload
    },
    setOpenedItems(state, payload) {
        if (state.openedItems.length < 2) {
            state.openedItems.push(payload)
        } else {
            state.openedItems = [payload]
        }
    },
    resetOpenedItems(state) {
        state.openedItems = []
    }
}

export const actions = {
    randomizeItemValue({state, commit}, id) {
        const item = {...state.items[id]}
        const itemValues = [...state.itemValues]
        if (!item.value && itemValues.length > 0) {
            const randIndex = Math.floor(Math.random() * state.itemValues.length)
            const value = itemValues[randIndex]
            itemValues.splice(randIndex,1)
            commit('setItemValues', itemValues)
            item.value = value
            commit('setItem',{id, item})
        }
    },
    openItem({state, commit}, id) {
        if (!state.openedItems.includes(id)) {
            if (state.openedItems.length === 0) {
                commit('setOpenedItems', id)
            } else if (state.openedItems.length === 1) {
                const item = {...state.items[id]}                
                const openedId = state.openedItems[0]
                const index = state.items.findIndex(item => item.id === openedId)
                const openItem = {...state.items[index]}
                let newScore = state.score
                if (openItem && openItem.value === item.value) {
                    openItem.matched = true
                    item.matched = true
                    newScore = newScore + 10
                } else {
                    newScore = newScore - 1
                }
                commit('setScore', newScore)                
                commit('setOpenedItems', id)
                commit('setItem',{id, item})
                commit('setItem',{id: openedId, item: openItem})
            }
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}