import { IRequestViewModel } from 'src/view-model'
import anton from './user-anton'

const data: IRequestViewModel[] = [
  {
    'id': 'b46b93b6-3d10-4f4d-ab37-8c88d3f28342',
    'createdAt': '2022-06-20T14:46:47.160871',
    'ownerUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
    'requestTypeName': 'VACATION',
    'status': 'IN_PROGRESS',
    comment: '',
    'ownerUser': anton,
    'payload': {
      'dateTo': '2022/06/07',
      'isPayed': true,
      'dateFrom': '2022/05/31'
    },
    'tasksList': [
      {
        'assignedToUserId': 'ce2d1e62-a324-4a8f-bc03-a9ee14f652b3',
        'authorUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
        'createdAt': '2022-06-20T14:46:47.160871',
        'id': '133fa065-55cf-41aa-8625-f7db5bc23b97',
        'order': 0,
        'requestId': 'b46b93b6-3d10-4f4d-ab37-8c88d3f28342',
        'status': 'IN_PROGRESS'
      },
      {
        'assignedToUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
        'authorUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
        'createdAt': '2022-06-20T14:46:47.160871',
        'id': '482e7cbf-3b22-4bde-85c4-5973b5bd97ee',
        'order': 1,
        'requestId': 'b46b93b6-3d10-4f4d-ab37-8c88d3f28342',
        'status': 'PENDING'
      }
    ]
  },
  {
    'ownerUser': anton,
    'createdAt': '2022-06-20T14:40:18.85272',
    'id': 'd3c1d564-b55a-42ea-86cc-0b44446cf821',
    'ownerUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
    comment: '',
    'payload': {
      'dateTo': '2022/06/07',
      'isPayed': true,
      'dateFrom': '2022/05/31'
    },
    'requestTypeName': 'VACATION',
    'status': 'IN_PROGRESS',
    'tasksList': [
      {
        'assignedToUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
        'authorUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
        'createdAt': '2022-06-20T14:40:18.85272',
        'id': '66afa750-ca6d-40e7-bddd-61f59ba580e1',
        'order': 1,
        'requestId': 'd3c1d564-b55a-42ea-86cc-0b44446cf821',
        'status': 'PENDING'
      },
      {
        'assignedToUserId': 'ce2d1e62-a324-4a8f-bc03-a9ee14f652b3',
        'authorUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
        'createdAt': '2022-06-20T14:40:18.85272',
        'id': 'a701f625-a553-494e-a780-0280c6b82bd4',
        'order': 0,
        'requestId': 'd3c1d564-b55a-42ea-86cc-0b44446cf821',
        'status': 'IN_PROGRESS'
      }
    ]
  },
  {
    'ownerUser':anton,
    'createdAt': '2022-06-20T14:42:48.335879',
    'id': 'df81401b-68f8-4b10-8ed2-43de80f463f2',
    comment: '',
    'ownerUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
    'payload': {
      'dateTo': '2022/06/07',
      'isPayed': true,
      'dateFrom': '2022/05/31'
    },
    'requestTypeName': 'VACATION',
    'status': 'IN_PROGRESS',
    'tasksList': [
      {
        'assignedToUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
        'authorUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
        'createdAt': '2022-06-20T14:42:48.335879',
        'id': '234e1809-6477-4f80-8b7b-b1fa8747b68e',
        'order': 1,
        'requestId': 'df81401b-68f8-4b10-8ed2-43de80f463f2',
        'status': 'PENDING'
      },
      {
        'assignedToUserId': 'ce2d1e62-a324-4a8f-bc03-a9ee14f652b3',
        'authorUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
        'createdAt': '2022-06-20T14:42:48.335879',
        'id': '7c8de6db-59d2-4523-922c-c229ccff1495',
        'order': 0,
        'requestId': 'df81401b-68f8-4b10-8ed2-43de80f463f2',
        'status': 'IN_PROGRESS'
      }
    ]
  }
]

export default data