import React, { useContext, useEffect, useState } from "react";
import SaveIcon from "@icons/SaveIcon";
import { UserContext } from "@context/UserContext";
import axios from "axios";

const url = `${process.env.apiV2}/saved/`;

function SaveButton({classNameIcons="", value, type , context='detail'}) {
  const { user } = useContext(UserContext);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const save = async () => {
    if (!user) return;
    if (isSaved) {
      await deletedEvent();
      return;
    }
    await savedEvent();
  };

  const deletedEvent = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.delete(
        `${url}?type=${type}&value=${value}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setIsSaved(false);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const savedEvent = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${url}`,
        {
          value,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setIsSaved(true);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const checkSaved = async () => {
    try {
      const { data } = await axios.get(`${url}${value}?type=${type}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (data?.message === "saved") {
        setIsSaved(true);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (!user) return;
    checkSaved().catch((e) => console.log(e));
  }, [user]);

  return (
    <button onClick={save} className={`btn btn-detail-action ${classNameIcons} ${context !== 'detail' ? 'btn-feed' : ''}`}>
      {context === 'detail' && <span className="d-none d-md-flex color-font">{isSaved ? "Saved" : "Save"}</span>}
      <span className="btn-detail-icon color-font">
        {!isLoading && <SaveIcon />}
        {isLoading && (
          <div class="spinner-border spinner-border-sm" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </span>
      {context !== 'detail' && <span className="d-inline ml-1 text-font">{isSaved ? "Saved" : "Save"}</span>}
    </button>
  );
}

export default SaveButton;
