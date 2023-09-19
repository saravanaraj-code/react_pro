import axios from "axios";
const urls = "http://192.168.48.185:8000/"

class API {


    Signup = async (data) => {
        try {
            const res = await axios.post(urls + `usrserv/signup`, data);
            return res;
        } catch (error) {
            return error;
        }
    };

    Login = async (data) => {
        try {
            const res = await axios.post(urls + `usrserv/get_authtoken`, data);
            return res;
        } catch (error) {
            return error;
        }
    };

    getuser = async () => {
        try {
            const res = await axios.get(urls + `usrserv/get_all_employees`);
            return res;
        } catch (error) {
            return error;
        }
    }

    viewuser = async (id) => {
        try {
            const res = await axios.get(urls + `usrserv/signup?id=${id}`);
            return res;
        } catch (error) {

        }
    }

    updateuser = async (data) => {
        try {
            const res = await axios.post(urls + `usrserv/signup`, data);
            return res;
        } catch (error) {

        }
    }

    deleteuser = async (id) => {
        try {
            const res = await axios.delete(urls + `usrserv/signup?id=${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }

    gettask = async () => {
        try {
            const res = await axios.get(urls + `usrserv/tasks`);
            return res;
        } catch (error) {
            return error;
        }
    }

    gettask1 = async () => {
        let user_id = localStorage.getItem('user_id')
        try {
            const res = await axios.get(urls + `usrserv/tasks?user_id=${user_id}`);
            return res;
        } catch (error) {
            return error;
        }
    }

    addTask = async (data) => {
        try {
            const res = await axios.post(urls + `usrserv/tasks`, data);
            return res;
        } catch (error) {
            return error;
        }
    };

    viewtask = async (id) => {
        try {
            const res = await axios.get(urls + `usrserv/tasks?id=${id}`);
            return res;
        } catch (error) {

        }
    }

    deletetask = async (id) => {
        try {
            const res = await axios.delete(urls + `usrserv/tasks?id=${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }

    changeStatus = async (data) => {
        try {
            const res = await axios.put(urls + `usrserv/tasks`, data);
            return res;
        } catch (error) {
            return error;
        }
    };

    logout = async () => {
    
//     const headers = {Authorization : 'Token ' + localStorage.getItem('token')};
// console.log("Header", headers)
    let token = localStorage.getItem('token')
        try {
            const res = await axios.post(urls + `usrserv/signout?token=${token}`);
            return res;
        } catch (error) {
            return error;
        }
    }


}

export default API;
