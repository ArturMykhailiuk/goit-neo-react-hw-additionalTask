import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { selectToken } from "../auth/selectors";
import toast from "react-hot-toast";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = selectToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    setAuthHeader(token);

    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = selectToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    setAuthHeader(token);

    try {
      const response = await axios.post("/contacts", contact);
      toast.success("Contact added successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to add contact");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = selectToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    setAuthHeader(token);

    try {
      await axios.delete(`/contacts/${contactId}`);
      toast.success("Contact deleted successfully");
      return contactId;
    } catch (error) {
      toast.error("Failed to delete contact");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, updates }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = selectToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    setAuthHeader(token);

    try {
      const response = await axios.patch(`/contacts/${id}`, updates);
      toast.success("Contact updated successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to update contact");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
