import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getExpenses,deleteExpense,createExpense } from '../api/expenseApi';
import toast from 'react-hot-toast';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sortBy: 'expenseDate',
    order: 'DESC',
    category: '',
    paymethod: '',
    search: '',
    startDate: '',
    endDate: '',
  });

  const lastFiltersRef = useRef(filters);

  const queryParams = useMemo(() => {
    const params = {
      page: filters.page,
      limit: filters.limit,
      sortBy: filters.sortBy,
      order: filters.order,
    };
    if (filters.category) params.category = filters.category;
    if (filters.paymethod) params.paymethod = filters.paymethod;
    if (filters.search) params.search = filters.search;
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;
    return params;
  }, [filters]);

  const fetchExpenses = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getExpenses(params);
      const { data, pagination: pag } = response.data.data;
      console.log(data)
      setExpenses(data);
      setPagination(pag);
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses(queryParams);
  }, [queryParams, fetchExpenses]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value, page: 1 };
      lastFiltersRef.current = next;
      return next;
    });
  }, []);

  const handleSort = useCallback((field) => {
    setFilters((prev) => {
      const newOrder = prev.sortBy === field && prev.order === 'DESC' ? 'ASC' : 'DESC';
      const next = { ...prev, sortBy: field, order: newOrder, page: 1 };
      lastFiltersRef.current = next;
      return next;
    });
  }, []);

  const handlePageChange = useCallback((page) => {
    setFilters((prev) => {
      const next = { ...prev, page };
      lastFiltersRef.current = next;
      return next;
    });
  }, []);

  const handleSearch = useCallback((value) => {
    setFilters((prev) => {
      const next = { ...prev, search: value, page: 1 };
      lastFiltersRef.current = next;
      return next;
    });
  }, []);

  const handleClearFilters = useCallback(() => {
    const reset = {
      page: 1,
      limit: 10,
      sortBy: 'expenseDate',
      order: 'DESC',
      category: '',
      paymethod: '',
      search: '',
      startDate: '',
      endDate: '',
    };
    setFilters(reset);
    lastFiltersRef.current = reset;
  }, []);

  const handleRetry = useCallback(() => {
    fetchExpenses(queryParams);
  }, [fetchExpenses, queryParams]);

    const handleDelete = useCallback(async (id) => {
    try {
      await deleteExpense(id);
      fetchExpenses(queryParams);
      toast.success("Expense Deleted")
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to delete expense';
      setError(message);
    }
  }, [fetchExpenses, queryParams]);

   const handleAdd = useCallback(async (data) => {
    try {
      await createExpense(data);
      fetchExpenses(queryParams);
      toast.success("Expense added successfully");
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to add expense';
      setError(message);
      toast.error(message)
    }
  }, [fetchExpenses, queryParams]);

  const handleEdit = useCallback(async (id, data) => {
    try {
      await updateExpense(id, data);
      fetchExpenses(queryParams);
      toast.success("Expense updated successfully")
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to update expense';
      setError(message);
      toast.error(message)
    }
  }, [fetchExpenses, queryParams]);

  return {
    expenses,
    pagination,
    loading,
    initialLoad,
    error,
    filters,
    handleFilterChange,
    handleSort,
    handlePageChange,
    handleSearch,
    handleClearFilters,
    handleRetry,
    handleDelete,
    handleAdd,
    handleEdit,
  };
};
