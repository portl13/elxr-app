import { useRequest } from "ahooks";
import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { UserContext } from "../../context/UserContext";
import { SearchContext } from "../../pages/connect";
import { groupTextStyle, inputSearch } from "./connect.style";
import CardMember from "./CardMember";
import useIcon from "../../hooks/useIcon";
import { faSpinner, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const getMember = async (member, user, setIsSearching, isSearching) => {

    if (!user) return;

    setIsSearching(!isSearching);

    const url = process.env.portlApi + '/members';

    const { data } = await Axios.get(url, {
        params: {
            scope: 'all',
            user_id: user.id,
            search: member
        },
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    });

    return data;

}

const ConnectSearchMembers = () => {

    const { user } = useContext(UserContext)

    const { setIsSearching, isSearching } = useContext(SearchContext)

    const { iconElement: spin } = useIcon(faSpinner, true)

    const [value, setValue] = useState('');

    const [members, setMembers] = useState(null);

    const { iconElement: close } = useIcon(faTimesCircle)

    const { data, loading, error, run, mutate } = useRequest(getMember, {
        debounceInterval: 800,
        manual: true,
    });

    const handlerChange = (e) => {

        setValue(e.target.value);
        if (e.target.value.length > 3) run(e.target.value, user, setIsSearching, isSearching);

    }

    const handlerClick = () => {
        setIsSearching(!isSearching)
        setMembers('')
        setValue('')
    }

    useEffect(() => {
        if (data) {
            setMembers(data)
        }
    }, [data])

    return (
        <>
            <Col className="mt-4" xs="12">
                <Form>
                    <FormGroup>
                        <InputGroup className="mb-4">
                            <Input
                                onChange={e => handlerChange(e)}
                                css={inputSearch}
                                name="member"
                                value={value}
                                type="text"
                                placeholder="Search for someone"
                            />

                            {loading && (
                                <InputGroupAddon
                                    addonType="append">
                                    <InputGroupText
                                        css={groupTextStyle}
                                    >
                                        <i>
                                            {spin}
                                        </i>
                                    </InputGroupText>
                                </InputGroupAddon>)}

                            {(members && !loading) && (<InputGroupAddon
                                onClick={() => handlerClick()}
                                addonType="append">
                                <InputGroupText
                                    css={groupTextStyle}
                                >
                                    <i>
                                        {close}
                                    </i>
                                </InputGroupText>
                            </InputGroupAddon>)}


                        </InputGroup>

                    </FormGroup>
                </Form>
            </Col>
            {members ? members.map(member => (
                <div
                    className="col-12"
                    key={member.id}>
                    <CardMember user={member} />
                </div>
            )) : null}
        </>
    );
}

export default ConnectSearchMembers;
