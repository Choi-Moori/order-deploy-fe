<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" md="8">
                    <v-card-title class="text-center text-h5">
                        회원정보
                    </v-card-title>
                </v-col>
            </v-row>
        </v-container>
        <OrderListComponent 
            :isAdmin="false"
        />
    </div>
</template>

<script>
import OrderListComponent from '@/components/OrderListComponent.vue';

export default {
    components:{
        OrderListComponent
    },
    data(){
        return{

        }
    }
}
</script>