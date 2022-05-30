import { useContext, useState, useEffect } from "react";
import Head from "next/head";
import { Form, FormGroup, Input, Alert } from "reactstrap";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

import LayoutAuth from "../components/layout/LayoutAuth";

import {
    AnchorCaption,
    DivCaption,
    topInputStyle,
    midleInputStyle,
    bottomInputStyle
} from "../components/ui/auth/auth.style";

import BlockUi, { containerBlockUi } from "../components/ui/blockui/BlockUi";
import useUpdateProfile from "../hooks/useUpdateProfile";
import ProfileDatePicker from "../components/profile/ProfileDatePicker";
import ProfileDropzone from "../components/profile/ProfileDropzone";
import { UserContext } from "../context/UserContext";
import { useChannel } from "../hooks/useChannel";
import ChannelCropUpload from "../components/channels/ChannelCropUpload";



export default function UpdateProfile() {

    const [blocking, setBlocking] = useState(true);


    const { user, setUser } = useContext(UserContext)

    const { channel, isLoading } = useChannel( user?.user_login );

    const [initialValues, setInitialValues ] = useState({
        name: '',
        last_name: '',
        birthdate: '',
        gender: '',
        about_me: '',
        channel: ''
    })

    const { updateProfile } = useUpdateProfile({ setBlocking })


    const validationSchema = Yup.object({
        name: Yup.string()
            .required('First Name is required or Skip for now'),
        last_name: Yup.string()
            .required('Last Name is required or Skip for now'),
        birthdate: Yup.string(),
        gender: Yup.string()
            .oneOf(
                ['Male', 'Female', 'Other'],
                'Invalid Gender'
            ).required('Gender is required or Skip for now'),
        about_me: Yup.string()
            .min(10, 'The biography must be at least 10 letters')
            .required('Biography is required or Skip for now'),

    })
    
    useEffect(() => {

        if(isLoading) return;
        setBlocking(false);

        const getInitialValue = ( channel ) => {

            const initialValues = {};

            const { xprofile: {
                groups = null
            } } = channel;


            if ( !groups ) return;

            if(groups[1]?.fields){
                initialValues.name = groups[1]?.fields[1]?.value?.raw || ""
                initialValues.last_name = groups[1]?.fields[31]?.value?.raw || ""
                initialValues.about_me =  groups[1]?.fields[25]?.value?.raw || ""
                initialValues.birthdate = new Date( groups[1]?.fields[26]?.value?.raw ) || ""
                initialValues.gender = groups[1]?.fields[27]?.value?.raw || ""

            }


            if(groups[2]?.fields){
                initialValues.channel = 'yes'
            }

            return initialValues;

        }

        if(channel){
            const values = getInitialValue(channel)

            setInitialValues({
                ...initialValues,
                ...values
            })
        }

    }, [isLoading])

    return (
        <LayoutAuth>
            <Head>
                <title>WeShare | UPDATE PROFILE</title>
            </Head>
            <ChannelCropUpload />
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => updateProfile(values)}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleSubmit,
                    } = props;
                    return (
                        <Form css={containerBlockUi} onSubmit={handleSubmit} >


                            { blocking && <BlockUi color="#eb1e79" />}

                            {errors.name && touched.name ? (
                                <Alert color="warning">{errors.name}</Alert>
                            ) : null}
                            {errors.last_name && touched.last_name ? (
                                <Alert color="warning">{errors.last_name}</Alert>
                            ) : null}
                            {errors.birthdate && touched.birthdate ? (
                                <Alert color="warning">{errors.birthdate}</Alert>
                            ) : null}
                            {errors.gender && touched.gender ? (
                                <Alert color="warning">{errors.gender}</Alert>
                            ) : null}

                            {errors.about_me && touched.about_me ? (
                                <Alert color="warning">{errors.about_me}</Alert>
                            ) : null}

                            <FormGroup>
                                <Input
                                    css={topInputStyle}
                                    id="name"
                                    name="name"
                                    placeholder="First Name"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.name}
                                />
                                <Input
                                    css={midleInputStyle}
                                    id="last_name"
                                    placeholder="Last Name"
                                    name="last_name"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.last_name}
                                />

                                <ProfileDatePicker name="birthdate" />

                                <select
                                    css={midleInputStyle}
                                    onChange={handleChange}
                                    value={values.gender}
                                    name="gender"
                                    className="form-control"
                                    id="gender">
                                    <option value="">Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>

                                <Input
                                    css={midleInputStyle}
                                    id="about_me"
                                    name="about_me"
                                    type="text"
                                    placeholder="Bioghaphy (A few Words)"
                                    onChange={handleChange}
                                    value={values.about_me}
                                />

                                <select
                                    css={bottomInputStyle}
                                    onChange={handleChange}
                                    value={values.channel}
                                    name="channel"
                                    className="form-control"
                                    id="channel">
                                    <option value="">Create a WeShare channel?</option>
                                    <option value="yes">yes</option>
                                    <option value="no">no</option>
                                </select>
                            </FormGroup>
                            <input className="btn btn-block btn-primary" value="Update Details" type="submit" />
                        </Form>
                    );
                }}
            </Formik>


            <DivCaption className="mt-4">
                <span>Update You Details Later</span>
            </DivCaption>

            <AnchorCaption>
                <Link href="/">
                    <a >Skip for now</a>
                </Link>
            </AnchorCaption>
        </LayoutAuth>
    );
}