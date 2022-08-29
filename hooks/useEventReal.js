import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { EventsContext } from "@context/EventsContext";
import { FilterContext } from "@context/FilterContext";
import { GeoPositionContext } from "@context/GeoPositionContext";

const useEventReal = (url, body) => {
  const [data, setData] = useState(null);

  const [error, setError] = useState(false);

  const { realOnline, setRealOnline } = useContext(EventsContext);
  /**
   * TODO: check why GeoPositionContext does not work
   */
  const { position } = useContext(GeoPositionContext);

  const { startRealEvent } = useContext(FilterContext);
  const cleanRequest = "clean request";

  const getData = async (url, body, position, cancelToken, unmounted) => {
    if (!position) return;

    body.location = position;

    try {
      if (!unmounted) {
        const { data: requestData } = await Axios.post(url, body, {
          cancelToken: cancelToken.token,
        });

        setData(requestData);

        setError(false);
      }
    } catch (error) {
      if (!unmounted) {
        if (Axios.isCancel(error)) {
        } else {
          setData(null);
          setError(true);
        }
      }
    }
  };

  useEffect(() => {
    setData(null);

    if (!data) return;

    const source = Axios.CancelToken.source();

    let unmounted = false;

    getData(url, body, position, source, unmounted);

    return () => {
      unmounted = true;
      source.cancel(cleanRequest);
    };
  }, [startRealEvent]);

  useEffect(() => {
    const source = Axios.CancelToken.source();

    if (realOnline[body.categories] !== undefined) {
      setData(realOnline[body.categories]);
      return;
    }

    let unmounted = false;

    getData(url, body, position, source, unmounted);

    return () => {
      unmounted = true;
      source.cancel(cleanRequest);
    };
  }, [position]);

  useEffect(() => {
    const saveEvents = () => {
      if (!data || body.categories === undefined) return;
      setRealOnline({
        ...realOnline,
        [body.categories]: data,
      });
    };

    saveEvents();
  }, [data]);

  useEffect(() => {
    if (!data) return;

    setData(null);

    const source = Axios.CancelToken.source();

    let unmounted = false;

    getData(url, body, position, source, unmounted);

    return () => {
      unmounted = true;
      source.cancel(cleanRequest);
    };
  }, [position]);

  return {
    data,
    error,
  };
};

export default useEventReal;
