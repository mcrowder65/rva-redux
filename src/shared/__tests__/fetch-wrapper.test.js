import fetchMock from "fetch-mock";
import shortId from "shortid";

import {
  fetchDelete,
  fetchGet,
  fetchPost,
  fetchPut
} from "shared/fetch-wrapper";
import { HTTP_RESPONSE_TYPES } from "shared/constants";

const restore = () => fetchMock.restore();
describe("edge cases", () => {
  afterEach(restore);

  test("When not giving back a response type, it should throw!", async () => {
    expect.assertions(1);
    try {
      const url = shortId.generate();
      fetchMock.put(url, {
        body: {},
        headers: { "content-type": undefined },
        sendAsJson: false
      });
      await fetchPut({ url });
    } catch (e) {
      expect(e.message).toEqual("Response type was not defined");
    }
  });
  test(`When giving a random content-type, (unique id),
    it should throw since it's not handled`, async () => {
    expect.assertions(1);
    try {
      const url = shortId.generate();
      fetchMock.get(url, {
        body: {},
        headers: { "content-type": shortId.generate() }
      });
      await fetchGet({ url });
    } catch (e) {
      expect(e.message).toEqual("Response type not supported yet!");
    }
  });
  test(`When giving back a 500 response code, it should throw`, async () => {
    expect.assertions(1);
    try {
      const url = shortId.generate();
      fetchMock.post(url, { body: {}, status: 500 });
      await fetchPost({ url });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
describe("All the different response types", () => {
  afterEach(restore);
  test(`content-type: ${
    HTTP_RESPONSE_TYPES.JSON
  } should resolve to a json`, async () => {
    const body = { hello: "I am a string in a json" };
    const url = shortId.generate();
    fetchMock.post(url, {
      body,
      headers: { "content-type": HTTP_RESPONSE_TYPES.JSON }
    });
    const result = await fetchPost({ url });
    expect(result).toEqual(body);
  });
  test(`content-type ${
    HTTP_RESPONSE_TYPES.HTML
  } should resolve to a string`, async () => {
    const body = "I am a string ";
    const url = shortId.generate();
    fetchMock.put(url, {
      body,
      headers: { "content-type": HTTP_RESPONSE_TYPES.HTML }
    });
    const result = await fetchPut({ url });
    expect(result).toEqual(body);
  });
  test(`content-type ${
    HTTP_RESPONSE_TYPES.PLAIN
  } should resolve to a string`, async () => {
    const body = "I am a string ";
    const url = shortId.generate();
    fetchMock.delete(url, {
      body,
      headers: { "content-type": HTTP_RESPONSE_TYPES.PLAIN }
    });
    const result = await fetchDelete({ url });
    expect(result).toEqual(body);
  });
});
