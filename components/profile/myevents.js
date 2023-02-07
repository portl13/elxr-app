import React from "react"

import {


    Card,
    CardBody,


    FormGroup,


    Form
} from 'reactstrap';

export default function MyEvents() {
    return (
        <>


            <Form className="was-validated" >
                <CardBody>
                    <Card>
                        <CardBody className="card-body-form">

                            <FormGroup row className="my-0">

                                <FormGroup>
                                    <h3>My Events</h3>
                                </FormGroup>

                            </FormGroup>
                        </CardBody>
                    </Card>
                </CardBody>
            </Form>



        </>
    )
}
