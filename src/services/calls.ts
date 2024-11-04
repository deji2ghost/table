import { AxiosError } from "axios";
import AxiosInstance from "../utils/AxiosInstance"

const FetchTickers = async() => {
    try{
        const Response = await AxiosInstance.get("/tickers/");
        return Response
    } catch (error){
        if (error instanceof AxiosError) {
            console.error('Error fetching tickers:', error.response?.data || error.message);
          } else {
            console.error('An unexpected error occurred:', error);
          }
          throw error;
    }
}

export default FetchTickers
