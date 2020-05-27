// import './index.scss'
import '@/assets/styles/scss/normalize.scss'
import '@/assets/styles/scss/base-style.scss'

import Container from '@/components/Container.vue'
import Draggable from '@/components/Draggable.vue'
import DraggableAdvance from '@/components/DraggableAdvance.vue'
import FormConfig from '@/components/FormConfig.vue'
import GenerateForm from '@/components/GenerateForm.vue'
import WidgetConfig from '@/components/WidgetConfig.vue'
import WidgetForm from '@/components/WidgetForm.vue'


const components = [Container, Draggable, DraggableAdvance, FormConfig, GenerateForm, WidgetConfig, WidgetForm]

const install = Vue => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  // add xx method in global Vue

}

const mpaVue = {
  install
}

export default mpaVue

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(mpaVue)
}

export { Container, Draggable, DraggableAdvance, FormConfig, GenerateForm, WidgetConfig, WidgetForm }
