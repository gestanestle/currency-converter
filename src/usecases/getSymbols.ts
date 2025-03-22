import CurrencyApiResponse from "../types/apiResponse";

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

async function getSymbols(): Promise<CurrencyApiResponse> {
  try {
    const params = new URLSearchParams({
      access_key: apiKey,
    });

    console.log("===FETCHING SYMBOLS===");
    const res = await fetch(`${apiUrl}/symbols?${params}`);
    const body = await res.json();
    if (!body.success) {
      return {
        success: false,
      };
    }

    console.log("Symbols:", body.symbols);
    return {
      success: true,
      data: body.symbols,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
    };
  }
}

export default getSymbols;
