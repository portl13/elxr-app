import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "@context/UserContext";
import axios from "axios";
import {getGroupTypes} from "@api/group.api";
import {Button, Col, Form, FormGroup, Input, Label, Spinner,} from "reactstrap";
import {LoaderContainer, LoadingBtn, SubNav,} from "@components/livefeed/livefeed.style";
import Router from "next/router";
import {ActionBar} from "@components/livefeed/connection.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faClock, faThLarge} from "@fortawesome/free-solid-svg-icons";
import {GroupContainer} from "@components/livefeed/community.style";
import InfinitScroll from "react-infinite-scroll-component";
import AllCommunityCard from "@pages/profile/allcommunitycard";

function CommunityList() {
  const { user } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [scope, setScope] = useState("all");
  const [loadData, setLoadData] = useState(false);
  const [view, setView] = useState("grid");
  const [length, setLength] = useState(0);
  const [group_type, setGroupType] = useState("");
  const [status, setStatus] = useState(false);
  const [type, setType] = useState("active");
  const [count, setCount] = useState(0);
  const [groupData, setGroupData] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchGroup, setSearchGroup] = useState(false);
  const [groupTypes, setGroupTypes] = useState([
    {
      label: "All Types",
      value: "all",
    },
  ]);
  const invite = process.env.bossApi + "/groups/membership-requests";
  useEffect(() => {
    //if (user?.id) {
    getGroups();
    //}
  }, [group_type, type, page, scope, user]);

  async function getGroups(pages, isEmpty = false) {
    let group = [...result];
    let listLen = length;
    let groupList = isEmpty ? [] : group;
    let listLength = isEmpty ? 0 : listLen;
    isEmpty && setPage(pages);

    let paramData = {
      method: "GET",
      params: {
        page: page,
        per_page: 20,
        scope: scope,
        ...(group_type !== "" ? { group_type: group_type } : null),
        type: type,
        show_hidden: "true",
        ...(searchGroup && { search: searchText }),
      },
    };

    if (user) {
      paramData.headers = {
        Authorization: `Bearer ${user?.token}`,
      };
    }

    await axios(process.env.bossApi + "/groups/", paramData)
      .then((res) => {
        let list = [...groupList, ...res.data];
        setResult(list);
        let total =
          res.headers["x-wp-total"] !== undefined
            ? res.headers["x-wp-total"]
            : null;
        setCount(total);
        for (let i = 1; i <= page; i++) {
          setLength(listLength + parseInt(res.data.length));
        }
        setLoadData(true);
        setStatus(true);
        if (res.data.length === 0) {
          setLoader(false);
        } else {
          setLoader(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const url = process.env.bossApi;
  function joinGroup(childData, groupStatus) {
    setGroupData(groupStatus);
    const group_id = childData;
    axios
      .post(
        url + `/groups/${group_id}/members`,
        {
          user_id: user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        let index = result.findIndex((item) => item.id === group_id);
        result[index].role = "Member";
        result[index].members_count = parseInt(result[index].members_count) + 1;
        setResult(result);
        setGroupData(true);
      });
  }
  function memberDelete(childData, groupStatus, createrId, roleStatus) {
    setGroupData(groupStatus);
    const group_id = childData;
    roleStatus && getGroupMember(group_id, createrId);
    !roleStatus && deleteMembership(group_id);
  }
  function getGroupMember(groupId, createrid) {
    axios(process.env.bossApi + `/groups/${groupId}/members`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      params: {
        per_page: 100,
        roles: "admin",
        exclude: createrid,
      },
    }).then((res) => {
      const member = res.data.map((d) => d.id);
      axios
        .patch(
          process.env.bossApi + `/groups/${groupId}`,
          {
            id: groupId,
            creator_id: parseInt(member.toString()),
          },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
        .then((res) => {
          deleteMembership(groupId);
        });
    });
  }
  function deleteMembership(group_id) {
    axios(process.env.bossApi + `/groups/${group_id}/members/${user.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      var index = result.findIndex((item) => item.id === group_id);
      result[index].role = "";
      result[index].members_count = parseInt(result[index].members_count) - 1;
      setResult(result);
      setGroupData(true);
    });
  }
  function joinRequest(group_Id, groupStatus) {
    setGroupData(groupStatus);
    axios
      .post(
        invite,
        {
          group_id: group_Id,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        var index = result.findIndex((item) => item.id === group_Id);
        result[index].can_join = false;
        setResult(result);
        setGroupData(true);
      });
  }
  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setResult([]);
      setLength(0);
      setLoader(true);
      setLoadData(false);
      getGroups(1, true);
    } else {
      const search = e.target ? e.target.value : e;
      setSearchText(search);
      setSearchGroup(true);
    }
  };

  useEffect(() => {
    getGroupTypes().then(({ data }) => {
      const type = data.data;
      setGroupTypes([...groupTypes, ...type]);
    });
  }, []);

  return (
    <Col className="pt-20" xs="12">
      <div className="row">
        <div className="col-12 col-md-9">
          <h4 className="mb-4 font-weight-bold">Communities</h4>
        </div>
        <Form className="col-12 col-md-3 ml-auto pr-md-0 py-2">
          <FormGroup>
            <Label for="feedSearch" className="sr-only">
              Search
            </Label>
            <Input
              className="input-search"
              type="search"
              name="search"
              id="feedSearch"
              placeholder="Search Groups…"
              value={searchText}
              onChange={handleSearch}
              onKeyDown={handleSearch}
            />
          </FormGroup>
        </Form>
      </div>
      <SubNav className="w-100">
        <ul>
          <li className={scope === "all" ? "active" : ""}>
            <Button
              type="button"
              onClick={() => {
                setScope("all");
                setResult([]);
                setLoadData(false);
                setPage(1);
                setLength(0);
                setCount(0);
                setSearchText("");
              }}
            >
              All Communities
              {scope === "all" ? (
                <span className="badge badge-pill badge-primary ml-2">
                  {count}
                </span>
              ) : null}
            </Button>
          </li>

          {user && (
            <>
              <li className={scope === "personal" ? "active" : ""}>
                <Button
                  type="button"
                  onClick={() => {
                    setScope("personal");
                    setResult([]);
                    setLoadData(false);
                    setPage(1);
                    setLength(0);
                    setCount(0);
                    setSearchText("");
                  }}
                >
                  My Communities
                  {scope === "personal" ? (
                    <span className="badge badge-pill badge-primary ml-2">
                      {count}
                    </span>
                  ) : null}
                </Button>
              </li>
              <li>
                <Button
                  type="button"
                  onClick={() => Router.push("/community/create-group")}
                >
                  Create a Group
                </Button>
              </li>
            </>
          )}
        </ul>
      </SubNav>
      <ActionBar className="justify-content-around justify-content-md-end">
        <Input
          type="select"
          id="filterCommunityType"
          className="input-search"
          onChange={(e) => {
            setGroupType(e.target.value);
            setPage(1);
            setResult([]);
            setLength(0);
            setLoadData(false);
            setCount(0);
          }}
        >
          {groupTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </Input>
        <Input
          type="select"
          className="input-search"
          id="filterConnection"
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
            setResult([]);
            setLength(0);
            setLoadData(false);
            setCount(0);
          }}
        >
          <option value="active">Recently Active</option>
          <option value="popular">Most Members</option>
          <option value="newest">Newly Created</option>
          <option value="alphabetical">Alphabetical</option>
        </Input>
        <div className="d-none d-md-flex">
          <div className="has-tooltip select">
            <div className="popover bs-popover-top">
              <div className="arrow"></div>
              <div className="popover-body">Grid view</div>
            </div>
            <FontAwesomeIcon icon={faThLarge} onClick={() => setView("grid")} />
          </div>
          <div className="has-tooltip select">
            <div className="popover bs-popover-top">
              <div className="arrow"></div>
              <div className="popover-body">List view</div>
            </div>
            <FontAwesomeIcon icon={faBars} onClick={() => setView("list")} />
          </div>
        </div>
      </ActionBar>
      <GroupContainer>
        {loadData === false ? (
          <p css={LoaderContainer}>
            <span>
              <FontAwesomeIcon icon={faClock} />
            </span>
            Loading your groups. Please wait.
          </p>
        ) : null}
        {length === 0 && status && loadData ? (
          <p css={LoaderContainer}>
            <span>
              <FontAwesomeIcon icon={faClock} />
            </span>
            No Results.
          </p>
        ) : null}
        {loadData === true ? (
          <div className="d-flex flex-column flex-fill w-100">
            <InfinitScroll
              dataLength={result.length}
              next={() => setPage(page + 1)}
              hasMore={true}
              loader={
                loader === true ? (
                  <LoadingBtn>
                    Loading ...{" "}
                    <Spinner
                      style={{ width: "1.2rem", height: "1.2rem" }}
                      color="primary"
                    />
                  </LoadingBtn>
                ) : (
                  <p style={{ textAlign: "center" }}>No More Data</p>
                )
              }
            >
              <ul
                className={
                  view === "grid" ? "groups-list small-list grid" : "groups-list"
                }
              >
                {result &&
                  result.map((group) => {
                    return (
                      <AllCommunityCard
                        key={group.id}
                        group={group}
                        user={user}
                        parentCallback={joinGroup}
                        parentGroupData={groupData}
                        parentDelete={memberDelete}
                        parentJoinRequest={joinRequest}
                      />
                    );
                  })}
              </ul>
            </InfinitScroll>
          </div>
        ) : null}
      </GroupContainer>
      {loadData && length == 1 ? (
        <p className="text-right">Viewing {length} group</p>
      ) : length > 1 ? (
        <p className="text-right">
          Viewing 1-{length} of {count} groups
        </p>
      ) : null}
    </Col>
  );
}

export default CommunityList;
