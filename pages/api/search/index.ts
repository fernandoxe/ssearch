import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiKey, url } from '../../../src/config';
import { Cabin, SearchApi } from '../../../src/interfaces/search';
import { getDateSumDays, getDaysBetween, getTomorrow } from '../../../src/services/date';

const defaultParams = {
  adults: 1,
  cabinType: Cabin.ALL,
  children: 0,
  currencyCode: 'ARS',
  departureDate: getTomorrow(),
  destinationAirportCode: 'MAD',
  infants: 0,
  isFlexibleDateChecked: false,
  originAirportCode: 'BUE',
  tripType: 2,
  forceCongener: false,
  r: 'ar',
};

const headers = {
  'x-api-key': apiKey,
  region: 'ARGENTINA',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
};

const getQueryValue = (value?: string | string[]) => {
  return Array.isArray(value) ? value[0] : value;
};

const validateQuery = (query: NextApiRequest['query']) => {
  let { from, to, dateFrom, dateTo, cabin } = query;

  const validFrom = getQueryValue(from) || defaultParams.originAirportCode;
  const validTo = getQueryValue(to) || defaultParams.destinationAirportCode;
  const validDateFrom = getQueryValue(dateFrom) || defaultParams.departureDate;
  const validDateTo = getQueryValue(dateTo) || validDateFrom;
  const validCabin = getQueryValue(cabin) || defaultParams.cabinType;

  return {
    from: validFrom,
    to: validTo,
    dateFrom: validDateFrom,
    dateTo: validDateTo,
    cabin: validCabin,
  };
};

const search = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const validQuery = validateQuery(req.query);
  
  const params = {
    ...defaultParams,
    originAirportCode: validQuery.from,
    destinationAirportCode: validQuery.to,
    departureDate: validQuery.dateFrom,
    cabinType: validQuery.cabin,
  };
  const dateTo = validQuery.dateTo;
  
  const days = getDaysBetween(params.departureDate, dateTo);
  
  try {
    const requests = [];
    const dates = [];
    for (let i = 0; i <= days; i++) {
      const newDate = getDateSumDays(params.departureDate, i);
      const newParams = {...params, departureDate: newDate};
      const request = axios.get<SearchApi>(url, { params: newParams, headers });
      requests.push(request);
      dates.push(newDate);
    }
    
    const responses = await Promise.all(requests);
    const searches = []
    for (let i = 0; i < responses.length; i++) {
      searches.push({...responses[i].data, date: dates[i]});
    }
    res.status(200).json(searches);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export default search;
