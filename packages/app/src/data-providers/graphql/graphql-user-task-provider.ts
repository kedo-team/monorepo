// // import { useQuery } from '@vue/apollo-composable'
// import allTask from './queries/Task.all.graphql'
// import ToMeTasksList from './queries/Task.toMe.graphql'
// import FromMeTasksList from './queries/Task.fromMe.graphql'
// import type { DocumentNode } from 'graphql'




// const user = useUser()

// const { result, loading, error } = useQuery(
//                                     () => { return getQuery(toggleFilter) },
//                                     { userId: user.id }
//                                    )

// const {result:  toMeResult,
//        loading: toMeLoading,
//        error:   toMeError} = useQuery(()=> getQuery(toggleFilter)),
//           { assignedToUserId: user.id},
//                                                       ()=>({
//                                                         enabled: toMeQueryEnabled.value
//                                                       }))



// watch(toggleFilter, async(newVal) => {
//   switch(newVal) {
//     case 'all': break;
//     case 'toMe': updateToMe(); break;
//     case 'fromMe': break;
//   }
// })

// function getQuery(filter: any): DocumentNode {
//   switch(filter.value) {
//     case 'all': return allTask;
//     case 'toMe': return ToMeTasksList;
//     case 'fromMe': return FromMeTasksList;
//     default: return allTask;
//   }
// }

// function updateTableAll() {
//   return useQuery(allTask, null, {fetchPolicy: 'no-cache'})
// }

// function updateToMe() {
//   console.log(user.id)
//   toMeQueryEnabled.value = true
//   result.value = toMeResult.value

//   // const { result : r, loading: l, error: e} = 
//   // result.value = r.value
//   // loading.value = l.value
//   // error.value = e.value
// }