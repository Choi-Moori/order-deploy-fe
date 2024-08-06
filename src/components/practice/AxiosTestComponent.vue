<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>이름</th>
                                <th>이메일</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="member in memberList" :key="member.id">
                                <td>{{ member.id }}</td>
                                <td>{{ member.name}}</td>
                                <td>{{ member.email}}</td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>    
import axios from 'axios';

export default {
    data(){
        return{
            memberList: []
        }
    },
    // 화면이 열리기 전에 Data를 받아와 준다.
    async created(){
        const response = await axios.get('http://localhost:8080/rest/member/list');
        this.memberList = response.data.result;
    }
}   
</script>