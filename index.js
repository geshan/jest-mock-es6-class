import ExchangeRateService from './src/exchangeRateService.js';

(async () => {
  const service = new ExchangeRateService();
  const fromCurrency = 'USD';
  const toCurrency = 'AED';
  const exchangeRate = await service.getLatestExchangeRate(fromCurrency, toCurrency);

  console.log(`Exchange rate from ${fromCurrency} to ${toCurrency} for today is ${exchangeRate}`);
})();
