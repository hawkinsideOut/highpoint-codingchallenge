import server from "@/app/api/server";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiOptions } from "./slice";

export const fetchObjectByIdAsync = createAsyncThunk(
	"objects/fetchObjectByIdAsync",
	async (objectId: string, thunkApi: ThunkApiOptions) => {
		try {
			return await server.Objects.getById(objectId);
		} catch (error: any) {
			return thunkApi.rejectWithValue({ error: error.data });
		}
	}
);

export const fetchObjectsAsync = createAsyncThunk(
	"objects/fetchObjectsAsync",
	async (_, thunkApi: ThunkApiOptions) => {
		try {
			return await server.Objects.list();
		} catch (error: any) {
			return thunkApi.rejectWithValue({ error: error.data });
		}
	}
);