export default {
    methods: {
        setSsItem(key, data) {
            sessionStorage.setItem(key, JSON.stringify(data))
        },
        getSsItem(key) {
            try{
                let item = JSON.parse(sessionStorage.getItem(key))
                return item;
            }catch{
                return sessionStorage.getItem(key)
            }
        },
        setLsItem(key, data) {
            localStorage.setItem(key, JSON.stringify(data))
        },
        getLsItem(key) {
            try{
                let item = JSON.parse(localStorage.getItem(key))
                return item;
            }catch{
                return localStorage.getItem(key)
            }
        }
    }
}