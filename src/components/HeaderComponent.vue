<template>
    <v-app-bar app dark>
        <v-container>
            <v-row>
                <!-- d-flex justify-start : 왼쪽 정렬 -->
                    <v-col class="d-flex justify-start">
                    <div v-if="userRole === 'ADMIN'">
                        <v-btn :to="{ path: '/member/list' }">회원관리</v-btn>
                        <v-btn :to="{ path: '/product/manage' }">상품관리</v-btn>
                        <!-- :to= {path} 는 경로만 바꿔준다? 맞을거야 -->
                         <!-- href 는 해당 경로로 이동한다.(reload됨) -->
                        <v-btn href="/order/list">실시간주문({{liveQuantity}})</v-btn>
                    </div>
                    </v-col>
                <v-col class="text-center">
                    <v-btn :to="{ path: '/' }">java shop333333</v-btn>
                </v-col>

                <!-- d-flex justify-end : 오른쪽 정렬 -->
                <v-col class="d-flex justify-end">
                    <v-btn v-if="isLogin" :to="{ path: '/order/cart' }">장바구니({{ getTotalQuantity }})</v-btn>
                    <v-btn :to="{ path: '/product/list' }">상품목록</v-btn>
                    <v-btn v-if="isLogin" :to="{ path: '/mypage' }">MyPage</v-btn>
                    <v-btn v-if="!isLogin" :to="{ path: '/member/create' }">회원가입</v-btn>
                    <v-btn v-if="!isLogin" :to="{ path: '/login' }">로그인</v-btn>
                    <v-btn v-else @click="doLogout">로그아웃</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';
// 서버와 실시간 알림서비스를 위한 의존성 추가 필요.
import { EventSourcePolyfill } from 'event-source-polyfill';

export default {
    data(){
        return{
            userRole: null,
            isLogin: false,
            liveQuantity:0
        }
    },
    computed:{
        ...mapGetters(['getTotalQuantity'])
    },
    created(){
        const token = localStorage.getItem('token');
        if(token){
            this.isLogin = true;
            this.userRole = localStorage.getItem("role");
        }
        // sse 코드
        if(this.userRole === 'ADMIN'){
            // 서버에서 해준 mapping
            let sse = new EventSourcePolyfill(`${process.env.VUE_APP_API_BASE_URL}/subscribe`, {headers: {Authorization: `Bearer ${token}`}});
            // connect 라는 이벤트가 들어오면 (event)
            sse.addEventListener('connect', (event) => {
                console.log(event)
            });
            sse.addEventListener('ordered', (event) => {
                console.log(event.data)
                this.liveQuantity++;
            });
            sse.onerror = (error) =>{
                console.log(error);
                sse.close();
            }
        }
    },
    methods:{
        doLogout(){
            localStorage.clear();
            window.location.reload();
        }
    }
}
</script>