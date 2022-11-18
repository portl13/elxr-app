import ScrollTags from '@components/shared/slider/ScrollTags'
import React, { useState } from 'react'

const categoryRealEvents = [
  {
    value: 'Music',
    label: 'Music',
  },
  {
    value: 'Community',
    label: 'Community',
  },
  {
    value: 'Sports',
    label: 'Sports',
  },
  {
    value: 'Other',
    label: 'Other',
  },
  {
    value: 'Family',
    label: 'Family',
  },
  // {
  //     "value": "Business",
  //     "label": "Workshops and Classes"
  // },
  {
    value: 'Theatre',
    label: 'Theatre',
  },
  {
    value: 'Comedy',
    label: 'Comedy',
  },
  {
    value: 'Food',
    label: 'Food',
  },
  {
    value: 'Film',
    label: 'Film',
  },
  {
    value: 'Yoga',
    label: 'Yoga & Wellness',
  },
  {
    value: 'Fashion',
    label: 'Fashion',
  },
  {
    value: 'Science',
    label: 'Science',
  },
  {
    value: 'Travel',
    label: 'Travel',
  },
  {
    value: 'Museum',
    label: 'Museum',
  },
]

function InPersonEvents() {
  const [category, setCategory] = useState('')
  const [startRealEvent, setStartRealEvent] = useState(Date.now())

  const all = () => {
    setCategory('')
  }

  return (
    <>
      
    </>
  )
}

export default InPersonEvents
