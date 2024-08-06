<template>
    <div>
        <h1>watch 예제</h1>
        <div>count : {{ count }}</div>
        <v-btn @click="incrementCount"> increment count</v-btn>
        <h1>update 예제</h1>
        <div>message : {{message}}</div>
        <v-btn @click="updateMessage">update message</v-btn>
    </div>
</template>

<script>
export default {
    data(){
        return{
            count : 0,
            message: "hello java"
        }
    },

    // 특정 변수값의 변경사항을 인지하는 hook 함수.
    watch:{
        // 인지하고자 하는 변수값과 일치되는 함수명을 써야한다.
        count(){
            alert("count값 변경")
        }
    },
    // dom 객체(화면)의 변경사항을 인지하는 hook 함수.
    // updated 가 더 넓은 범위를 갖는다.
    updated(){
        alert("dom 요소 변경")  
    },
    methods:{
        incrementCount(){
            this.count++;
        },
        updateMessage(){
            this.message = "hello python";
        },
    }
}
</script>