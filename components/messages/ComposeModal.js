import React, { useContext, useState, useEffect } from "react"

// import {useNavigate} from "react-router-dom";
import {
  AppBar,
  Button,
  Dialog,
  Toolbar,
  Typography,
  Box,
} from "@material-ui/core"

import { Close } from "@material-ui/icons"
import { Input, Form, FormGroup, Label } from "reactstrap"
import { UserContext } from "../../context/UserContext"
import { searchField } from "./composemodal.style"
import MessagesCard from "./MessagesCard"

import useDebounce from "@hooks/useDebounce"
import useSWR from "swr"
import { genericFetch } from "@request/dashboard"
import SpinnerLoading from "@components/shared/loader/SpinnerLoading"

const url = process.env.bossApi + "/members?scope=personal"

export function ComposeModal({ isOpen, handleClose, getId }) {
  const { user } = useContext(UserContext)
  const token = user?.token

  const [search, setSearch] = useState("")
  const debounceTerm = useDebounce(search, 500)

  const {
    data,
    error,
    isLoading: loader,
  } = useSWR(
    token
      ? [
          `${url}&type=active&exclude=${user?.id}&per_page=20&search=${debounceTerm}`,
          token,
        ]
      : null,
    genericFetch
  )

  return (
    <div className="AddToMealPlan" style={{ width: "90%" }}>
      <Dialog
        fullScreen
        maxWidth="sm"
        open={isOpen}
        onClose={handleClose}
        sx={{ justifyContent: "center", textAlign: "center" }}
      >
        <div className="swapRecipePage compose">
          <AppBar
            color="transparent"
            elevation={0}
            className="align-items-end"
          >
            <Toolbar>
              <div>
                <button onClick={handleClose} className="btn-transparent">
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
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>
                </FormGroup>
              </Form>
            </div>
            {/* showing connections */}

            {loader && <SpinnerLoading />}

            <div className="userScroll">
              {!loader &&
                data?.map((item) => (
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
  )
}

export default ComposeModal
