export interface SearchApi {
  requestedFlightSegmentList: FlightSegment[];
  resultType: string;
  hasCongener: boolean;
  hasG3: boolean;
  tripType: string;
  tripTypeRequest: string;
  factorOneSegment: number;
  factorTwoSegments: number;
  factorUsed: string;
  compareFlight: string;
  pricingChannelList: any;
  passenger: Passenger;
  isSmFlexActive: boolean;
  date: string;
};

export interface FlightSegment {
  type: string;
  flightList: Flight[];
  airports: Airports;
  cabinList: Cabin[];
  companyList: Company[];
  bestPricing: BestPricing;
};

export enum Cabin {
  ALL = 'ALL',
  BUSINESS = 'BUSINESS',
  ECONOMIC = 'ECONOMIC',
  PREMIUM_ECONOMIC = 'PREMIUM_ECONOMIC',
}

// export enum CabinApi {
//   ALL = 'all',
//   BUSINESS = 'business',
//   ECONOMIC = 'economic',
//   PREMIUM_ECONOMIC = 'premium_economic',
// }

export interface Flight {
  uid: string;
  stops: number;
  cabin: Cabin;
  sourceGDS: string;
  tripType: string;
  availableSeats: number;
  departure: Departure;
  arrival: Arrival;
  airline: Airline;
  validatingAirlineCode: string;
  durationNumber: number;
  duration: Duration;
  timeStop: Duration;
  hourMainStop?: string;
  airportMainStop: Airport;
  legList: Leg[];
  fareList: Fare[];
  trackingAmadeus: any;
  codeContext: string;
  segmentFlight: string;
  type: string;
  sourceFare: string;
  mostWanted?: boolean;
  promotional?: boolean;
  airlineTax?: number;
  airlineTaxMiles?: number;
  airlineFlightMoney?: number;
  airlineFlightMiles?: number;
  isAirlineTaxWithFlight?: boolean;
};

export interface Departure {
  date: string;
  airport: Airport;
};

export interface Arrival {
  date: string;
  airport: Airport;
};

export interface Airline {
  code: string;
  name: string;
};

export interface Duration {
  hours: number;
  minutes: number;
};

export interface Airport {
  code?: string;
  name?: string;
  city?: string;
  country?: string;
  timezone?: string;
  timeZone?: any;
};

export interface Leg {
  cabin: Cabin;
  departure: Departure;
  arrival: Arrival;
  flightNumber: string;
  marketingAirline: Airline;
  operationAirline: Airline;
  equipment: string;
  stops: number;
  isConnection: string;
  isMainLeg: any;
  congener: Congener;
  duration: number;
};

export interface Congener {
  resBookDesigCode: string;
  eTicketEligibility: string;
  fareInfo: string;
  negotiatedFareCode?: string;
  commentList: string[];
};

export enum FareType {
  SMILES = 'SMILES',
  SMILES_CLUB = 'SMILES_CLUB',
  SMILES_MONEY = 'SMILES_MONEY',
  SMILES_MONEY_CLUB = 'SMILES_MONEY_CLUB',
}

export interface Fare {
  uid: string;
  congener: CongenerFare;
  type: FareType;
  money: number;
  miles: number;
  baseMiles: number;
  airlineFareAmount: any;
  airlineFare: number;
  airlineTax: number;
  legListCost?: string;
  legListCurrency?: string;
  offer?: number;
  fareValue?: number;
};

export interface CongenerFare {
  fareReference: string;
  fareInfo: string;
  negotiatedFareCode?: string;
};

export interface Airports {
  departureAirportList: Airport[];
  arrivalAirportList: Airport[];
};

export interface Company {
  code: string;
  name: string;
};

export interface BestPricing {
  miles: number;
  sourceFare: string;
  fare: BestFareType;
  smilesMoney: SmilesMoney;
};

export interface BestFareType {
  type: FareType;
};

export interface SmilesMoney {
  fare: BestFareType;
  miles: number;
  money: number;
};

export interface Passenger {
  adults: string;
  children: string;
  infants: string;
};
