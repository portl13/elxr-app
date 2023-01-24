import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faGripHorizontal,
} from "@fortawesome/free-solid-svg-icons";
import { BuilderStyle } from "@components/dashboard/courses/builder/Builder.style";
import EditIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";

const SongLists = React.memo(function SongLists({
  songs,
  editSong,
  removeSong,
  thumbnail,
}) {
  return songs.map((song, index) => (
    <Draggable
      key={String(song.id)}
      isDragDisabled={false}
      draggableId={String(song.id)}
      index={index}
    >
      {(provided) => (
        <>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`lesson-item d-flex pr-0`}
          >
            <div className="builder-inner-container">
              <div className="d-flex flex-column move-actions align-items-center">
                <button className="move-actions-up none-button d-flex p-0 align-items-center">
                  <FontAwesomeIcon icon={faChevronUp} />
                </button>
                <FontAwesomeIcon
                  className="d-block move-actions-grip"
                  icon={faGripHorizontal}
                />
                <button className="move-actions-down none-button d-flex p-0 align-items-center">
                  <FontAwesomeIcon icon={faChevronDown} />
                </button>
              </div>
              {thumbnail ? (
                <div className={"mr-4"} style={{ width: 70 }}>
                  <div
                    className={"bg-cover ratio ratio-16x9"}
                    style={{ backgroundImage: `url(${song.thumbnail})` }}
                  ></div>
                </div>
              ) : null}
              <button className="section-edit none-button no-pointer p-0 d-flex">
                <h4 className="mb-0 d-flex align-items-center">{song.title}</h4>
              </button>
              <span className="d-flex button-container">
                <span
                  onClick={() => editSong(song.id)}
                  className="none-button  b-remove pointer d-flex mr-2"
                >
                  <EditIcon />
                </span>
                <span
                  onClick={() => removeSong(song.id)}
                  className="none-button  b-remove pointer"
                >
                  <DeleteIcon />
                </span>
              </span>
            </div>
          </div>
        </>
      )}
    </Draggable>
  ));
});

function SongBuilder({
  songs,
  setSongs,
  setEditSong,
  setOpen,
  thumbnail = false,
}) {
  console.log({ songs });
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const moveUp = (index) => {
    const newSongs = [...songs];
    const [removed] = newSongs.splice(index, 1);
    newSongs.splice(index - 1, 0, removed);
    setSongs(newSongs);
  };
  // move down one lesson
  const moveDown = (index) => {
    const newSongs = [...songs];
    const [removed] = newSongs.splice(index, 1);
    newSongs.splice(index + 1, 0, removed);
    setSongs(newSongs);
  };

  const removeSong = (id) => {
    const newSongs = songs.filter((song) => song.id !== id);
    setSongs(newSongs);
  };

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newSongs = reorder(
      songs,
      result.source.index,
      result.destination.index
    );

    setSongs(newSongs);
  }

  function editSong(id) {
    setEditSong(id);
    setOpen(true);
  }

  return (
    <div className="mt-5 builder-container" css={BuilderStyle}>
      <DragDropContext className="builder-inner w-100" onDragEnd={onDragEnd}>
        <Droppable
          isDropDisabled={songs.length === 1}
          className={"w-100"}
          droppableId="list"
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <SongLists
                removeSong={removeSong}
                moveUp={moveUp}
                moveDown={moveDown}
                songs={songs}
                editSong={editSong}
                thumbnail={thumbnail}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default SongBuilder;
