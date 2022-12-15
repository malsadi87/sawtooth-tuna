import axios from "axios";
import { APIBasePath } from "../../../constants/apiBasePaths";

const createNew = async (data) => {
    try {
        const response = await axios.post(APIBasePath.Sawtooth.tp.haul.createNew, data);
        if (!response) return Promise.reject("Invalid form data!");
        return response;
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}

const getAll = async () => {
    try {
        const response = await axios.get(APIBasePath.Sawtooth.tp.haul.getAll);
        if (!response) return Promise.reject("Invalid form data!");
        return response;
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    } 
}

const getById = async (id) => {
    try {
        const response = await axios.get(APIBasePath.Sawtooth.tp.haul.getById.replace(':id', id));
        if (!response) return Promise.reject("Invalid form data!");
        return response;
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}

const getByPkTrip = async (pkTrip) => {
  try {
      const response = await axios.get(APIBasePath.Sawtooth.tp.haul.getByPkTrip.replace(':pkTrip', pkTrip));
      if (!response) return Promise.reject("Invalid form data!");
      return response;
  } catch(e) {
      console.error(e);
      return Promise.reject(e);
  }
}

const haulService = {
    createNew,
    getById,
    getByPkTrip,
    getAll
}

export default haulService;