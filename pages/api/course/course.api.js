import axios from "axios";

const courseApi = process.env.courseUrl;
const courseImage = process.env.courseImage;
const authorDetail = process.env.authorDetail;

export const getCourses = (user, data) => {
  let paramData = {
    method: "GET",
    params: data,
  };

  if (user) {
    paramData.headers = {
      Authorization: `Bearer ${user?.token}`,
    };
  }

  return axios(`${courseApi}/ldlms/v1/sfwd-courses`, paramData);
};
export const getCourseContent = (user, id) => {
  let paramData = {
    method: "GET",
  };

  if (user) {
    paramData.headers = {
      Authorization: `Bearer ${user?.token}`,
    };
  }

  return axios(`${courseApi}/portl/v1/learndash/sfwd-lessons/${id}`, paramData);
};
export const getParticipantsList = (user, id) =>
  axios(`${courseApi}/portl/v1/learndash/sfwd-courses/${id}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const courseStatusUpdate = (user, id) =>
  axios(`${courseApi}/portl/v1/learndash/sfwd-lessons/completed/${id}`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const getCourseAuthor = (user, id) =>
  axios(`${courseApi}/portl/v1/learndash/sfwd-courses/${id}/author`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const getCourseLessions = (user, id) =>
  axios(`${courseApi}/portl/v1/learndash/sfwd-lessons/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const getLessions = (user, id) =>
  axios(`${courseApi}/ldlms/v1/sfwd-lessons/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const getCourseImage = (user, id) =>
  axios(`${courseImage}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const getAuthorDetail = (user, id) =>
  axios(`${courseApi}/portl/v1/learndash/sfwd-courses/${id}/author`, {
    method: "GET",
  });

export const getCourseDetail = (user, id) => {
  let paramData = {
    method: "GET",
  };

  if (user) {
    paramData.headers = {
      Authorization: `Bearer ${user?.token}`,
    };
  }

  return axios(`${courseApi}/ldlms/v1/sfwd-courses/${id}`, paramData);
};

export const getCourseProduct = (user, id) => {
  let paramData = {
    method: "GET",
  };

  if (user) {
    paramData.headers = {
      Authorization: `Bearer ${user?.token}`,
    };
  }

  return axios(
    `${courseApi}/portl/v1/learndash/sfwd-courses/${id}/product`,
    paramData
  );
};

export const getMyCourses = (user, data, id) =>
  axios(`${courseApi}/ldlms/v2/users/${id}/courses`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    params: data,
  });
