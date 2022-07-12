import { boot } from 'quasar/wrappers'
import UserAvatar from 'src/components/global/UserAvatar.vue'
import ButtonDownload from 'src/components/global/ButtonDownload.vue'
import IssueStatus from 'src/components/global/IssueStatus.vue'
import ApproveReject from 'src/components/global/ApproveReject.vue'
import RequestTitle from 'src/components/global/RequestTitle.vue'
import IsViewed from 'src/components/global/IsViewed.vue'
import SmartTable from 'src/components/global/SmartTable.vue'
import WorkflowInstanceString from 'src/components/global/WorkflowInstanceString.vue'
import ButtonToggle from 'src/components/global/ButtonToggle.vue'
import RequestWorflowTasks from 'src/components/global/RequestWorflowTasks.vue'

export default boot(async ({ app }) => {
    app.component('KT-UserAvatar',     UserAvatar)
       .component('KT-ButtonDownload', ButtonDownload)
       .component('KT-IssueStatus',    IssueStatus)
       .component('KT-ApproveReject',  ApproveReject)
       .component('KT-RequestTitle',   RequestTitle)
       .component('KT-IsViewed',       IsViewed)
       .component('KT-SmartTable',     SmartTable)
       .component('KT-WorkflowInstanceString', WorkflowInstanceString)
       .component('KT-ButtonToggle',     ButtonToggle)
       .component('KT-RequestWorflowTasks',     RequestWorflowTasks)
});
