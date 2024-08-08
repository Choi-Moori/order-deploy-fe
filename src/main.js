// main.js 는 vue 애플리케이션의 시작점이다.
import { createApp } from 'vue'
import App from './App.vue'
// src/router/index.js 파일의 router를 사용하겠다는 선언.
import router from '@/router/index.js'
// vuetify를 사용하겠다는 선언.
import vuetify from '@/plugins/vuetify.js'; 
import '@mdi/font/css/materialdesignicons.css'
import axios from 'axios';
import store from './store';


// createApp(App).mount('#app')
const app = createApp(App);
// axios 요청 인터셉트를 설정하여 모든 요청에 액세스 토큰 포함 
axios.interceptors.request.use(

    config => {
        const token = localStorage.getItem('token'); // 토큰 꺼내볼게
        if (token) { // 토큰 있으면
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }, 
    error => {
        // 해당 인터셉터가 무시되고, 사용자의 본래 요청인 화면으로 라우팅 
        return Promise.reject(error);
    }
)

// 401 응답을 받을 경우에 interceptor를 통해 전역적으로 rt를 통한 at 재발급 
// 만약 rt도 401 응답을 받을 경우에 token 제거 후 login 화면으로 리다이렉트 
axios.interceptors.response.use(
    response => response,
    async error => {
        // 에러의 응답이 있고 해당 에러 응답 상태가 401이면 
        if (error.response && error.response.status === 401) { 
            const refreshToken = localStorage.getItem('refreshToken'); // 서버에서 받을 refreshToken이랑 명칭 같아야함

            try { // refresh 토큰이 만료되지 않았으면 
                localStorage.removeItem('token'); // ⭐ 기존 토큰을 지워줘야 토큰 생성이 먹힘 ⭐ 
                // 다시 그 api에 refreshToken 달라고 요청 (/refresh-token 부분 - memberController에)
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/refresh-token`, {refreshToken})
                localStorage.setItem('token', response.data.result.token); // token변수에 rt로 새로 생성한 at를 담기
                
                // 토큰 받았으면 화면 reload 시켜줌 
                window.location.reload();
            } catch (e) {
                localStorage.clear();
                window.location.href = "/login"; // refresh token까지 만료됐으면 로그인화면으로 
            }
        }
        return Promise.reject(error)
    }
)

app.use(router)
app.use(vuetify)
app.use(store)
app.mount('#app')