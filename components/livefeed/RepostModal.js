import React, { useContext, useState } from 'react'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import { UserContext } from '@context/UserContext'
import RepostContent from './RepostContent'
import { useFormik } from 'formik'
import InputDashForm from '@components/shared/form/InputDashForm'
import { css } from '@emotion/core'

const SpinnerSm = () => {
  return (
    <div className="spinner-border spinner-border-sm" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  )
}

function RepostModal({
  open,
  toggle,
  activity,
  photoArray,
  setPhotoArray,
  updateContent,
  handleDescription,
  groupData,
  likeAction,
  createRepost,
}) {
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const {
    user_avatar: { thumb = '/img/user.png' },
    content: { rendered = null },
    name = '',
    date,
    bp_videos,
  } = activity

  const form = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const act = {
          component: 'activity',
          content: values.message,
          type: 'new_blog_repost',
          secondary_item_id: activity.id,
        }

        await createRepost(act)
      } catch (error) {
      } finally {
        setLoading(false)
        toggle()
      }
    },
  })

  function moveImage(photoData) {
    setPhotoArray(photoArray.filter((item) => item.id !== photoData.id))
  }

  function getLink() {
    const content = rendered.replace('</p>', '')
    let urlRegex =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    return content.match(urlRegex) === null ? '' : content.match(urlRegex)[0]
  }

  return (
    <Modal size="xl" centered isOpen={open} toggle={toggle}>
      <ModalBody>
        <RepostContent
          activity={activity}
          photoArray={photoArray}
          updateContent={updateContent}
          handleDescription={handleDescription}
          groupData={groupData}
          likeAction={likeAction}
          name={name}
          date={date}
          bp_videos={bp_videos}
          user={user}
          thumb={thumb}
          moveImage={moveImage}
          getLink={getLink}
        />
      </ModalBody>

      <ModalFooter className="border-0 modal-footer-repost pt-0 px-2 px-md-4">
        <div className="flex-grow-1 modal-footer-input">
          <InputDashForm
            name={'message'}
            placeholder='Message...'
            type={'text'}
            value={form.values.message}
            error={form.errors.message}
            touched={form.touched.message}
            onChange={form.handleChange}
            autocomplete={'off'}
            customStyle={css`
              box-shadow: none;
              border: 1px solid var(--bg-font);
            `}
          />
        </div>
        <div className='mt-3 modal-footer-buttons d-flex justify-content-end'>
          <button
            onClick={toggle}
            className="btn btn-secondary b-radius-25 btn-modal-repost"
          >
            Cancel
          </button>
          <button
            onClick={() => form.submitForm()}
            className="btn btn-primary b-radius-25"
          >
            {loading ? <SpinnerSm /> : 'Post Activity'}
          </button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default RepostModal
