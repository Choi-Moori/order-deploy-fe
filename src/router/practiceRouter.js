// router 는 케멀케이스로 간다.
import VuetifyComponent from '@/components/practice/VuetifyComponent'
import ModelingComponent from '@/components/practice/ModelingComponent'
import ConditionalComponent from '@/components/practice/ConditionalComponent'
import HookComponent from '@/components/practice/HookComponent'
import WatchUpdateComponent from '@/components/practice/WatchUpdateComponent'
import AxiosTestComponent from '@/components/practice/AxiosTestComponent'
import RouterTestComponent from '@/components/practice/RouterTestComponent'

export const practiceRouter = [
    {
        path: '/practice/vuetify',
        name: 'VuetifyComponent',
        component: VuetifyComponent
    },
    {
        path: '/practice/modeling',
        name: 'ModelingComponent',
        component: ModelingComponent
    },
    {
        path: '/practice/conditional',
        name: 'ConditionalComponent',
        component: ConditionalComponent
    },
    {
        path: '/practice/hooks',
        name: 'HookCoponent',
        component: HookComponent
    },
    {
        path: '/practice/hooks-watch-update',
        name: 'WatchUpdateComponent',
        component: WatchUpdateComponent
    },
    {
        path: '/practice/axiostest',
        name: 'AxiosTestComponent',
        component: AxiosTestComponent
    },
    {
        path: '/practice/routertest',
        name: 'RouterTestComponent',
        component: RouterTestComponent
    }
]