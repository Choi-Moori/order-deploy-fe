<template>
    <!-- vue 에서 전역 상태관리는 vuex, 피니아(pinia): 많이 쓰임 -->
     <!-- vuex : npm install vuex -->
     <!-- spring jpql -> 쿼리dsl -->
      <!-- 알림 : sse, 웹소켓 -->
       <!-- rabbitMq, Kafka -->
    <div>
        <div class="storetest">
            <h1>store test component</h1>   
            <br>
        </div>
        <div class="storetest2">
            <StoreTestComponent2 />
            <br>
        </div>
        <div class="storetest3">
            <StoreTestComponent3 />
            <br>
        </div>
    </div>
</template>

<script>
import StoreTestComponent2 from './StoreTestComponent2.vue';
import StoreTestComponent3 from './StoreTestComponent3.vue';

export default {
    components:{
        StoreTestComponent2,
        StoreTestComponent3,
    },
    data(){
        return{

        }
    }
}
</script>

<style scoped>
</style>