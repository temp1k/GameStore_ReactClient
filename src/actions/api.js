import axios from "axios";


const baseUrl = 'http://localhost:5201/api/';



export default {
    userCrud(url= baseUrl + 'users/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: (id) => axios.get(url+id),
            create: newUser => axios.post(url+"reg", newUser),
            update: (id, updateUser) => axios.put(url+id, updateUser),
            delete: (id) => axios.delete(url+id)
        }
    }
}