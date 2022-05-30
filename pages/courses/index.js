import React, { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { UserContext } from "../../context/UserContext";
import Layout from "../../components/layout/Layout";
import CourseCard from "../../components/course/CourseCard";
import {
  getCourses,
  getAuthorDetail,
  getMyCourses,
} from "../api/course/course.api";
import { Spinner, Button, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBorderAll,
  faClock,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { LoaderContainer } from "../../components/livefeed/livefeed.style";
import useLocalStorage from "../../hooks/useLocalStorage";

function CourseWrapper() {
  const { user } = useContext(UserContext);
  const [courses, setCourses] = useLocalStorage('courses',[])
  const [status, setStatus] = useState("all");
  const [loader, setLoader] = useState(true);
  const [result, setResult] = useState([]);
  //const [authorName,setAuthorName] = useState([])
  const [view, setView] = useState("grid");
  const [count, setCount] = useState();
  const [myCount, setMyCount] = useState();
  //const [authorList,setAuthorList] = useState()
  const [searchText, setSearchText] = useState("");
  const totalProduct = "x-wp-total";
  const formData = {
    page: 1,
    per_page: 20,
    ...(searchText !== "" && { search: searchText }),
  };

  useEffect(() => {
    if (status === "all") {
      getAllCourseList();
    } else getMyCourseList();
  }, [status]);

  function getAllCourseList() {
    setResult(courses);
    setLoader(true);
    getCourses(user, formData)
      .then((res) => {
        let courses = res.data
        setLoader(false);
        setResult(courses);
        setCourses(courses)
        var total =
          res.headers[totalProduct] != undefined
            ? res.headers[totalProduct]
            : null;
        setCount(total);
      })
      .catch((err) => console.log(err));
  }

  function getMyCourseList() {
    setResult([]);
    setLoader(true);
    getMyCourses(user, formData, user?.id)
      .then((res) => {
        setLoader(false);
        setResult(res.data);
        setMyCount(res.data.length);
      })
      .catch((err) => console.log(err));
  }

  const handleSearch = (e) => {

    if (e.keyCode === 13) {
      e.preventDefault();
      setResult([]);
      setLoader(true);
      status === "all" ? getAllCourseList() : getMyCourseList()
    } else {
      const search = e.target ? e.target.value : e;
      setSearchText(search);
      if (search === "") {
        document.getElementById('searchInput').addEventListener('input', (e) => {
          setSearchText(e.currentTarget.value)
          if (e.currentTarget.value === "") {
            setResult([]);
            setLoader(true);
            status === "all" ? getAllCourseList() : getMyCourseList()

          }
        })
      }

    }

  };

  return (
    <Layout>
      <Head>
        <title>WeShare | Courses</title>
      </Head>
      <div className="courses-wrapper bg-black bd-radius px-3 py-2">
        <div className="d-flex justify-content-between">
          <h1 className="d-none d-md-block">Course</h1>
          <div className="search-tag align-items-center">
            <label className="w-100 position-relative">
              <span className="icon-tag">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <Input
                id="searchInput"
                type="search"
                placeholder="Search Courses..."
                value={searchText}
                onChange={handleSearch}
                onKeyDown={handleSearch}
              />
            </label>
          </div>
        </div>
        <div className="SubNav">
          <ul>
            <li
              className={status === 'all' ? 'active' : ''}
              onClick={() => setStatus('all')}
            >
              <Button type="button">
                All Courses{' '}
                <span className="badge badge-pill badge-primary ml-2">
                  {count > 0 && count}
                </span>
              </Button>
            </li>

            {user && (
              <li
                className={status === 'my' ? 'active' : ''}
                onClick={() => setStatus('my')}
              >
                <Button type="button">
                  My Courses{' '}
                  <span className="badge badge-pill badge-primary ml-2">
                    {myCount > 0 && myCount}
                  </span>
                </Button>
              </li>
            )}
          </ul>
        </div>
        <div className="filter-section">
          <select className="d-none d-md-block">
            <option>Alphabetical</option>
            <option>Newly Created</option>
          </select>
          <select>
            <option>All Categories</option>
            <option>Uncategorized</option>
          </select>

          <Input type="select">
            <option value="">All Instructors</option>
            {/* {authorName.map((d)=>
            <option value={d.id}>{d.name}</option>
            )}  */}
          </Input>
          <div className="grid-filters d-none d-md-flex">
            <a onClick={() => setView('grid')} className="grid-view">
              <FontAwesomeIcon icon={faBorderAll} />
              <span className="tooltip-panel">
                Grid View<em></em>
              </span>
            </a>
            <a onClick={() => setView('list')} className="list-view">
              <FontAwesomeIcon icon={faBars} />
              <span className="tooltip-panel">
                List View<em></em>
              </span>
            </a>
          </div>
        </div>
        {loader && (
          <Spinner
            style={{ width: '1.2rem', height: '1.2rem' }}
            color="primary"
          />
        )}
        {!loader && result.length == 0 && (
          <p css={LoaderContainer}>
            <span>
              <FontAwesomeIcon icon={faClock} />
            </span>
            Sorry, no courses were found.{' '}
          </p>
        )}
        <div className="course-card-ui">
          <ul className="row">
            {!loader &&
              result &&
              result?.map((course, index) => {
                return (
                    <CourseCard
                      key={course.id}
                      index={index}
                      course={course}
                      id={course.featured_media}
                      courseId={course.id}
                      user={user}
                      authorId={course.author}
                      view={view}
                      status={status}
                      result={result}
                    />
                )
              })}
          </ul>
        </div>
      </div>
    </Layout>
  )
}
export default CourseWrapper;
