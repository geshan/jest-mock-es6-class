import ExchangeRateClient from '../src/exchangeRateClient.js';
import ExchangeRateService from '../src/exchangeRateService.js';

const getLatestExchangeRateSpy = jest.spyOn(ExchangeRateClient.prototype, 'getLatestExchangeRate')
  .mockResolvedValueOnce(3.6725)
  .mockResolvedValueOnce(0);

describe('ExchangeRateService', () => {
  let service = {};

  beforeEach(() => {
    service = new ExchangeRateService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getLatestExchangeRate', () => {
    it('should get the latest exchange rate', async ()=> {
      const latestExchangeRate = await service.getLatestExchangeRate('USD', 'AED');
      expect(latestExchangeRate).toBe(3.6725);

      expect(getLatestExchangeRateSpy).toHaveBeenCalled();
      expect(getLatestExchangeRateSpy).toHaveBeenCalledWith('USD', 'AED');
    });

    it('should return 0 as latest exchange rate in case of error on client', async ()=> {
      const latestExchangeRate = await service.getLatestExchangeRate('USD', 'CAD');
      expect(latestExchangeRate).toBe(0);
      expect(getLatestExchangeRateSpy).toHaveBeenCalled();
    });
  });
});
