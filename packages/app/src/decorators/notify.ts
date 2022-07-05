import { Notify } from 'quasar'

export function notify(): any {
  return function(target: any, propKey: string, descriptor: PropertyDescriptor) {
    const targetMethod = descriptor.value

    // TODO: It's needs to be a decarator BeforeAfter factory
    descriptor.value = function (...args: any[]) {
      const notif = Notify.create({
        group: false, // required to be updatable
        timeout: 0, // we want to be in control when it gets dismissed
        spinner: true,
        message: 'Напраляю заявку...',
        position: 'bottom-right'
      })
      console.log('calling core func')
      const res = targetMethod.apply(this, args)
      console.log('endof call core func with val', res)

      setTimeout(() => {
        notif({
          type: 'positive',
          spinner: false,
          message: 'Завка направлена!',
          timeout: 3000
        })
      }, 4000)

      return res;
    }
  }
}