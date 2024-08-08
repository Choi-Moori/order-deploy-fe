<template>
    <v-container>
        <v-row class="d-flex justify-content-between mt-5">
            <v-col>
                <!-- 검색  -->
                <v-form @submit.prevent="searchProducts">
                    <v-row>
                        <v-col cols="auto">
                            <v-select 
                                v-model="searchType" 
                                :items="searchOptions" 
                                item-title="text" 
                                item-value="value">
                            </v-select>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="searchValue" label="Search">
                            </v-text-field>
                        </v-col>
                        <v-col cols="auto" align-self="center">
                            <v-btn type="submit">검색</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
            <v-col cols="auto" v-if="!isAdmin" align-self="center">
                <v-btn @click="addCart" color="secondary" class="mr-2">장바구니</v-btn>
                <v-btn @click="createOrder" color="secondary">주문하기</v-btn>
            </v-col>
            <v-col cols="auto" v-if="isAdmin" align-self="center">
                <v-btn href='/product/create' color="success">상품등록</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-p text-center">{{ pageTitle }}</v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th>제품사진</th>
                                    <th>제품명</th>
                                    <th>가격</th>
                                    <th>재고수량</th>
                                    <th v-if="!isAdmin">주문수량</th>
                                    <th class="text-center" v-if="!isAdmin">주문선택</th>
                                    <th v-if="isAdmin">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="p in productList" :key="p.id">
                                    <td>
                                        <v-img :src="p.imagePath" style="height: 100px; width:auto;"></v-img>
                                    </td>
                                    <td>{{ p.name }}</td>
                                    <td>{{ p.price }}</td>
                                    <td>{{ p.stockQuantity }}</td>
                                    <td v-if="!isAdmin">
                                        <v-text-field
                                            v-model.number="p.quantity"
                                            type="number"
                                            style="width:70px"
                                        >
                                        </v-text-field>
                                    </td>
                                    <td class="text-center" v-if="!isAdmin">
                                        <input type="checkbox" v-model="selected[p.id]">
                                    </td>
                                    <td v-if="isAdmin">
                                        <v-btn color="secondary" @click="deleteProduct(p.id)">삭제</v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
    props: [
        'isAdmin',
        'pageTitle',
    ],
    data() {
        return {
            searchType: 'optional',
            searchOptions: [
                { text: "선택", value: 'optional' },
                { text: "상품명", value: 'searchName' },
                { text: "카테고리", value: 'category' }
            ],
            searchValue: "",
            productList: [],
            pageSize: 5,
            currentPage:0,
            isLastPage: false,
            isLoading: false,
            // selected예시
            // 1:true = 1번 상품 선택시
            // 2:false = 2번 상품 미선택시
            // 3:false = 3번 상품 미선택시
            // 4:true = 4번 상품 선택시
            // {1:true, 2:false, 3:false, 4:true} 이런 형식으로 담긴다.ㅏㅓㅗㅅㅅㅎ
            selected:{},
        }
    },
    created() {
        this.loadProduct();
        // scroll이라는 게 정해져 있다.
        window.addEventListener('scroll', this.scrollPagination);
    },
    beforeUnmount(){
        window.removeEventListener('scroll', this.scrollPagination);
    },  
    computed:{
        ...mapGetters(['getProductsInCart'])
    },
    methods: {
        deleteProduct(productId) {
            console.log(productId)
        },
        searchProducts(){
            console.log(this.searchType);
            console.log(this.searchValue);
            this.productList=[];
            this.currentPage = 0;
            this.isLastPage=false;
            this.isLoading=false;
            this.loadProduct();
        },
        async loadProduct() {
            try {
                if(this.isLoading || this.isLastPage) return;
                
                this.isLoading=true;
                // Pageable객체에 맞게 파라미터 형식으로 데이터를 전송해줘야함.
                // 방법 1 : {params:{page:10, size:2}} 와 같은 형식으로 전송시 parameter형식으로 변환되어 서버로 전송.
                // 방법 2 : FormData객체 생성 하여 서버로 데이터 전송.
                const params = {
                    size: this.pageSize,
                    page: this.currentPage,
                }
                // params = {size:5, page:0, category:"fruits"} 또는 params = {size:5, page:0, name:"apple"}
                if(this.searchType === 'searchName'){
                    params.searchName = this.searchValue;
                }else if(this.searchType === 'category'){
                    params.category = this.searchValue;
                }
                console.log(params)
                // localhost:8080/product/list?category=fruites&size=5&page=0 또는
                // localhost:8080/product/list?name=apple&size=5&page=0
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/product/list`, {params})
                 // 아래 map을 활용 => entity에 quantity=0을 새로 추가한거랑 같은 것
                // 주문 수량에 처음에 0으로 깔림 -> 화면에서 주문 수량을 늘리면 productList에 있는 p가 바뀜 
                const additionalData = response.data.result.content.map(p => ({...p, quantity:0})); 
                // const additionalData = response.data.result.content;
                if(additionalData.length==0){
                    this.isLastPage = true;
                    return;
                }
                // this.isLastPage = response.data.result.last;
                // 두 배열을 합치는 문법.
                this.productList = [...this.productList, ...additionalData]
                // this.productList = response.data.result.content;
                this.currentPage++;
                this.isLoading=false;
            }
            catch(e){
                console.log(e)
            }
        },
        scrollPagination(){
            // 현재화면 + 스크롤로 이동한 화면 > 전체화면 - n 의 조건이 성립되면 추가 데이터 로드
            const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
            if(isBottom && !this.isLastPage && !this.isLoading){
                this.loadProduct();
            }
        },
        addCart(){
            const orderProducts = Object.keys(this.selected) 
                                        .filter(key=>this.selected[key])
                                        .map(key=>{
                                            const product = this.productList.find(p=>p.id==key)
                                            return {id:product.id, name:product.name, quantity:product.quantity};
                                        });
            orderProducts.forEach(p => p.quantity > 0 && this.$store.dispatch('addCart', p));
            // window.location.reload();
            console.log( this.getProductsInCart );
        },
        async createOrder() { // 주문하기 버튼 클릭 후 호출
            // 객체에서 key값 뽑아내고 그 중 true인 key만 뽑아냄 
            console.log(this.selected)
            const orderProducts = Object.keys(this.selected) 
                                        .filter(key=>this.selected[key])
                                        .map(key=>{
                                            const product = this.productList.find(p=>p.id==key)
                                            return {productId:product.id, productCnt:product.quantity};
                                        });
            console.log(orderProducts);
            if (orderProducts.length < 1) {
                alert("주문대상 물건이 없습니다.");
                return;
            }
            // 몇개 주문할거임 ?
            const yesOrNo = confirm(`${orderProducts.length}개 주문할거?`);
            if (!yesOrNo) {
                console.log("주문 취소됨");
                return;
            }
            try {
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/order/create`, orderProducts);
                alert('성 공 두 둥')
                window.location.reload();
            } catch(e) {
                console.log(e);
                alert('주문 실패임')
            } 
        }   
    }
}
</script>