import axios from "axios";

const parseArgs = (args) => {
  return Array.isArray(args) ? args : [args];
};

const createFetcher = (instance = axios) => {
  return {
    async get(args) {
      return (await instance.get(...parseArgs(args))).data;
    },
  };
};

export default createFetcher;
