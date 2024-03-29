import { ITaskViewModel } from 'src/view-model'
import { user2, user1 } from './users'

const data: ITaskViewModel[] = [
  {
      'id': '133fa065-55cf-41aa-8625-f7db5bc23b97',
      'createdAt': '2022-06-20T14:46:47.160871',
      'status': 'IN_PROGRESS',
      'order': 0,
      'authorUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
      'assignedToUserId': 'ce2d1e62-a324-4a8f-bc03-a9ee14f652b3',
      'requestId': 'b46b93b6-3d10-4f4d-ab37-8c88d3f28342',
      'assignedToUser': user2,
     'authorUser': user1,
    'request': {
      'id': 'b46b93b6-3d10-4f4d-ab37-8c88d3f28342',
      'requestTypeName': 'VACATION',
      'comment':'',
      'payload': {
        'dateTo': '2022/06/07',
        'isPayed': true,
        'dateFrom': '2022/05/31'
      },
      'createdAt': '2022-06-20T14:46:47.160871',
      'ownerUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
      'status': 'IN_PROGRESS'
    }
  },
  {
    'id': '234e1809-6477-4f80-8b7b-b1fa8747b68e',
    'createdAt': '2022-06-20T14:42:48.335879',
    'status': 'PENDING',
    'order': 1,
    'authorUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
    'assignedToUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
    'requestId': 'df81401b-68f8-4b10-8ed2-43de80f463f2',
    'assignedToUser': user1,
    'authorUser': user1,
    'request': {
      'id': 'df81401b-68f8-4b10-8ed2-43de80f463f2',
      'requestTypeName': 'VACATION',
      'payload': {
        'dateTo': '2022/06/07',
        'isPayed': true,
        'dateFrom': '2022/05/31'
      },
      'createdAt': '2022-06-20T14:42:48.335879',
      comment: '',
      'ownerUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
      'status': 'IN_PROGRESS'
    }
  },
  {
    'id': '482e7cbf-3b22-4bde-85c4-5973b5bd97ee',
    'createdAt': '2022-06-20T14:46:47.160871',
    'status': 'PENDING',
    'order': 1,
    'authorUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
    'assignedToUserId': user1.id,
    'requestId': 'b46b93b6-3d10-4f4d-ab37-8c88d3f28342',
    'assignedToUser': user1,
    'authorUser': user1,
    'request': {
      'id': 'b46b93b6-3d10-4f4d-ab37-8c88d3f28342',
      'requestTypeName': 'VACATION',
      'payload': {
        'dateTo': '2022/06/07',
        'isPayed': true,
        'dateFrom': '2022/05/31'
      },
      'createdAt': '2022-06-20T14:46:47.160871',
      comment: '',
      'ownerUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
      'status': 'IN_PROGRESS'
    }
  },
  {
    'id': '66afa750-ca6d-40e7-bddd-61f59ba580e1',
    'createdAt': '2022-06-20T14:40:18.85272',
    'status': 'PENDING',
    'order': 1,
    'authorUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
    'assignedToUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
    'requestId': 'd3c1d564-b55a-42ea-86cc-0b44446cf821',
    'assignedToUser': user1,
    'authorUser': user1,
    'request': {
      'id': 'd3c1d564-b55a-42ea-86cc-0b44446cf821',
      'requestTypeName': 'VACATION',
      'payload': {
        'dateTo': '2022/06/07',
        'isPayed': true,
        'dateFrom': '2022/05/31'
      },
      'createdAt': '2022-06-20T14:40:18.85272',
      comment: '',
      'ownerUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
      'status': 'IN_PROGRESS'
    }
  },
  {
    'id': '7c8de6db-59d2-4523-922c-c229ccff1495',
    'createdAt': '2022-06-20T14:42:48.335879',
    'status': 'IN_PROGRESS',
    'order': 0,
    'authorUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
    'assignedToUserId': 'ce2d1e62-a324-4a8f-bc03-a9ee14f652b3',
    'requestId': 'df81401b-68f8-4b10-8ed2-43de80f463f2',
    'assignedToUser': user2,
    'authorUser': user1,
    'request': {
      'id': 'df81401b-68f8-4b10-8ed2-43de80f463f2',
      'requestTypeName': 'VACATION',
      'payload': {
        'dateTo': '2022/06/07',
        'isPayed': true,
        'dateFrom': '2022/05/31'
      },
      'createdAt': '2022-06-20T14:42:48.335879',
      comment: '',
      'ownerUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
      'status': 'IN_PROGRESS'
    }
  },
  {
    'id': 'a701f625-a553-494e-a780-0280c6b82bd4',
    'createdAt': '2022-06-20T14:40:18.85272',
    'status': 'IN_PROGRESS',
    'order': 0,
    'authorUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
    'assignedToUserId': 'ce2d1e62-a324-4a8f-bc03-a9ee14f652b3',
    'requestId': 'd3c1d564-b55a-42ea-86cc-0b44446cf821',
    'assignedToUser': user2,
    'authorUser': user1,
    'request': {
      'id': 'd3c1d564-b55a-42ea-86cc-0b44446cf821',
      'requestTypeName': 'VACATION',
      'payload': {
        'dateTo': '2022/06/07',
        'isPayed': true,
        'dateFrom': '2022/05/31'
      },
      'createdAt': '2022-06-20T14:40:18.85272',
      comment: '',
      'ownerUserId': 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
      'status': 'IN_PROGRESS'
    }
  }
]

export default data