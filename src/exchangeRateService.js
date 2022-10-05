import ExchangeRateClient from './exchangeRateClient.js';
import axios from 'axios';

export default class ExchangeRateService {
  constructor() {
    this.client = new ExchangeRateClient(axios);
  }

  async getLatestExchangeRate(fromCurrency = 'USD', toCurrency = 'AUD') {
    return this.client.getLatestExchangeRate(fromCurrency, toCurrency);
  }
}
