import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useRouter } from "next/router";
import { getEventById, createChannelEvent } from "../../../pages/api/go-live.api";
import EditDetails from "./EditDetails";
import EditCustomization from "./EditCustomization";
import EditVisibility from "./EditVisibility";
import { TIMEOUT } from "../../../utils/constant";
import Router from 'next/router';
import { useAlert } from "react-alert";
import moment from 'moment';



function EditEvent() {
    const alert = useAlert();
    const { user } = useContext(UserContext);
    const [status, setStatus] = useState("detail")
    const [title, setEventTitle] = useState();
    const [description, setDescription] = useState();
    const [category, setSelCategory] = useState();
    const [eventDetails, setEventDetails] = useState([]);
    const [live_chat, setLive_chat] = useState();
    const [record_stream, setTRecord_stream] = useState();
    const [message_delay, setMessage_delay] = useState();
    const [message_delay_time, setMessage_delay_time] = useState("");
    const [participants, setParticipants] = useState(eventDetails?.[0]?.participants ?? 'anyone');
    const [visability, setVisability] = useState(eventDetails?.[0]?.visability ?? 'public');
    const [thumbnail, setUploadImage] = useState(false);
    const [imageSpinner, setImageSpinner] = useState(false);
    const [date_time, setDateTime] = useState(new Date());
    const [image, setImage] = useState();
    const [eventTime, setTime] = useState();
    const format = 'hh:mm A';

    const now = moment().hour(0).minute(0);
    const router = useRouter();
    const query = router.query;
    const id = parseInt(query.id);



    useEffect(() => setTimeout(() => setImageSpinner(false), [2500]), [image]);
    const eventParticipants = [
        {
            label: "anyone",
            value: "anyone"
        },
        {
            label: "subscribers",
            value: "subscribers"
        }
    ]
    const privacy = [

        {
            name: "Private",
            value: "private",
            description: "Only you and people you choose can watch your stream"
        },
        {
            name: "Unlisted",
            value: "unlisted",
            description: "Anyone with the stream link can watch your stream"
        },
        {
            name: "Public",
            value: "public",
            description: "Everyone can watch your stream"
        }
    ]

    function EventDetail(customer_id) {
        getEventById(customer_id).then((res) => {
            setEventDetails(res.data.data);
            setParticipants(res.data.data?.[0]?.participants ?? 'anyone');
            setVisability(res.data.data?.[0]?.visability ?? 'public');
            setEventTitle(res.data.data[0]?.title);
            setDescription(res.data.data[0]?.description);
            setMessage_delay_time(res.data.data[0]?.message_delay_time)
            const dateTime = res.data.data?.[0]?.date_time?.split(' ')?.[0] ?? ''
            const eventTime = moment(res.data.data?.[0]?.date_time);
            setTime(eventTime)

            
            if (dateTime) {
                setDateTime(new Date(dateTime));
            }
            else {
                setDateTime(new Date());
            }
        })
    }
    useEffect(() => {
        if (id) {
            EventDetail(id);
        }
    }, [id]);




    const getvalue=(status) => {
        if(checKError(status)){
            const formData ={
                id,
                title,
                description,
                category,
                thumbnail:image?.id ? image.id: '',
                live_chat,
                record_stream,
                participants,
                message_delay,
                message_delay_time,
                visability,
                date_time: moment(date_time).format("YYYY-MM-DD ").concat(eventTime.format("hh:mm:ss"))
               // date_time: moment(date_time).format("YYYY-MM-DD ")

            }
            createChannelEvent(user, formData).then((res) => {
                alert.success("Event updated successfully.", TIMEOUT);
                Router.push('/my-portal?tab=golive&nav=events')
            });
        }

       

    };
    const checKError = () => {
        let status = true;
        if (!visability) {
            alert.error("Please add atleast one visability before submit.", TIMEOUT);
            status = false;
        }

        return status;
    };
    function getNextStatus() {
        if (status === "detail") {
            if (!title) {
                alert.error("Please add event title before submit.", TIMEOUT);
            }
            else if (!description) {
                alert.error("Please add event description before submit.", TIMEOUT);
            }

            else {
                setStatus("customization")

            }
        }

        else if (status === "customization") {

             if (!message_delay_time) {
                alert.error("Please add message delay time before submit.", TIMEOUT);
            }
            else {
                setStatus("visibility")
            }

        }
    }
    function getPrevStatus() {
        if (status === "customization") {
            setStatus("detail")

        }
        else if (status === "visibility") {
            setStatus("customization")

        }
    }
    return (
        <>
            <div className="wcfm-collapse-content">
                <div className="create-stream-session">
                    <h1>Create Stream</h1>

                    {status === "detail" && <EditDetails
                    setEventTitle= {setEventTitle}
                        eventDetails={eventDetails}
                        title ={title}
                        setUploadImage= {setUploadImage}
                        thumbnail= {thumbnail}
                        imageSpinner={imageSpinner}
                        user={user}
                        setImage = {setImage}
                        image = {image}
                        setImageSpinner= {setImageSpinner}
                        description = {description}
                        setDescription = {setDescription}


                    />}

                    {status === "customization" && <EditCustomization
                        eventDetails={eventDetails}
                        eventParticipants={eventParticipants}
                        setParticipants={setParticipants}
                        participants={participants}
                        setLive_chat = {setLive_chat}
                        live_chat= {live_chat}
                        setTRecord_stream = {setTRecord_stream}
                        record_stream={record_stream}
                        setMessage_delay_time = {setMessage_delay_time}
                        message_delay_time= {message_delay_time}
                    />}

                    {status === "visibility" && <EditVisibility
                        eventDetails={eventDetails}
                        privacy={privacy}
                        setVisability={setVisability}
                        visability={visability}
                        setDateTime= {setDateTime}
                        date_time= {date_time}
                        setMessage_delay = {setMessage_delay}
                        format={format}
                        now={now}
                        setTime= {setTime}
                        eventTime = {eventTime}
                    />}
                    <div className={status === "detail" && "next-btn" || "button-section"}>
                        {status !== "detail" && <button onClick={() => getPrevStatus()}>Back</button>}
                        {status !== "visibility" && <button onClick={() => getNextStatus(status)}>Next</button>}

                        {status === "visibility" && <button onClick={() => getvalue()}>Done</button>}
                    </div>
                </div>
            </div>



        </>
    )
}

export default EditEvent;