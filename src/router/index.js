    import { createRouter, createWebHistory } from "vue-router"
    // @는 src(루트 폴더)를 의미 => 루트(root) > components > vue 파일
    // 파일 내부에 export default가 있는 경우에는 {}가 필요 없고, 그렇지 않으면 {}필요
    // import 하는 요소가 여러개 있을때에도 {}를 붙인다.
    // import HomeComponent from "@/components/HomeComponent.vue"
    // import TestComponent from '@/components/TestComponent.vue'
    import { practiceRouter } from "./practiceRouter";
    import { memberRouter } from "./memberRouter";
    import { productRouter} from "./productRouter";
    import { orderRouter } from "./orderRouter";

    const routes = [
        // {
        //     // path 로도 라우팅이 가능하고, name으로도 라우팅이 가능
        //     // name 으로 라우팅하는 경우는 js코드내에서 라우팅하는 경우.
        //     path: '/',
        //     name: 'HomeComponent',
        //     // 반드시 두글자 이상의 케멀케이스로 되어야 한다.
        //     component: HomeComponent
        // },
        // {
        //     path: '/test',
        //     name: 'TEST',
        //     component: TestComponent
        // }
        ...practiceRouter,
        ...memberRouter,
        ...productRouter,
        ...orderRouter,
    ]

    const router = createRouter({
        // vue router는 내부적으로 두가지 방식의 히스토리 관리를 제공
        // 1)createWebHistory : /home, 2) createHashHistory: /#/home
        // 대부분 WebHistory 사용
        history: createWebHistory(),
        routes
    })

    export default router;