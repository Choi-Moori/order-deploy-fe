<template>
    <div>
        <h1>store test component3</h1>
        <p>count : {{getCount}} </p>
        <p>message : {{getMessage}}</p> 
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    // 참조하고 있는 변수값이 변했을때 실행되는 함수
    computed:{
        ...mapGetters(['getCount', 'getMessage'])
    },
}
</script>