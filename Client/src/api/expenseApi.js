import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getExpenses = (params) => {
  const cleaned = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== '' && value !== null && value !== undefined) {
      cleaned[key] = value;
    }
  }
  return api.get('/expense', { params: cleaned });
  
};


export const deleteExpense = (id) => {
  return api.delete(`/expense/${id}`);
};