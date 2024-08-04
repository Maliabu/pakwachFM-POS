import axios from "axios";
import { TOKEN, API_URL_USER_GET_PROFILE_PHOTO, API_URL_GET_ALL_RECEIPTS, API_URL_GET_TOTAL_SALES, API_URL_GET_OUTFLOW_PRODUCT_CATEGORY, API_URL_GET_INFLOW_PRODUCT_CATEGORY, API_URL_GET_CART_PRODUCTS, API_URL_GET_USER_VERIFICATION, API_URL_GET_AUTH_USER, API_URL_GET_ADMIN_USER, API_URL_GET_NON_ADMIN_USER, API_URL_GET_PRODUCT_CATEGORY, API_URL_GET_DEPARTMENTS, API_URL_GET_ALL_USERS } from "./Api";

export const UserRequests = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_AUTH_USER}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};

export const AdminUserRequests = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_ADMIN_USER}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};

export const NonAdminRequests = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_NON_ADMIN_USER}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};

export const UserVerificationRequests = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_USER_VERIFICATION}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};

export const ProfilePhoto = async() => {
    try {
        const response = await axios.get(`${API_URL_USER_GET_PROFILE_PHOTO}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};

export const GetProductCategories = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_PRODUCT_CATEGORY}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error){
        return error ? error.response ? error.response.data : error : error.message
    }
};

export const GetInflowProductCategories = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_INFLOW_PRODUCT_CATEGORY}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error){
        return error ? error.response ? error.response.data : error : error.message
    }
};

export const GetOutflowProductCategories = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_OUTFLOW_PRODUCT_CATEGORY}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error){
        return error ? error.response ? error.response.data : error : error.message
    }
};

export const GetCartProducts = async() => {
    if(TOKEN !== null){
    try {
        const response = await axios.get(`${API_URL_GET_CART_PRODUCTS}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error){
        return error ? error.response ? error.response.data : error : error.message
    }}
};

export const GetTotalSales = async() => {
    if(TOKEN !== null){
    try {
        const response = await axios.get(`${API_URL_GET_TOTAL_SALES}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error){
        return error ? error.response ? error.response.data : error : error.message
    }}
};

export const GetAllReceipts = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_ALL_RECEIPTS}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error){
        return error ? error.response ? error.response.data : error : error.message
    }
};

export const GetAllDepartments = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_DEPARTMENTS}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error){
        return error ? error.response ? error.response.data : error : error.message
    }
};

export const GetAllUsers = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_ALL_USERS}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error){
        return error ? error.response ? error.response.data : error : error.message
    }
};