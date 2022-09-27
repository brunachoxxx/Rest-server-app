import { response, request } from "express";

export const getUsers = (req = request, res = response) => {
  const { id } = req.query;
  res.json({
    msg: "Get Api - controller",
  });
};

export const putUsers = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "Put Api - controller",
    id,
  });
};

export const postUsers = (req, res = response) => {
  res.json({
    msg: "Post Api - controller",
  });
};

export const patchUsers = (req, res = response) => {
  res.json({
    msg: "Patch Api - controller",
  });
};

export const delUsers = (req, res = response) => {
  res.json({
    msg: "Delete Api - controller",
  });
};
