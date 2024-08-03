<template>
    <div>
        <h1>conditional component</h1>

        <div v-if="isLogined"><v-btn @click="login()" color = "purple">로그아웃</v-btn></div>
        <div v-else><v-btn @click="login()" color = "red">로그인</v-btn></div>
        <div v-if="isLogined"><h1>환영합니다 고객님</h1></div>
        <div v-else><h1>로그인해주세요</h1></div>
        <br>
        <h1>상품목록조회</h1>
        <ul>
            <!-- v-for에서는 반드시 key값을 지정. key를 지정함으로서 각 요소마다의 고유실별 -->
            <li v-for="product in products" :key="product.id"><h2>{{product.name}}</h2></li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isLogined:false,
            products:[
                {id:1, name:"apple"},
                {id:2, name:"banana"},
                {id:3, name:"strawberry"}
                
            ],
        }
    },
    methods:{
        login(){
            this.isLogined = !this.isLogined;
        }
    }
}
</script>