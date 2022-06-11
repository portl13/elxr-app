import { LIVEFEED_NAV } from '@utils/constant'
import React from 'react'
import { searchField, SubNav } from '@components/livefeed/livefeed.style'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'

const getSubNav = ({
  scope,
  handleUpdateData,
  handleSearchFeed,
  searchText,
}) => {
  return (
    <SubNav>
      <ul className="d-none d-md-flex">
        {LIVEFEED_NAV.map((ele) => (
          <li key={ele.value} className={scope === ele.value ? 'active' : ''}>
            <Button onClick={() => handleUpdateData(ele.value)}>
              {ele.name}
            </Button>
          </li>
        ))}
      </ul>
      <Form>
        <FormGroup>
          <Label for="feedSearch" className="sr-only">
            Search
          </Label>
          <Input
            css={searchField}
            type="search"
            name="search"
            id="feedSearch"
            placeholder="Search Feed…"
            onChange={handleSearchFeed}
            onKeyDown={handleSearchFeed}
            value={searchText}
          />
        </FormGroup>
      </Form>
    </SubNav>
  )
}

export default getSubNav
