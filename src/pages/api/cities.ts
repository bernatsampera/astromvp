import { supabase } from '~/server/db';

export async function GET({ params, request }) {
  const url = new URL(request.url);
  const cityStartsWith = url.searchParams.get('search');
  console.log('url', url);

  console.log('cityStartsWith', cityStartsWith);
  const { data: cities, error } = await supabase
    .from('cities')
    .select('*')
    .ilike('city', `${cityStartsWith}%`)
    .order('population', { ascending: false })
    .limit(10);

  // const cities = [
  //   {
  //     id: 1724594040,
  //     city: 'Barcelona',
  //     country: 'Spain',
  //     iso2: 'ES',
  //     iso3: 'ESP',
  //     capital: 'admin',
  //     population: 4800000,
  //   },
  //   {
  //     id: 1862418619,
  //     city: 'Barcelona',
  //     country: 'Venezuela',
  //     iso2: 'VE',
  //     iso3: 'VEN',
  //     capital: 'admin',
  //     population: 448016,
  //   },
  //   {
  //     id: 1076791102,
  //     city: 'Barcarena Nova',
  //     country: 'Brazil',
  //     iso2: 'BR',
  //     iso3: 'BRA',
  //     capital: null,
  //     population: 126650,
  //   },
  //   {
  //     id: 1620850431,
  //     city: 'Barcelos',
  //     country: 'Portugal',
  //     iso2: 'PT',
  //     iso3: 'PRT',
  //     capital: 'minor',
  //     population: 120391,
  //   },
  //   {
  //     id: 1380260535,
  //     city: 'Barcellona-Pozzo di Gotto',
  //     country: 'Italy',
  //     iso2: 'IT',
  //     iso3: 'ITA',
  //     capital: null,
  //     population: 39885,
  //   },
  //   {
  //     id: 1608408567,
  //     city: 'Barcelona',
  //     country: 'Philippines',
  //     iso2: 'PH',
  //     iso3: 'PHL',
  //     capital: null,
  //     population: 20987,
  //   },
  //   {
  //     id: 1076105080,
  //     city: 'Barcelos',
  //     country: 'Brazil',
  //     iso2: 'BR',
  //     iso3: 'BRA',
  //     capital: 'minor',
  //     population: 18831,
  //   },
  // ];

  console.log('cities', cities);

  return new Response(JSON.stringify(cities));

  // return new Response(JSON.stringify(res));
}
