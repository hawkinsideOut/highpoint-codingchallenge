import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../types";
import { ObjectAPIData, MetaData } from "../../types";
import { fetchObjectsAsync, fetchObjectByIdAsync } from "./controller";

export interface ThunkApiOptions {
	rejectWithValue: (error: { error: any }) => void;
	getState: () => any;
	dispatch: (action: any) => void;
}

interface ObjectsState {
	data: {
		list: Array<number>;
		selectedObject?: ObjectAPIData;
		metaData: MetaData;
	};
	loading: boolean;
	status: Status;
	error: any | null;
	pages: Record<string, {
		data: Record<string, ObjectAPIData>[]
		status: Status
		error: any | null
	}>;
}

const itemsPerPage = 18; // Assuming 18 items per page

export const objectsSlice = createSlice({
	name: "objects",
	initialState: {
		data: {
			list: [],
			metaData: {
				currentPage: 1,
				totalPages: 0,
				itemsPerPage,
				totalItems: 0,
			},
		},
		loading: false,
		status: Status.IDLE,
		error: null,
		pages: {}, // will be caching all requests here, to prevent unnecessary calls to the API if they were already made
	} as ObjectsState,
	reducers: {
		setPageNumber: (state, action) => {
			state.data = {
				...state.data,
				metaData: {
					...state.data.metaData,
					currentPage: action.payload,
				},
			};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchObjectsAsync.pending, (state) => {
			state.loading = true;
			state.status = Status.PENDING;
		});
		builder.addCase(fetchObjectsAsync.fulfilled, (state, action) => {
			state.data = {
				list: action.payload.objectIDs,
				metaData: {
					currentPage: 1, // Assuming the first page is always loaded
					totalPages: Math.ceil(action.payload.total / 9), // Assuming 9 items per page
					itemsPerPage,
					totalItems: action.payload.total,
				},
			};
			state.loading = false;
			state.status = Status.IDLE;
			state.error = null;
		});
		builder.addCase(fetchObjectsAsync.rejected, (state, action) => {
			console.log(action);
			state.loading = false;
			state.status = Status.REJECTED;
			state.error = {
				message: "An error occurred while fetching objects.",
			};
		});
		// --------------------------------------------------------------
		builder.addCase(fetchObjectByIdAsync.pending, (state) => {
			state.loading = true;
			state.status = Status.PENDING;
		});
		builder.addCase(fetchObjectByIdAsync.fulfilled, (state, action) => {
			state.data.selectedObject = action.payload; // Assuming object has an 'id' property
			state.loading = false;
			state.status = Status.IDLE;
			state.error = null;
		});
		builder.addCase(fetchObjectByIdAsync.rejected, (state, action) => {
			console.log(action);
			state.loading = false;
			state.status = Status.REJECTED;
			state.error = {
				message: "An error occurred while fetching the object.",
			};
		});
	},
});

export const { setPageNumber } = objectsSlice.actions;
