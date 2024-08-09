import { supabase } from '~/server/db';

export async function GET({ params, request }) {
  // const url = new URL(request.url);
  // const cityStartsWith = url.searchParams.get('city');
  // let { data: cities, error } = await supabase.from('cities').select('*').ilike('name', `${cityStartsWith}%`).limit(10);

  // console.log('cities', cities);
  // console.log('error', error);

  const res = [
    { name: 'Barcelona' },
    { name: 'Barceloneta' },
    { name: 'Barcelonnette' },
    { name: 'Barcelonne-du-Gers' },
  ];
  // return new Response(
  //   JSON.stringify({
  //     cities: cities,
  //   })
  // );

  return new Response(JSON.stringify(res));
}
