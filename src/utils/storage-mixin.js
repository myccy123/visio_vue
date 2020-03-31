export default{
    methods:{
        setSsItem(key,data){
            sessionStorage.setItem(key,JSON.stringify(data))
        },
        getSsItem(key){
            return JSON.parse(sessionStorage.getItem(key))
        },
        setLsItem(key,data){
            localStorage.setItem(key,JSON.stringify(data))
        },
        getLsItem(key){
            return JSON.parse(localStorage.getItem(key))
        }
    }
}