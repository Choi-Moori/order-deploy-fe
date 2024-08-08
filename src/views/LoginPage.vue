<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="4" md="6">
                <v-card>
                    <v-card-title class="text-h5 text-center custom-title">
                        Login 😀 
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="doLogin">
                            <v-text-field
                                label="이메일"
                                v-model="email"
                                type="email"
                                prepend-icon="mdi-email"
                                required
                                ></v-text-field>
                            <v-text-field
                                label="비밀번호"
                                v-model="password"
                                type="password"
                                prepend-icon="mdi-lock"
                                required
                            ></v-text-field>
                           <v-row>
                            <v-col cols="6">
                                <!-- showPasswordModel이 작동해서 클릭하면 화면 열료 -->
                                <v-btn color="secondary" @click="showPasswordModal" block>비밀번호 변경</v-btn>
                            </v-col>
                            <v-col cols="6">
                                <v-btn type="submit" color="primary" block>로그인</v-btn>
                            </v-col>
                           </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- 비밀번호 변경 modal 넣어보께 -->
         <!-- resetPassword가 true가 될 때 해당 모달창이 보여짐 -->
         <!--  @update:dialog => modal 컴포넌트가 update:dialog라는 이벤트를 발생시킬 때 싱행될 이벤트 핸들러 정의 -->
         <!--  $event => 자식 요소로부터 전달된 값이 들어옴 (true/ false전달) -->
        <ResetPasswordModal
            v-model="resetPassword"
            @update:dialog="resetPassword = $event"
        >
            
        </ResetPasswordModal>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  import {jwtDecode} from 'jwt-decode';
  import ResetPasswordModal from './ResetPasswordModal.vue';

  export default {
    components: {
        ResetPasswordModal
    },
    data() {
        return{
            email: "",
            password: "",
            errorMessage: "",
            resetPassword: false // true이면 보임 false이면 안보임 
        }
    },
    methods: {
        async doLogin() {
            // login 성공시 token을 console.log로 출력 
            try {
                const loginData = {
                    email: this.email,
                    password: this.password
                }
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/doLogin`, loginData);
                // 토큰값 console에 찍기 
                //console.log(response.data.result.token)
                // localstorage라는 브라우저의 특정 공간에 서버로부터 받아온 토큰값 저장
                const token = response.data.result.token;
                const refreshToken = response.data.result.refreshToken;
                const role = jwtDecode(token).role;
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('role', role);

                // this.$router.push("/");
                // sse를 위한 연결 코드
                    

                window.location.href="/"; 
            } catch(e) {
                const errorMessage = e.response.data.error_message;
                console.log(e.response.data.error_message)
                alert(errorMessage)

            }
        },
        showPasswordModal() {
            this.resetPassword = true;
        }
    }
}
  </script>

<style scoped>
.custom-title {
  font-family: "Playfair Display", serif;
}
</style>
