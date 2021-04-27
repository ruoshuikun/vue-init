import { Request_get, Request_post } from 'utils/request.js'

export const testMock = () => {
  return Request_post({
    url: '/devApi/getSms/',
  })
}
