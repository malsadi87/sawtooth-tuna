import axios from "axios";
import { APIBasePath } from "../../../constants/apiBasePaths";

const createNew = async (data) => {
    try {
        const response = await axios.post(APIBasePath.Sawtooth.tp.catch.createNew, data);
        if (!response) return Promise.reject("Invalid form data!");
        return response;
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}

const getAll = async () => {
    try {
        const response = await axios.get(APIBasePath.Sawtooth.tp.catch.getAll);
        if (!response) return Promise.reject("Invalid form data!");
        return response;
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    } 
}

const getById = async (id) => {
    try {
        const response = await axios.get(APIBasePath.Sawtooth.tp.catch.getById.replace(':id', id));
        if (!response) return Promise.reject("Invalid form data!");
        return response;
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}

const catchService = {
    createNew,
    getById,
    getAll
}

export default catchService;