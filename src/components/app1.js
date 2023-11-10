import axios from "axios";

axios.defaults.baseURL = 'https://654deba5cbc3253557420d50.mockapi.io';

export const fetchQuizzez = async () => { 
    const response = await axios.get('/quizzez');
    return response.data;

}