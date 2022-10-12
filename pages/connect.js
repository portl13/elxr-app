import { createContext, useContext, useEffect, useState } from "react"
import { Col, Row } from "reactstrap"
import Layout from "../components/layout/Layout"
import RightSidebar from "../components/layout/RightSidebar"
import Head from 'next/head'
import { ButtonActionConnect, rightButton, leftButton } from "../components/connect/connect.style"
import ConnectAllList from "../components/connect/ConnectAllList"
import ConnectPersonalList from "../components/connect/ConnectPersonalList"
import ConnectSearchMembers from "../components/connect/ConnectSearchMembers"
import { UserContext } from "../context/UserContext"

export const SearchContext = createContext();

export default function ConnectPage() {

    const [scope, setScope] = useState('all')
    const [isSearching, setIsSearching] = useState(false);

    const { user } = useContext(UserContext)

    const [auth, setAuth] = useState(false);


    useEffect(() => {
        if (!user) return;
        setAuth(!auth);
    }, [user])

    useEffect(() => {
        if (!user && auth) {
            setAuth(!auth);
        }
    }, [user])



    return (
        <Layout>
            <Head>
                <title>PORTL | CONNECT</title>
            </Head>
            <Col xs="12" md="11" lg="8">
                <Row className="justify-content mt-4">
                    {auth && (
                        <Col xs="12">
                            <ButtonActionConnect
                                className="btn"
                                active={scope === 'all'}
                                onClick={() => setScope('all')}
                                css={leftButton}
                            >
                                Everyone
                            </ButtonActionConnect>
                            <ButtonActionConnect
                                active={scope === 'personal'}
                                onClick={() => setScope('personal')}
                                className="btn"
                                css={rightButton}
                            >
                                Friends
                            </ButtonActionConnect>
                        </Col>
                    )}
                    <SearchContext.Provider
                        value={{
                            setIsSearching,
                            isSearching
                        }}
                    >
                        <ConnectSearchMembers />
                        {(scope === 'all') && !isSearching ? <ConnectAllList /> : null}
                        {(scope === 'personal') && !isSearching ? <ConnectPersonalList /> : null}
                    </SearchContext.Provider>
                </Row>
            </Col>
            <RightSidebar lg="4">

            </RightSidebar>
        </Layout>
    )
}


