<template>
    <v-container>
        <v-row justify="center">
            <v-col>
                <v-card>
                    <v-card-title class="text-center text-h5">
                        회원목록
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                            :headers="tableHeaders"
                            :items="memberList"
                        >
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            tableHeaders:[ {title:'ID', key: 'id'},
                           {title:'이름', key: 'name'},
                           {title:'이메일', key: 'email'},
                           {title:'주문수량', key: 'orderCount'} ],
            memberList:[],                           
        }
    },
    async created() {
        // const token = localStorage.getItem('token');
        // {headers: {Authorization: 'Bearer 토큰 값'}}}
        // const headers = {Authorization: `Bearer ${token}`};
        // const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/list`, {headers});

        // main.js에 추가하면서 토큰 꺼내오는 부분 주석 
        try {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/list`);
            this.memberList = response.data.result.content; // setting 
        }catch(e){
            console.log(e);
        }
    }
}
</script>

<style>
</style>