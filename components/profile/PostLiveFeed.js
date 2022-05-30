import React from 'react';
import Router from 'next/router';
import { Input, Form, FormGroup, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFont, faCamera, faSmile, faVideo } from '@fortawesome/free-solid-svg-icons';

import {
  SubNav,
  CreateFeedAvatar,
  CreateFeedTextarea
} from '../livefeed/livefeed.style';
import {
  DropZoneStyle,
  thumbsContainer
} from '../profile-edit/profile-edit.style';
import { getProfileRoute } from '../../utils/constant';

const PostLiveFeed = ({
  user,
  formError,
  form,
  setArea,
  handlerChange,
  getRootProps,
  getInputProps,
  file,
  progress,
  sendFiles,
  image,
  handlerSubmit,
  onCancelFeed,
  showImage,
  area,
  placeholderText,
  thumbs,
  style,
  setProfile,
  isLiveFeed,
  setselectGroup
}) => {
  const handleRedirect = () => {
    Router.push(getProfileRoute(user.name, user.id, 'profile'));
  };

  const handleFocusChange = () => {
    setArea(true);
    if (isLiveFeed) {
      setProfile('profile');
      setselectGroup({});
    }
  };
  return (
    <div className='d-flex flex-column flex-fill'>
      <Row className='mt-4'>
        <Col sm='12'>
          {user && (
            <a
              href='javascript:void(0);'
              onClick={handleRedirect}
              css={CreateFeedAvatar}
            >
              <img
                className='avatar'
                src={user?.avatar_urls?.thumb}
                alt={`avatar ${user.displayName}`}
              />
              <span>{user.displayName}</span>
            </a>
          )}
        </Col>
      </Row>
      <Form>
        <FormGroup>
          <CreateFeedTextarea>
            <Input
              className={`form-control ${formError ? 'is-invalid' : ''}`}
              type='textarea'
              name='content'
              onFocus={() => handleFocusChange()}
              onChange={(e) => handlerChange(e)}
              value={form.content}
              placeholder={placeholderText}
              id='content'
            />
            {showImage ? (
              <div className='upload-image-conatiner'>
                <section css={DropZoneStyle} className='container'>
                  <div {...getRootProps({ style, className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <input
                      id='browse-button'
                      type='button'
                      value='Select or Drop images here to upload'
                      className='btn btn-default'
                    ></input>
                  </div>
                  <aside style={thumbsContainer}>{thumbs}</aside>
                  {file && progress !== 100 ? (
                    <Button onClick={() => sendFiles()}>Upload</Button>
                  ) : null}
                </section>
              </div>
            ) : null}
            <div className='post-update-toolbar'>
              <div className='post-element-panel'>
                <FontAwesomeIcon icon={faFont} />
                <div className='tooltip-panel'>
                  Show Formatting <em></em>
                </div>
              </div>
              <div className='post-element-panel'>
                <FontAwesomeIcon icon={faCamera} />
                <div className='tooltip-panel'>
                  Attach a photo <em></em>
                </div>
              </div>
              <div className='post-element-panel'>
                <FontAwesomeIcon icon={faVideo} />
                <div className='tooltip-panel'>
                  Attach a video <em></em>
                </div>
              </div>
              <div className='post-element-panel'>
                <FontAwesomeIcon icon={faSmile} />
                <div className='tooltip-panel'>
                  Insert an emoji <em></em>
                </div>
              </div>
            </div>
            <div className='invalid-feedback'>
              Content is <b>Required</b>
            </div>
          </CreateFeedTextarea>
        </FormGroup>
      </Form>
      {area ? (
        <SubNav className='mt-2'>
          <ul className='pb-2'>
            <li className='w-auto px-3'>
              <Input
                id='privacy'
                type='select'
                name='privacy'
                onChange={(e) => handlerChange(e)}
                value={form.privacy}
              >
                <option value='public'>Public</option>
                <option value='loggedin'>All Members</option>
                <option value='connections'>My Connections</option>
                <option value='onlyme'>Only Me</option>
              </Input>
            </li>
          </ul>
          <Button
            className='btn btn-link ml-auto'
            onClick={(e) => onCancelFeed(e)}
          >
            Cancel
          </Button>
          <Button className='btn btn-primary' onClick={(e) => handlerSubmit(e)}>
            Post Activity
          </Button>
        </SubNav>
      ) : null}
    </div>
  );
};

export default PostLiveFeed;