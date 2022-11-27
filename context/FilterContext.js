import { createContext, useState } from 'react'


export const FilterContext = createContext({})

const FilterContextProvider = ({ children }) => {
    const [showRealMessage, setShowRealMessage] = useState(false);
    const [showOnlineMessage, setShowOnlineMessage] = useState(false);

    const [typeEvent, setTypeEvent] = useState("online")

    const [startEvent, setStartEvent] = useState(Date.now())

    const [endEvent, setEndEvent] = useState(null);

    const [startRealEvent, setStartRealEvent] = useState(Date.now());

    const categoryRealEvents = [
        {
            "value": "Music",
            "label": "Music"
        },
        {
            "value": "Community",
            "label": "Community"
        },
        {
            "value": "Sports",
            "label": "Sports"
        },
        {
            "value": "Other",
            "label": "Other"
        },
        {
            "value": "Family",
            "label": "Family"
        },
        // {
        //     "value": "Business",
        //     "label": "Workshops and Classes"
        // },
        {
            "value": "Theatre",
            "label": "Theatre"
        },
        {
            "value": "Comedy",
            "label": "Comedy"
        },
        {
            "value": "Food",
            "label": "Food"
        },
        {
            "value": "Film",
            "label": "Film"
        },
        {
            "value": "Yoga",
            "label": "Yoga & Wellness"
        },
        {
            "value": "Fashion",
            "label": "Fashion"
        },
        {
            "value": "Science",
            "label": "Science"
        },
        {
            "value": "Travel",
            "label": "Travel"
        },
        {
            "value": "Museum",
            "label": "Museum"
        }
    ]

    const [optionsRealEvent, setOptionsRealEvent] = useState(categoryRealEvents)

    const [optionsOnlineEvent, setOptionsOnlineEvent] = useState([
        { label: "Music", value: "music" },
        { label: "Activism", value: "activism" },
        { label: "Art", value: "art" },
        { label: "Food and Drink", value: "food-and-drink" }
    ])

    const [categoriesOnlineEvent, setCategoriesOnlineEvent] = useState([])

    const [categoriesRealEvent, setCategoriesRealEvent] = useState(categoryRealEvents)

    return (
        <FilterContext.Provider

            value={{
                categoriesRealEvent,
                setCategoriesRealEvent,
                optionsRealEvent,
                setOptionsRealEvent,
                optionsOnlineEvent,
                setOptionsOnlineEvent,
                categoriesOnlineEvent,
                setCategoriesOnlineEvent,
                startEvent,
                endEvent,
                setStartEvent,
                setEndEvent,
                startRealEvent,
                setStartRealEvent,
                typeEvent,
                setTypeEvent,
                showRealMessage,
                setShowRealMessage,
                showOnlineMessage,
                setShowOnlineMessage
            }}

        >
            {children}
        </FilterContext.Provider>
    );
}

export default FilterContextProvider;
