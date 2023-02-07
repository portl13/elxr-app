import React, {useContext} from 'react';
import {UserContext} from "@context/UserContext";
import Profile from "@components/profile/Profile";
import MyCourse from "@components/course/myCourse";

function Courses({profileId}) {
    const { user } = useContext(UserContext);

    return (
        <Profile path={"courses"} user={user} profileId={profileId}>
            <MyCourse profileId={profileId} />
        </Profile>
    );
}

export default Courses;

export async function getServerSideProps({ query }) {
    const { id } = query;
    return {
        props: { profileId: id },
    };
}
