import CurrencyApiResponse from "../types/apiResponse";

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

async function getCurrencies(): Promise<CurrencyApiResponse> {
  try {
    const params = new URLSearchParams({
      access_key: apiKey,
    });

    console.log("===FETCHING RATES===");
    const res = await fetch(`${apiUrl}/latest?${params}`);
    const body = await res.json();
    if (!body.success) {
      return {
        success: false,
      };
    }

    console.log("Rates:", body.rates);
    return {
      success: true,
      data: body.rates,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
    };
  }
}

export default getCurrencies;
