import axios from "axios";
import requestConfig from "./config";

const BASE_URL = `http://localhost:5000`;

class DashboardAPI {
	static getDashboardData() {
		return axios.get(`${BASE_URL}/user/dashboard/`, requestConfig);
	}
}

export default DashboardAPI;
