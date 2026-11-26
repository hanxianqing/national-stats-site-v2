// data.js — every figure on this site, with its source and year.
//
// Figures are World Bank, World Development Indicators (WDI), November 2026
// vintage, unless another source is named. Values are as published; WDI
// revises its series, so a figure may differ from an older vintage.

export const COUNTRY = {
  name: 'Japan',
  japanese: '日本',
  code: 'JPN',
  capital: 'Tokyo',
  currency: 'Japanese yen (JPY)',
  timezone: 'JST (UTC+9)',
  landAreaKm2: 377975,
  landAreaSource: 'World Bank, WDI, 2024',
  prefectures: 47,
  blurb:
    'An island nation in East Asia, the world\u2019s fourth-largest economy and ' +
    'its oldest large society: one in three residents is over 65, and the ' +
    'population has fallen every year since 2009.',
};

// Ten-year series for the charts. Population in millions, GDP in current
// US$ trillions, unemployment and CPI in percent per year.
export const SERIES = {
  population: {
    label: 'Population',
    unit: 'million people',
    source: 'World Bank, WDI (SP.POP.TOTL)',
    points: [
      [2015, 127.1], [2016, 127.0], [2017, 126.8], [2018, 126.5],
      [2019, 126.2], [2020, 125.7], [2021, 125.7], [2022, 125.1],
      [2023, 124.5], [2024, 124.0],
    ],
  },
  gdp: {
    label: 'GDP, current US$',
    unit: 'US$ trillion',
    source: 'World Bank, WDI (NY.GDP.MKTP.CD)',
    points: [
      [2015, 4.44], [2016, 5.00], [2017, 4.93], [2018, 5.04],
      [2019, 5.12], [2020, 5.04], [2021, 5.23], [2022, 4.45],
      [2023, 4.38], [2024, 4.19],
    ],
  },
  unemployment: {
    label: 'Unemployment',
    unit: '% of labour force',
    source: 'World Bank, WDI (SL.UEM.TOTL.ZS), modelled ILO estimate',
    points: [
      [2015, 3.4], [2016, 3.1], [2017, 2.8], [2018, 2.4],
      [2019, 2.4], [2020, 2.8], [2021, 2.8], [2022, 2.6],
      [2023, 2.6], [2024, 2.5],
    ],
  },
  cpi: {
    label: 'Consumer price inflation',
    unit: '% per year',
    source: 'World Bank, WDI (FP.CPI.TOTL.ZG)',
    points: [
      [2015, 0.8], [2016, -0.1], [2017, 0.5], [2018, 1.0],
      [2019, 0.5], [2020, 0.0], [2021, -0.2], [2022, 2.5],
      [2023, 3.3], [2024, 2.7],
    ],
  },
};

// Age structure, 2024 (World Bank, WDI).
export const AGE_STRUCTURE = [
  { group: 'Ages 0\u201314', share: 11.4 },
  { group: 'Ages 15\u201364', share: 58.8 },
  { group: 'Ages 65+', share: 29.8 },
];

// The full indicator table. `value` is the display string; `topic` groups
// the table; `note` says what the number means in one line.
export const INDICATORS = [
  // People
  { id: 'pop', topic: 'People', label: 'Population', value: '123,975,371', year: 2024, source: 'World Bank, WDI', note: '12th largest in the world; falling since 2009.' },
  { id: 'popgrowth', topic: 'People', label: 'Population growth', value: '\u22120.44% per year', year: 2024, source: 'World Bank, WDI', note: 'Births 5.7 per 1,000, deaths 13.3 per 1,000.' },
  { id: 'density', topic: 'People', label: 'Population density', value: '341.5 per km\u00b2', year: 2023, source: 'World Bank, WDI', note: 'Most people live on the Pacific coast plains.' },
  { id: 'urban', topic: 'People', label: 'Urban population', value: '92.2%', year: 2024, source: 'World Bank, WDI', note: 'One of the most urbanised large countries.' },
  { id: 'medianage', topic: 'People', label: 'Median age', value: '50.8 years', year: 2025, source: 'World Bank, WDI', note: 'The oldest median age of any large country.' },
  { id: 'age65', topic: 'People', label: 'Population aged 65 and over', value: '29.8%', year: 2024, source: 'World Bank, WDI', note: 'About 37 million people; the highest share on Earth.' },
  { id: 'age014', topic: 'People', label: 'Population aged 0\u201314', value: '11.4%', year: 2024, source: 'World Bank, WDI', note: 'The lowest child share of any large country.' },
  { id: 'fertility', topic: 'People', label: 'Fertility rate', value: '1.15 births per woman', year: 2024, source: 'World Bank, WDI', note: 'Down from 1.20 in 2023; replacement is 2.1.' },
  // Economy
  { id: 'gdp', topic: 'Economy', label: 'GDP', value: 'US$4.19 trillion', year: 2024, source: 'World Bank, WDI', note: '4th largest economy in the world.' },
  { id: 'gdppc', topic: 'Economy', label: 'GDP per capita', value: 'US$33,797', year: 2024, source: 'World Bank, WDI', note: 'In purchasing-power terms: US$52,039 (2024).' },
  { id: 'gdpgrowth', topic: 'Economy', label: 'GDP growth', value: '\u22120.2% per year', year: 2024, source: 'World Bank, WDI', note: 'Real growth; the economy shrank slightly in 2024.' },
  { id: 'cpi', topic: 'Economy', label: 'Consumer price inflation', value: '2.7% per year', year: 2024, source: 'World Bank, WDI', note: 'After 3.3% in 2023; near zero for most of 2015\u20132021.' },
  { id: 'trade', topic: 'Economy', label: 'Trade (exports + imports)', value: '46.4% of GDP', year: 2024, source: 'World Bank, WDI', note: 'Imports alone are 23.6% of GDP.' },
  { id: 'govdebt', topic: 'Economy', label: 'General government gross debt', value: '229.6% of GDP', year: 2025, source: 'IMF, World Economic Outlook', note: 'The highest public debt ratio in the developed world.' },
  { id: 'rnd', topic: 'Economy', label: 'Research and development spending', value: '3.4% of GDP', year: 2023, source: 'World Bank, WDI', note: 'Among the highest R&D shares in the world.' },
  { id: 'hitech', topic: 'Economy', label: 'High-technology exports', value: '17.6% of manufactured exports', year: 2024, source: 'World Bank, WDI', note: 'Electronics, machinery and precision instruments.' },
  { id: 'gini', topic: 'Economy', label: 'Gini index of inequality', value: '32.3', year: 2020, source: 'World Bank, WDI', note: '0 is perfect equality, 100 is total inequality.' },
  { id: 'fdi', topic: 'Economy', label: 'Foreign direct investment, net inflows', value: 'US$16.2 billion', year: 2024, source: 'World Bank, WDI', note: 'Small for an economy of this size.' },
  // Work
  { id: 'unemp', topic: 'Work', label: 'Unemployment', value: '2.5% of labour force', year: 2024, source: 'World Bank, WDI (modelled ILO estimate)', note: 'One of the lowest rates in the OECD.' },
  { id: 'youthunemp', topic: 'Work', label: 'Youth unemployment (ages 15\u201324)', value: '3.9%', year: 2025, source: 'World Bank, WDI (modelled ILO estimate)', note: 'Low, but young workers are often in irregular jobs.' },
  { id: 'lfpr', topic: 'Work', label: 'Labour force participation', value: '63.4% of ages 15+', year: 2025, source: 'World Bank, WDI', note: 'Up from 59.7% in 2015, driven by women and older workers.' },
  { id: 'empratio', topic: 'Work', label: 'Employment to population ratio', value: '61.7% of ages 15+', year: 2024, source: 'World Bank, WDI', note: 'Modelled ILO estimate.' },
  // Health
  { id: 'lifeexp', topic: 'Health', label: 'Life expectancy at birth', value: '84.0 years', year: 2024, source: 'World Bank, WDI', note: '10th highest in the world; women 87.1, men 81.1.' },
  { id: 'infantmort', topic: 'Health', label: 'Infant mortality', value: '1.8 per 1,000 live births', year: 2024, source: 'World Bank, WDI', note: 'Among the lowest anywhere.' },
  { id: 'u5mort', topic: 'Health', label: 'Under-5 mortality', value: '2.4 per 1,000 live births', year: 2024, source: 'World Bank, WDI', note: 'Down from 3.0 in 2015.' },
  { id: 'maternal', topic: 'Health', label: 'Maternal mortality ratio', value: '3 per 100,000 live births', year: 2023, source: 'World Bank, WDI', note: 'Modelled estimate.' },
  { id: 'healthspend', topic: 'Health', label: 'Current health expenditure', value: '10.7% of GDP', year: 2023, source: 'World Bank, WDI', note: 'Universal coverage since 1961.' },
  // Society
  { id: 'internet', topic: 'Society', label: 'Individuals using the internet', value: '85.5%', year: 2024, source: 'World Bank, WDI', note: 'Up from 79.1% in 2015.' },
  { id: 'mobile', topic: 'Society', label: 'Mobile cellular subscriptions', value: '178.4 per 100 people', year: 2023, source: 'World Bank, WDI', note: 'More subscriptions than people.' },
  { id: 'broadband', topic: 'Society', label: 'Fixed broadband subscriptions', value: '38.6 per 100 people', year: 2023, source: 'World Bank, WDI', note: 'Nearly all of it fibre.' },
  { id: 'forest', topic: 'Society', label: 'Forest area', value: '68.4% of land area', year: 2023, source: 'World Bank, WDI', note: 'Two-thirds of the country is forested mountains.' },
  { id: 'renew', topic: 'Society', label: 'Renewable energy consumption', value: '8.8% of final energy', year: 2021, source: 'World Bank, WDI', note: 'Mostly hydro; solar is growing fast.' },
  { id: 'land', topic: 'Society', label: 'Land area', value: '377,975 km\u00b2', year: 2024, source: 'World Bank, WDI', note: 'About the size of Germany; 14,125 islands.' },
];

export const TOPICS = ['People', 'Economy', 'Work', 'Health', 'Society'];

export const SOURCES_NOTE =
  'All figures are as published by their source. The World Bank revises ' +
  'its World Development Indicators several times a year, so a figure may ' +
  'differ slightly from an older vintage. Government debt is from the IMF ' +
  'World Economic Outlook, which is the standard source for that series.';
