import axios from 'axios';


const clienteAxios = (token?: string) => {
    return axios.create({
        baseURL: process.env.REACT_APP_API_URL2,
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
};

export default clienteAxios;