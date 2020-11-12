import { handler } from '../generateUploadUrl'
import { getUserId } from '../../utils'
import {
  generateUploadUrl,
  updateAttachmentUrl
} from '../../../businessLogic/attachments'

jest.mock('../../utils')
jest.mock('../../../businessLogic/attachments')

const event = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFrWkZNRFpETjBJNU5qZEVNME15TlVGQ00wTXlOa0l3UlRBMFJFRTNNVVZFUlVZME1VSXlNQSJ9.eyJpc3MiOiJodHRwczovL2Rldi1wY3l2OGNiNS5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTAzMTkyOTU1ODAwODYzMDA0ODIiLCJhdWQiOiJYdWxsekZTMjY3d002dmI0NnhEVUtlRTRwTzU2TGJpMyIsImlhdCI6MTYwNTE2MDYxOCwiZXhwIjoxNjA1MTk2NjE4LCJhdF9oYXNoIjoiblEwSFBZbWxNU2N2Z2ZZYUpQZi14USIsIm5vbmNlIjoiX2t5LmJJcHFvNTVVdFh2YkFaQTRFZnNCZXUtUExfMksifQ.ICCKqDi-TOe22orhWLy9Y2wycEZGfhHPJ66_mu368A_Bpqip5SgjzMM9xxtEGJY0YcBcqwu2rXiDzhzGk9LL37-sLIz4BJKrqm7CZTXjkMbPiL9qlJUEmaxXjQaO0zej7dk4kdpfT3kbnoBC1OhAqYjTlNsg6urtGAfDdRlbh_4Kg3cpVQoG-aPs-YLLCvDLD2U-RWPOsccRmetvHzsD2y0awotzn_lQuPrmRn9I5J9X6NZkMgxuOuWIzFSpWGv_l9LmpCkrVLQKoy2t-WoUjIL2_kXxnqOaBvqVaIzAx1CY_bnkR0shYB2F3F4fpwZGbow9yU03fV-F-qNnIRPqsQ'
  },
  pathParameters: {
    todoId: '1234567890'
  }
}

describe('Generate Upload URL', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    getUserId.mockClear()
    generateUploadUrl.mockClear()
    updateAttachmentUrl.mockClear()
  })

  it('should generate Upload URL for a todo item', () => {
    const expectedData = 'https://attachment-url/item/1234567890'

    getUserId.mockReturnValue('1234567890')
    generateUploadUrl.mockReturnValue(expectedData)
    updateAttachmentUrl.mockReturnValue(null)

    return handler(event).then((result) => {
      expect(result).toStrictEqual({
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
          uploadUrl: expectedData
        })
      })
    })
  })
})
