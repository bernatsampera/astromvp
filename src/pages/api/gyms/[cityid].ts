import { supabase } from '~/server/db';
import type { GymType } from '~/types/gym';

export async function GET({ params, request }) {
  try {
    // const cityId = 1840019591;
    const cityId = params.cityid;
    console.log('params', params);

    console.log('cityId', cityId);

    const { data: dbGyms, error } = await supabase.from('gyms').select('*').eq('cityid', cityId).limit(10);

    // return new Response(JSON.stringify(gyms));

    // const dbGyms = [
    //   {
    //     gymid: 'ChIJeU0gUonMRIYR-Sw3F407_zo',
    //     address: '',
    //     category: 'Martial arts school',
    //     storename: 'Fight Factory Jiu-jitsu',
    //     stars: 5,
    //     numberofreviews: 86,
    //     cityid: 1840019590,
    //   },
    //   {
    //     gymid: 'ChIJH5p9sFFLW4YR7AqBERZr8Nk',
    //     address: '',
    //     category: 'Martial arts school',
    //     storename: 'Integração USA - Brazilian Jiu Jitsu',
    //     stars: 4.8,
    //     numberofreviews: 137,
    //     cityid: 1840019590,
    //   },
    //   {
    //     gymid: 'ChIJiQDJ-L_LRIYR6aXxdLRq_sA',
    //     address: '',
    //     category: 'Jujitsu school',
    //     storename: 'Gracie Barra North Austin',
    //     stars: 4.7,
    //     numberofreviews: 86,
    //     cityid: 1840019590,
    //   },
    //   {
    //     gymid: 'ChIJsxJeewu1RIYRh8RhM4Ty24g',
    //     address: '',
    //     category: 'Martial arts school',
    //     storename: 'Austin Jiu-Jitsu Collective',
    //     stars: 5,
    //     numberofreviews: 24,
    //     cityid: 1840019590,
    //   },
    //   {
    //     gymid: 'ChIJJ7U5c8m1RIYRueqeMrykijY',
    //     address: '',
    //     category: 'Martial arts school',
    //     storename: 'Aces Jiu Jitsu Club',
    //     stars: 4.3,
    //     numberofreviews: 171,
    //     cityid: 1840019590,
    //   },
    //   {
    //     gymid: 'ChIJ3Y-mRDPNRIYR7T4hEH-Zxos',
    //     address: '',
    //     category: 'Jujitsu school',
    //     storename: 'Brazilian Top Team Austin',
    //     stars: 4.9,
    //     numberofreviews: 46,
    //     cityid: 1840019590,
    //   },
    //   {
    //     gymid: 'ChIJ068EiGRLW4YR0ySZj7Wgv1g',
    //     address: '',
    //     category: 'Martial arts school',
    //     storename: 'Paragon Jiu-Jitsu Academy - Austin',
    //     stars: 5,
    //     numberofreviews: 184,
    //     cityid: 1840019590,
    //   },
    //   {
    //     gymid: 'ChIJL6g2n_nLRIYR7lRIolOlj3Y',
    //     address: '',
    //     category: 'Martial arts school',
    //     storename: 'V.O.W. BJJ',
    //     stars: 4.9,
    //     numberofreviews: 49,
    //     cityid: 1840019590,
    //   },
    //   {
    //     gymid: 'ChIJPVDkC49LW4YR6LkVeKpAV50',
    //     address: '',
    //     category: 'Martial arts school',
    //     storename: 'The B-Team Jiu Jitsu',
    //     stars: 4.9,
    //     numberofreviews: 84,
    //     cityid: 1840019590,
    //   },
    //   {
    //     gymid: 'ChIJnd0edPDTRIYRwEVudDm2OgQ',
    //     address: '',
    //     category: 'Martial arts school',
    //     storename: 'Violet Crown Jiu Jitsu',
    //     stars: 4.9,
    //     numberofreviews: 62,
    //     cityid: 1840019590,
    //   },
    // ];

    if (!dbGyms) {
      throw new Error('No gyms found');
    }

    if (error) {
      throw new Error(error);
    }

    const gyms = dbGyms.map((gym) => ({
      gymId: gym.gymid,
      address: gym.address,
      category: gym.category,
      storeName: gym.storename,
      stars: gym.stars,
      numberOfReviews: gym.numberofreviews,
      cityId: gym.cityid,
    }));

    return new Response(JSON.stringify(gyms));
  } catch (err) {
    return new Response(err);
  }
}
