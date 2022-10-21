import axios from "axios";
import { APIBasePath } from "../../../constants/apiBasePaths";

const createNew = async (data) => {
    try {
        const response = await axios.post(APIBasePath.Sawtooth.tp.product.createNew, data);
        if (!response) return Promise.reject("Invalid form data!");
        return response;
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}

const getAll = async () => {
    try {
        const response = await axios.get(APIBasePath.Sawtooth.tp.product.getAll);
        if (!response) return Promise.reject("Invalid form data!");
        return response;
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}

const getById = async (id) => {
    try {
        const response = await axios.get(APIBasePath.Sawtooth.tp.product.getById.replace(':id', id));
        if (!response) return Promise.reject("Invalid form data!");
        return response;
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}

const getByProductNum = async (productNum) => {
  try {
      const response = await axios.get(APIBasePath.Sawtooth.tp.product.getByProductNum.replace(':productNum', productNum));
      if (!response) return Promise.reject("Invalid form data!");
      return response;
  } catch(e) {
      console.error(e);
      return Promise.reject(e);
  }
}

const productService = {
    createNew,
    getById,
    getAll,
    getByProductNum
}

export default productService;