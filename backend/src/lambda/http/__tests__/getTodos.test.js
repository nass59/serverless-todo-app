import { handler } from '../getTodos'
import { getUserId } from '../../utils'
import { getTodos } from '../../../businessLogic/todos'

jest.mock('../../utils')
jest.mock('../../../businessLogic/todos')

const event = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFrWkZNRFpETjBJNU5qZEVNME15TlVGQ00wTXlOa0l3UlRBMFJFRTNNVVZFUlVZME1VSXlNQSJ9.eyJpc3MiOiJodHRwczovL2Rldi1wY3l2OGNiNS5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTAzMTkyOTU1ODAwODYzMDA0ODIiLCJhdWQiOiJYdWxsekZTMjY3d002dmI0NnhEVUtlRTRwTzU2TGJpMyIsImlhdCI6MTYwNTE2MDYxOCwiZXhwIjoxNjA1MTk2NjE4LCJhdF9oYXNoIjoiblEwSFBZbWxNU2N2Z2ZZYUpQZi14USIsIm5vbmNlIjoiX2t5LmJJcHFvNTVVdFh2YkFaQTRFZnNCZXUtUExfMksifQ.ICCKqDi-TOe22orhWLy9Y2wycEZGfhHPJ66_mu368A_Bpqip5SgjzMM9xxtEGJY0YcBcqwu2rXiDzhzGk9LL37-sLIz4BJKrqm7CZTXjkMbPiL9qlJUEmaxXjQaO0zej7dk4kdpfT3kbnoBC1OhAqYjTlNsg6urtGAfDdRlbh_4Kg3cpVQoG-aPs-YLLCvDLD2U-RWPOsccRmetvHzsD2y0awotzn_lQuPrmRn9I5J9X6NZkMgxuOuWIzFSpWGv_l9LmpCkrVLQKoy2t-WoUjIL2_kXxnqOaBvqVaIzAx1CY_bnkR0shYB2F3F4fpwZGbow9yU03fV-F-qNnIRPqsQ'
  },
  pathParameters: {
    todoId: '1234567890'
  }
}

const items = [
  {
    todoId: '6e0270d8-4e4f-4735-8a91-390dadca0835',
    userId: 'google-oauth2|106675479304207067282',
    createdAt: '2020-11-12T14:49:27.138Z',
    done: false,
    attachmentUrl: null,
    name: 'todo 1',
    dueDate: '2019-06-11'
  },
  {
    todoId: '6e0270d8-4e4f-4735-8a91-390dadca0835',
    userId: 'google-oauth2|106675479304207067282',
    createdAt: '2020-11-12T14:49:27.138Z',
    done: false,
    attachmentUrl: null,
    name: 'todo 2',
    dueDate: '2019-06-11'
  }
]

describe('Get Todos', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    getUserId.mockClear()
    getTodos.mockClear()
  })

  it('should return list of todo items', () => {
    getUserId.mockReturnValue('1234567890')
    getTodos.mockReturnValue(items)

    return handler(event).then((result) => {
      expect(result).toStrictEqual({
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
          items
        })
      })
    })
  })
})
