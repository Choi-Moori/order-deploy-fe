<template>
    <v-container>
        <v-row justify="center">
            <!--  화면의 크기가 small(핸드폰, 태블릿) 이상일 때 : sm -->
            <!-- 화면의 크기가 medium(데스크탑) 이상일 때 : md -->
            <v-col cols="12" sm="4" md="6">
                <!-- <v-alert
                    v-if="errorMessage"
                    type="error"
                    dismissible
                    @input="errorMessage = ''">
                    {{ errorMessage }}
                </v-alert> -->
                <v-card>
                    <v-card-title class="text-h5 text-center custom-title">
                        Sign up 😀 
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="memberCreate">
                            <v-text-field
                                label="이름"
                                v-model="name"
                                prepend-icon="mdi-account"
                                required
                            ></v-text-field>
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
                            <v-text-field
                                label="도시"
                                v-model="city"
                                prepend-icon="mdi-city"
                            ></v-text-field>
                            <v-text-field
                                label="상세주소"
                                v-model="street"
                                prepend-icon="mdi-home"
                            ></v-text-field>
                            <v-text-field
                                label="우편번호"
                                v-model="zipcode"
                                prepend-icon="mdi-mailbox"
                            ></v-text-field>   
                            <v-btn type="submit" color="secondary" block>등록</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
        return{
            name: "",
            email: "",
            password: "",
            city: "",
            street: "",
            zipcode: "",
            errorMessage: ""
        }
    },
    methods: {
        async memberCreate() {
            try {
                const registerData = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    // address로 묶어야 db에 들어감 
                    address: {
                        city: this.city,
                        street: this.street,
                        zipcode: this.zipcode
                    }
                }
                // 주소 , 데이터 => 이렇게하면 body에 데이터가 들어가게 됨 
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/create`, registerData);
                // 로그인 성공하고 홈화면으로 보내기
                // 위에 async await 안해주면 회원가입 등록이 다 안되는데 다음코드로 가버림 
                // async-await로 할 때까지 기다려~ 시켜야함 
                this.$router.push("/");
                
            } catch (e) {
                this.errorMessage = e.response.data.error_message;
                console.log(e.response.data.error_message)
                alert(this.errorMessage)
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
