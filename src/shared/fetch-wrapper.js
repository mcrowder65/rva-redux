import "isomorphic-fetch";
import { HTTP_RESPONSE_TYPES } from "./constants";

const resolveResponse = (response, responseType) => {
  if (responseType.indexOf(HTTP_RESPONSE_TYPES.JSON) !== -1) {
    return response.json();
  } else if (responseType.indexOf(HTTP_RESPONSE_TYPES.HTML) !== -1) {
    return response.text();
  } else if (responseType.indexOf(HTTP_RESPONSE_TYPES.PLAIN) !== -1) {
    return response.text();
  } else {
    throw Error("Response type not supported yet!");
  }
};

const initialHeaders = { "Content-Type": HTTP_RESPONSE_TYPES.JSON, Accept: HTTP_RESPONSE_TYPES.JSON };

const fetchWrapper = async ({
  url,
  method,
  body,
  headers,
}) => {
  // do this here to get Content-Type to not be overridden if you didn't want to.
  const actualHeaders = { ...initialHeaders, ...headers };

  const response = await fetch(url, {
    method,
    headers: actualHeaders,
    body
  });
  const responseType = response.headers.get("content-type");
  if (!responseType) {
    throw Error("Response type was not defined");
  }
  const resolvedResponse = await resolveResponse(response, responseType);
  if (!response.ok) {
    throw Error(JSON.stringify(resolvedResponse));
  }
  return resolvedResponse;
};


export const fetchGet = ({ url, headers }) => {
  return fetchWrapper({ url, method: "GET", headers });
};

export const fetchPost = ({ url, body, headers }) => {
  return fetchWrapper({ url, method: "POST", body, headers });
};

export const fetchPut = ({ url, body, headers }) => {
  return fetchWrapper({ url, method: "PUT", body, headers });
};

export const fetchDelete = ({ url, body, headers }) => {
  return fetchWrapper({ url, method: "DELETE", body, headers });
};
