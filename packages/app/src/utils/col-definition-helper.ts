import { date } from 'quasar'
// TODO: Как это сделать без импорта? И есть ли реальная двойная загрузка .d.ts
import type { QTableColumnDefinition, SlotTemplateDefinition } from 'src/quasar'
import { datei18n } from './quasar-i18n'

type QTableDefinitions = {[key: string]: {
                                column:    Partial<QTableColumnDefinition>,
                                template?: Partial<SlotTemplateDefinition>
                               }
                          };


function getQTableColumnDefinition(colnames: string[]): QTableColumnDefinition[] {
    const retValue = colnames.map<QTableColumnDefinition>(name => {
        // if something missing change to default (colName)
        const col = {...{name, field: name, label: name}, ...columns[name].column}
        return col;
    })
    return retValue;  
}

function getQTableTemplateDefinition(colnames: string[]): SlotTemplateDefinition[] {
    const retValue: SlotTemplateDefinition[] = []
    
    colnames.forEach(name => {
        if (columns[name] !== undefined && 
            columns[name].template !== undefined) {
                retValue.push({
                    slot: columns[name].template!.slot ?? name,
                    component: columns[name].template!.component ?? name
                })
        }
    })
    return retValue;
}

export {getQTableColumnDefinition, getQTableTemplateDefinition}

const columns: QTableDefinitions = {
    approveReject: {
        column: {
            required: false,
            label: 'Быстрые действия',
            align: 'center',
            field: 'id'
        },
        template: {
            component: 'KT-ApproveReject'
        }
    },
    assignedToUser: {
        column: {
            required: true,
            label: 'Кому назначена',
            align: 'center'
        },
        template: {
            component: 'KT-UserAvatar'
        }
    },
    authorUser: {
        column: {
            label: 'Автор',
            align: 'center'
        },
        template: {
            component: 'KT-UserAvatar'
        }
    },
    createdAt:  {
        column: {
            required: true,
            label: 'Дата создания',
            align: 'left',
            format: (val: string) =>  date.formatDate(val, 'DD MMM YY, ddd\nHH:mm', datei18n),
            sortable: true
        },
        // template: {
        //     slot: p+'createdAt',
        //     component: 'KT-UserAvatar'
        // }
      },
    download: {
        column: {
            label: 'Скачать',
            field: 'fileId',
            align: 'center'
        },
        template: {
            component: 'KT-ButtonDownload'
        }
    },
    isViewed: { 
        column: {
            align: 'left',
            label: 'Просмотрен?',
        },
        template: {
            component: 'KT-IsViewed'
        }    
    },
    requestTitle: {
        column: {
            align: 'center',
            label: 'Описание',
            field: 'request',
            
        },
        template: {
            component: 'KT-RequestTitle'
        }
    },
    status: {
        column: {
            name: 'status',
            align: 'center',
            label: 'Статус',
            field: 'status'
        },
        template: {
            slot: 'status',
            component: 'KT-IssueStatus'
        }
    },
    tasksList: {
        column: {
            align: 'left',
            label: 'Статус согласования'
        },
        template: {
            component: 'KT-WorkflowInstanceString'
        }
    },
    title: {
        column: { 
            align: 'left',
            label: 'Заголовок',
        },
        template: {
            component: 'UserAvatar'
        }
    },
    // period: {
    //     name: 'period',
    //     label: 'Период расчета',
    //     field: 'period',
    //     align: 'left'
    // },
    // download: {
    //     name: 'download',
    //     label: 'Скачать',
    //     field: 'fileId',
    //     align: 'center'
    //   }
}