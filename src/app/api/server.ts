const baseURL = process.env.NEXT_PUBLIC_API_URL;

const responseBody = (res: Response) => res.json();

// We get a CORS error when connecting to the API, so we are
// setting headers for CORS to pass it through
const requestOptions: RequestInit = {
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
	},
	mode: "cors",
};

const requests = {
	get: (endpoint: string) =>
		fetch(`${baseURL}/${endpoint}`, requestOptions).then(responseBody),
};

const Objects = {
	list: () => requests.get("objects"),
	getById: (objectId: string) => requests.get(`objects/${objectId}`),
};

const Departments = {
	list: () => requests.get("departments"),
};

const Search = {
	// list: (params?: URLSearchParams) => requests.get("search", params),
};

export default {
	Objects,
	Departments,
	Search,
};
