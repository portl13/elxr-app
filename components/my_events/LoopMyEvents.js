import React from 'react';
import { Col } from "reactstrap";
import CardEventOnline from '../events/online/CardEventOnline';
import CardEnventReal from '../events/real/CardEnventReal';


const LoopMyEvents = ({events}) => {
    return ( 
    <>
        {events.map(item=>{

            if(item.type_event === 'virtual'){
                item.id = item.slug
                item.imageUrl = item?.image_event
                item.title = item?.title_event
                item.event_id= item?.id
                return (
                    <Col key={item.id} xs="12" md="6" lg="4">
                        <CardEventOnline event={item} />
                    </Col>
                )
            }

            item.imageUrl = item?.image_event
            item.title = item?.title_event
            item.id = item.slug
            
            return (
                <Col key={item.id} xs="12" md="6" lg="4">
                    <CardEnventReal event={item} />
                </Col>
            )

        })}
    </> );
}
 
export default LoopMyEvents;