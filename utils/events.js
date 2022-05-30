export const EVENT_TAB = [{
    name: "All Events", value: "all", isShow:true
},
{
    name: "My Events", value: "my", isShow:false
}]

let time = new Date(Date.now()).toISOString()
let start_date = `${time.slice(0, 10)} ${time.slice(11, 19)}`

export const CATEGORIES = [
    {
        link: 'music',
        name: 'Music',
        params: {
            start_date,
            categories: 'music',
        },
    },
    {
        link: 'activism',
        name: 'Activism',
        params: {
            start_date,
            categories: 'activism',
        },
    },
    {
        link: 'food-and-drink',
        name: 'Food and Drink',
        params: {
            start_date,
            categories: 'food-and-drink',
        },
    },
    {
        link: 'yoga',
        name: 'Yoga',
        params: {
            start_date,
            categories: 'yoga',
        },
    },
    {
        link: 'art',
        name: 'Art',
        params: {
            start_date,
            categories: 'art',
        },
    },
    {
        link: 'fitness',
        name: 'Fitness',
        params: {
            start_date,
            categories: 'fitness',
        },
    },
    {
        link: 'comedy',
        name: 'Comedy',
        params: {
            start_date,
            categories: 'comedy',
        },
    },
    {
        link: 'wellness',
        name: 'Wellness',
        params: {
            start_date,
            categories: 'wellness',
        },
    },
    {
        link: 'film',
        name: 'Film',
        params: {
            start_date,
            categories: 'film',
        },
    },
]