<template>
    <v-dialog max-width="500px">
        <v-card>
            <v-card-title class="text-h5 text-center custom-title">
                비밀번호 변경 ⚙️
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent="resetPassword">
                    <v-text-field
                        label="이메일"
                        v-model="email"
                        type="email"
                        prepend-icon="mdi-email"
                        required
                        ></v-text-field>
                    <v-text-field
                        label="기존 비밀번호"
                        v-model="asIsPassword"
                        type="password"
                        prepend-icon="mdi-lock"
                        required
                    ></v-text-field>
                    <v-text-field
                        label="신규 비밀번호"
                        v-model="toBePassword"
                        type="password"
                        prepend-icon="mdi-lock"
                        required
                    ></v-text-field>   
                    <v-row>
                        <v-col>
                            <v-btn type="submit" color="primary" block>저장</v-btn>
                        </v-col>
                        <v-col>
                            <v-btn color="secondary" @click="closeModal" block>닫기</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            email: "",
            asIsPassword: "",
            toBePassword: "",
        }
    },
    methods: {
        async resetPassword() {
            try{
                const resetData = {
                    email: this.email,
                    asIsPassword: this.asIsPassword,
                    toBePassword: this.toBePassword
                }
                const response = await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/member/reset-password`, resetData )
                alert(response.data.status_message)
                this.$emit('update:dialog', false);
            }catch(e){
                console.log(e)
                alert(e.response?.data?.error_message || "입력값을 확인해주세요")
            }
        },
        closeModal() {
            // emit => vue에서 컴퓨넌트간의 이벤트를 전달하는 매커니즘 
            this.$emit('update:dialog', false); // udpate:dialog에다가 false 전달할거얌 (부모 요소에 값 전달)
        }
    }
}
</script>