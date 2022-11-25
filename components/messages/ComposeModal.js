import React, { useContext, useState, useEffect } from 'react';

// import {useNavigate} from "react-router-dom";
import {
  AppBar,
  Button,
  Dialog,
  Toolbar,
  Typography,
  Box,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch, faClock } from '@fortawesome/free-solid-svg-icons';
import { Close } from '@material-ui/icons';
import {
  Input, Form, FormGroup, Label,
} from 'reactstrap';
import { UserContext } from '../../context/UserContext';
import { searchField } from './composemodal.style';
import MessagesCard from './MessagesCard';
import { getConnections, SearchConnections } from '../../pages/api/message.api';

export function ComposeModal({ isOpen, handleClose, getId }) {
  const [searchText, setSearchText] = React.useState('');
  const [data, setData] = useState([]);
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const id = user?.id;
    setLoader(true);
    getConnections(user, id)
      .then((res) => {
        // window.alert(JSON.stringify(res?.data[0]))
        setData(res?.data);
        setLoader(false);
      })
      .catch(() => {
        console.log('error');
      });
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    const id = user?.id;
    if (e.keyCode === 13) {
      SearchConnections(user, id, value)
        .then((res) => {
          setData(res?.data);
        })
        .catch(() => {
          console.log('error');
        });
    }
  };

  return (
    <div className="AddToMealPlan" style={{ width: '90%' }}>
      <Dialog
        fullScreen
        maxWidth="sm"
        open={isOpen}
        onClose={handleClose}
        sx={{ justifyContent: 'center', textAlign: 'center' }}
      >
        <div className="swapRecipePage compose">
          <AppBar
            sx={{ position: 'relative', marginBottom: 2 }}
            color="transparent"
            elevation={0}
          >
            <Toolbar>
              <div>
                <button onClick={handleClose} className='btn-transparent'>
                  <Close />
                </button>
              </div>
            </Toolbar>
          </AppBar>
          <Typography variant="h4" className="header-text">
            <span className="desk-text">SELECT FROM CONNECTIONS</span>
            <span className="xs-text">NEW MESSAGE</span>
          </Typography>
          <Box alignSelf="center">
            <div className="formBox">
              <Form>
                <FormGroup>
                  <Label for="feedSearch" className="sr-only">
                    Search
                  </Label>
                  <div className="form-group">
                    <div className="input-group input-group-lg">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <img src="/img/icons/search.svg" alt="search" />
                        </span>
                      </div>
                      {/* search bar, search icon added here */}
                      <Input
                        css={searchField}
                        type="search"
                        name="search"
                        id="feedSearch"
                        placeholder="Search"
                        onKeyDown={(e) => handleSearch(e)}
                        onChange={(e) => handleSearch(e)}
                      />
                    </div>
                  </div>
                </FormGroup>
              </Form>
            </div>
            {/* showing connections */}

            {/* {loader && <div className='full-page-loader'>
              <CenterLoader />
            </div>}   */}

            <div className="userScroll">
              {!loader && data?.map((item) => (
                <MessagesCard
                  key={item.id}
                  data={item}
                  getId={getId}
                  handleClose={handleClose}
                />
              ))}
            </div>
          </Box>
        </div>
      </Dialog>
    </div>
  );
}

export default ComposeModal;
