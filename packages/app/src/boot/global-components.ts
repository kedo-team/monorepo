import { boot } from 'quasar/wrappers'
import UserAvatar from '../components/global/UserAvatar.vue'
import ButtonDownload from '../components/global/ButtonDownload.vue'
import IssueStatus from '../components/global/IssueStatus.vue'
import ApproveReject from '../components/global/ApproveReject.vue'
import RequestTitle from '../components/global/RequestTitle.vue'
import IsViewed from '../components/global/IsViewed.vue'
import SmartTable from '../components/global/SmartTable.vue'
import WorkflowInstanceString from '../components/global/WorkflowInstanceString.vue'

export default boot(async ({ app }) => {
    app.component('KT-UserAvatar',     UserAvatar)
       .component('KT-ButtonDownload', ButtonDownload)
       .component('KT-IssueStatus',    IssueStatus)
       .component('KT-ApproveReject',  ApproveReject)
       .component('KT-RequestTitle',   RequestTitle)
       .component('KT-IsViewed',       IsViewed)
       .component('KT-SmartTable',     SmartTable)
       .component('KT-WorkflowInstanceString',     WorkflowInstanceString)
});
