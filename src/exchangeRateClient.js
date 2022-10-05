export default class ExchangeRateClient {
  constructor(axios) {
    axios.defaults.baseURL = 'https://open.er-api.com/v6';
    this.axios = axios;
  }

  async getLatestExchangeRate(fromCurrency = 'USD', toCurrency = 'AUD') {
    try {
      const response = await this.axios.get(`/latest/${fromCurrency}`);
      return response.data.rates[toCurrency] || 0;
    } catch(e) {
      console.log(`Error while getting exchange rate ${e.message}`, e);
      return 0;
    }    
  }
}
