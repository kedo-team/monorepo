import { boot } from 'quasar/wrappers'
import Driver from 'driver.js'
import type { Step } from 'driver.js'
import 'driver.js/dist/driver.min.css'

export default boot(async ({ router }) => {
  router.afterEach( (to) => {
    switch(to.name) {
      // case 'root': showRootScreen(); break;
    }
  })
});

async function showRootScreen() {
  await import('src/css/onboarding.css')
  .then(()=>{
    const centerPoint = document.createElement('div')
    centerPoint.id = 'kt-center-point'
    document.getElementById('q-app').firstChild.appendChild(centerPoint)
    const driver = new Driver()
    driver.defineSteps([
      welcomeStep,
      leftDrawerStep,
      changeUser,
      dashboardStep,
      stupDushboardStep,
      lastStep
    ])
    driver.start()
  })
}

const welcomeStep: Step = {
  element: '#kt-center-point',
  popover: {
    className: 'kt-onboarding-welcome-step',
    position: 'mid-center',
    title: '<h2>КЭДО-Тим приветствует вас!</h2>',
    description: `<div class='text-h6'>Мы сделали интуитивно понятный интерфейс для ваших сотрудников и нам не терпется его показать!</div>`
  }
}

const dashboardStep: Step = {
  element: '#kt-center-point',
  popover: {
    position: 'left-center',
    title: 'Рабочий стол',
    description: `<p>Это рабочий стол с виджетами</p>
                  <p>Каждый пользователь может настроить их по своему вкусу. Они двигаются, меняют размер и удаляются и добавляются</p>`
  }
}

const stupDushboardStep: Step = {
  element: '#kt-setup-dashboard-btn',
  popover: {
    position: 'bottom-left',
    title: 'Редактировать рабочий стол',
    description: `<p>Это кнопка открывает библиотеку виджетов</p>
                  <p>И да, виджеты можно разрабатывать под ваши конкретные потребности</p>`
  }
}

const leftDrawerStep: Step = {
  element: 'aside.q-drawer',
  popover: {
    position: 'right-center',
    title: 'Все операции',
    description: `<p>Состав доступных пунктов меню меняется в зависимости от роли текущего пользователя</p>`
  }
}

const changeUser: Step = {
  element: '#kt-change-user',
  popover: {
    position: 'bottom-left',
    title: 'Текущий пользователь',
    description: `<p>Здесь вы видете текущего пользователя и меню переключения пользователя.</p>
                  <p>В целях демонстрации мы сделали трех пользователей с тремя ролями.</p>`
  }
}

const lastStep: Step = {
  element: '#kt-center-point',
  popover: {
    position: 'left-bottom',
    title: 'Попробуйте сами! :)',
    description: `<p>ps: мы стараемся сделать дружелюбное КЭДО и будем рады, если вы поделитесь с нами своими ощущениями.</p>`
  }
}