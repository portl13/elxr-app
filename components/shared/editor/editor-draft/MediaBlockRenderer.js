import ReactPlayer from 'react-player'

const Audio = (props) => {
  return <audio controls src={props.src} />
}

const Image = (props) => {
  return  <img className='m-auto d-block w-100' src={props.src} />
}

const Video = (props) => {
  return (
    <div className="ratio ratio-16x9 pointer">
      <ReactPlayer width={'100%'} height={'100%'} controls url={props.src} />
    </div>
  )
}

const Media = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0))
  const { src } = entity.getData()
  const type = entity.getType()



  let media
  if (type === 'audio') {
    media = <Audio src={src} />
  } else if (type === 'image') {
    media = <Image src={src} />
  } else if (type === 'video') {
    media = <Video src={src} />
  }

  return media
}

export function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    }
  }

  return null
}
