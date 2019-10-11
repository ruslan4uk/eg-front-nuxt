import axios from 'axios'

export default async function() {
        
    return axios.get((process.env.BASE_URL || 'https://api.excursguide.ru/api/v1') + '/sitemap')
        .then(res => {
            let route = []

            let route_tour = res.data.tours.map(x => '/guide/' + x.user_id + '/tour/' + x.id)

            let route_guide = res.data.tours.map(x => '/guide/' + x.user_id)

            return route.concat(route_tour, route_guide) 
        })

};
