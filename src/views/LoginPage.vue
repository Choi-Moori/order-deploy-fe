<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="2" md="5">
                <v-card>
                    <v-card-title class="text-h5 text-center custom-title">
                        로그인
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="doLogin">
                            <v-text-field
                                label="이메일"
                                v-model="email"
                                prepend-icon="mdi-email"
                                required
                                ></v-text-field>
                            <v-text-field
                                label="비밀번호"
                                v-model="password"
                                prepend-icon="mdi-lock"
                                required
                            ></v-text-field>
                            <v-row>
                                <v-col cols="6">
                                    <v-btn color="red" block>비밀번호 변경</v-btn>
                                </v-col>
                                <v-col cols="6">
                                    <v-btn type="submit" color="secondary" block>로그인</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
  import axios from 'axios';
  import {jwtDecode} from 'jwt-decode';

  export default {
    data() {
        return{
            email: "",
            password: "",
        }
    },
    methods: {
        async doLogin(){
            // try catch 묶어서 login성공시 token을 console.log로 출력
            try{
                const loginData = {
                    email: this.email,
                    password: this.password
                }
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/doLogin`, loginData);
                // localstorage라는 브라우저의 특정 공간에 서버로부터 받아온 토큰값 저장.
                const token = response.data.result.token;
                const refreshToken = response.data.result.refreshToken;
                // token 에서 role 을 인코딩 함
                const role = jwtDecode(token).role;
                localStorage.setItem('token',token);
                localStorage.setItem("refershToken", refreshToken);  
                localStorage.setItem("role", role);
                window.location.href = "/";
            }catch(e){
                console.log(e.response.data.error_message);
            }
        }
    }
  };
</script>

<style scoped>
.custom-title {
  font-family: "Playfair Display", serif;
}
</style>
