<template>
    <div>
        <v-app-bar app>
            네비게이션바임
        </v-app-bar>
        <!-- v-container, v-row, v-col -->
        <v-container>
            <v-row>
                <v-col cols="8">
                    helloworld1 
                </v-col>
                <v-col cols="4">
                    helloworld2 
                </v-col>
                <!-- v-card -->
                <v-card>
                    <v-card-title>
                        안내문구
                    </v-card-title>
                    <v-card-text>
                        안녕하세요
                    </v-card-text>
                </v-card>
            </v-row>
            <v-row>
                <v-simple-table>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>이메일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>hong1</td><td>hong1@naver.com</td></tr>
                        <tr><td>hong2</td><td>hong2@naver.com</td></tr>
                    </tbody>
                </v-simple-table>
            </v-row>
            <v-row>
                
            </v-row>
        </v-container>
        <v-card>
            <v-card-title>회원가입</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field
                            label="email"
                            type="email"
                        >
                        </v-text-field>
                            <v-text-field
                            label="name"
                            type="text"
                        >
                        </v-text-field>
                        <v-text-field
                            label="password"
                            type="password"
                        >
                        </v-text-field>
                        <v-btn color="primary">제출하기</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
            <br><br>
            <v-btn @click.stop="cancel()">취소버튼</v-btn>
            <!-- 모달창을 위한 v-dialog -->
            <v-dialog v-model="dialog" max-width="400px">
                <v-card>
                    <v-card-title>정말 취소 하시겠습니까?</v-card-title>
                    <v-card-actions>
                        <v-btn color="primary" >확인</v-btn>
                        <v-btn color="secondary" @click="dialog=false">취소</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <br>
            <!-- 애는 그냥 링크를 탄거(실시간 데이터의 변경이 있는 경우) 새로고침을 통해 이동 -->
            <v-btn href="/practice/modeling">라우팅1</v-btn>
            <!-- 애는 라우터 기능을 이용한거.(실시간 데이터의 변경이 없는 경우) -->
            <!-- SPA 를 사용하면 created 함수가 실행 되지 않아서 서버에서 데이터를 못 받아올 수 있다. -->
            <!-- 그렇다면 mounted 에다 넣으면 되지 않을까? -> 테스트 해보자. -->
            <v-btn :to="{path: '/practice/modeling'}">SPA라우팅(router기능활용)</v-btn>
            <!-- 보통 아래의 경우를 더 많이 사용한다. -->
            <v-btn :to="{name: 'ModelingComponent'}">SPA라우팅(name호출)</v-btn>
     </div>
</template>

<script>
export default {
    // 변수 설정 : data()함수를 통해 변수 세팅
    // return 안에 , 를 기준으로 설정
    data(){
        return{
            dialog:false,
        }
    },
    // 함수는 methods 에서 설정.
    methods: {
        cancel(){
            this.dialog = true;
        }
    }
}
</script>