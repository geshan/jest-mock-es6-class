import ExchangeRateClient from '../src/exchangeRateClient.js';
import ExchangeRateService from '../src/exchangeRateService.js';

const mockGetLatestExchangeRate = jest.fn().mockResolvedValueOnce(3.6725).mockResolvedValueOnce(0);
jest.mock('../src/exchangeRateClient.js', () => {
  return jest.fn().mockImplementation(() => {
    return { getLatestExchangeRate: mockGetLatestExchangeRate };
  });
});

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
      expect(ExchangeRateClient).toHaveBeenCalled();

      expect(mockGetLatestExchangeRate).toHaveBeenCalled();
      expect(mockGetLatestExchangeRate).toHaveBeenCalledWith('USD', 'AED');
    });

    it('should return 0 as latest exchange rate in case of error on client', async ()=> {
      const latestExchangeRate = await service.getLatestExchangeRate('USD', 'CAD');
      expect(latestExchangeRate).toBe(0);
      expect(mockGetLatestExchangeRate).toHaveBeenCalled();
    });
  });
});
