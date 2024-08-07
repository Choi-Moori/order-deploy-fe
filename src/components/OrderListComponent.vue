<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title class="text-center text-h5 custom-title">Order List✔️</v-card-title>
                    <v-card-text>
                        <v-data-table
                            :headers="tableHeaders"
                            :items="orderList"
                            class="elevation-1"
                            show-expand
                        > 
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-btn color="success" v-if="isAdmin && item.orderStatus==='ORDERED'" @click.stop="cancelOrder(item.id)" size=small>
                                    CANCEL
                                </v-btn>
                            </template>
                            <template v-slot:expanded-row="{ item }">
                                <v-row>
                                    <v-col>
                                        <v-list-item v-for="orderItem in item.orderDetailDtos" :key="orderItem.id">
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    {{ orderItem.productName }} {{ orderItem.count }}개
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-col>
                                </v-row>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'; 
export default{
    props: [
        'isAdmin'
    ],
    data() {
        return {
            orderList: [],
            tableHeaders: [
                {title:'ID', key:'id', align:'start'},
                {title:'Member email', key:'memberEmail', align:'start'},
                {title:'Status', key:'orderStatus', align:'start'},
                {title:'Action', key:'actions', align:'start'},
            ],
        }
    },
    async created() {
        try {
            if(this.isAdmin){
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/order/list`);
                this.orderList = response.data.result;
            }else{
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/order/myorders`);
                this.orderList = response.data.result;
            }
        } catch(e) {
            console.log(e);
        } 
    },
    methods: {
        async cancelOrder(id) {
            await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/order/${id}/cancel`)
            window.location.reload();
        }
    }
}
</script>

<style scoped>
.custom-title {
  font-family: "Playfair Display", serif;
}
.text-center{
    text-align: center;
}
</style>