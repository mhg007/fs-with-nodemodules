import axios from 'axios';
import { useKeycloak, getToken } from '@teresol/vue-keycloak'
import { ElMessageBox } from 'element-plus'
import { options } from '../../mixins/alertOption.js'
import CompareList from '../../utilities/userActivitiesMapper.js'

function padLeadingZeros(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}
const {
    isAuthenticated,
} = useKeycloak()
const state = {
    unLockScreenPassword: '',
    lockScreen: false,
    disableLockScreen:false,
    currentUseCaseURL: null,
    header: {
        loginBranch: null,
        loginUserId: '',
        loginUserBatch: null,
        loginUserIp: '',
        activityCode: '',
        subActivityCode: '',
        loginBranchDate: '',
        currencyCode: 586,
        subBranchCode:"",
    },
    usersAllowedAcivities: null,
    usersAllowedAllAcivities: null,
    sideBarActivities: [""],
    route: "",
    departmentNumber: ""
}
const getters = {
    getHeaders: (state) => state.header,
    getURL: (state) => state.currentUseCaseURL,
    getLockScreenVisibility: (state) => state.lockScreen,
    getDisableLockScreen:(state)=>state.disableLockScreen,
    getUsersAllowedAcivities: (state) => state.usersAllowedAcivities,
    getUsersAllowedAllAcivities: (state) => state.usersAllowedAllAcivities,
    getSideBarActivities: (state) => state.sideBarActivities,
    getRoute: (state) => state.route
};

const actions = {
    async getUsersAllowedAcivities({ commit }) {
        try {
            if (isAuthenticated) {
                let token = await getToken();
                const response = await axios.get(
                    process.env.VUE_APP_SERVICES_ALLOW_USER_ACTIVITIES, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
                );
                if (response.status != 200) {
                    throw new Error()
                } else {
                    console.log("getUsersAllowedAcivities Response = >  ", response.data);
                    commit('setUsersAllowedAcivities', response.data)
                    return true
                }
            }

        } catch (error) {
            ElMessageBox.alert(error.message, 'Message', options)
            console.log(error);
        }
    },
    async killTransition({ rootGetters, commit }) {
        var url = rootGetters.getURL
        let tempKey = await getToken();
        const payloadset = {
            "transition": 'KILL',
            "key": tempKey,
            "data": {}
        };
        try {
            let response = await axios.post(url, payloadset);
            if (response.status === 200) {
                console.log("Kill response", response.data);
                commit("fsmURL", null)
                return true
            }
            if (response.status != 200) {
                throw new Error;
            }
        } catch (error) {
            ElMessageBox.alert(error.message, 'Message', options)
            console.log('Axios Error', error);
        }
    },
    async unLockScreen({ commit }, val) {
        commit('savePassword', val)
        let password = state.unLockScreenPassword
        let userId = state.header.loginUserId
        let branchCode = state.header.loginBranch
        const payloadset = {
            "data": { branchCode, userId, password }
        };
        try {
            let response = await axios.post(process.env.VUE_APP_UNLOCK_SCREEN, payloadset);
            if (response.status === 200) {
                if (response.data.mBoolean == true) {
                    return response.data.errorMessage
                } else {
                    console.log("unlock response", response.data);
                    return true
                }
            }
            if (response.status != 200) {
                throw new Error;
            }
        } catch (error) {
            ElMessageBox.alert(error.message, 'Message', options)
            console.log('Axios Error', error);
        }
    },
    savePassword({ commit }, val) {
        commit('savePassword', val)
    },
    activityCode({ commit }, val) {
        commit('activityCode', val)
    },
    subActivityCode({ commit }, val) {
        commit('subActivityCode', val)
    },
    fsmURL({ commit }, val) {
        commit("fsmURL", val)
    },
    saveBatchNo({ commit }, val) {
        commit("batchNo", val)
    },
    saveRoute({ commit }, val) {
        commit("saveRoute", val)
    },
    saveIpAddress({ commit }, val) {
        commit("saveIpAddress", val)
    },
    saveDepNo({ commit }, val) {
        commit("saveDepNo", val)
    },
    sideBarActivities({ commit }, val) {
        commit("setsideBarActivities", val)
    },
    lockScreen({commit},val){
        commit('lockScreen',val)
    },
    disableLockScreen({commit},val){
        commit('disableLockScreen',val)
    }
};
const mutations = {
    activityCode(state, val) {
        state.header.activityCode = val
    },
    subActivityCode(state, val) {
        state.header.subActivityCode = val
    },
    fsmURL(state, val) {
        state.currentUseCaseURL = val
    },
    batchNo(state, val) {
        state.header.loginUserBatch = val
    },
    setsideBarActivities(state, val) {
        state.sideBarActivities = val
    },
    setUsersAllowedAcivities(state, val) {
        state.usersAllowedAcivities = val
        state.usersAllowedAllAcivities = CompareList(val.allActivities)
        state.header.loginBranch = padLeadingZeros(val.branchCode,4)
        state.header.loginBranchDate = val.branchDate
        state.header.loginUserId = val.userId
        state.header.subBranchCode = val.subBranchCode
        state.header.loginUserIp=val.ipAddress
    },
    saveRoute(state, val) {
        state.route = val
    },
    saveIpAddress(state, val) {
        state.header.loginUserIp = val
    },
    saveDepNo(state, val) {
        state.departmentNumber = val
    },
    savePassword(state, val) {
        state.unLockScreenPassword = val
    },
    lockScreen(state,val){
        state.lockScreen = val
    },
    disableLockScreen(state,val){
        state.disableLockScreen = val
    },
};
export default {
    state,
    getters,
    actions,
    mutations
}