<template>
    <div>
        <h1>store test component2</h1>
        <p>count : {{getCount}}</p>
        <v-btn @click="incrementCount" color="blue"> increment count </v-btn>
        <br>
        <input type="text" v-model="message">
        <v-btn @click="updateMessage" color="blue">update message</v-btn>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return{
            message:"",
        }
    },
    // 참조하고 있는 변수값이 변했을때 실행되는 함수
    computed:{
        ...mapGetters(['getCount']
        ),
        ...mapGetters(['getMessage'])
    },
    methods:{
        incrementCount(){
            // this.count++;
            this.$store.dispatch('incrementCount')
        },
        updateMessage(){
            this.$store.dispatch('updateMessage', this.message)
        }
    }
}
</script>