const API_URL = "https://seakun-frontend-assessment.vercel.app/data.json";

export async function fetchOrders() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}
