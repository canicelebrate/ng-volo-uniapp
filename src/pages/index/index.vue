<template>
	<view class="content">
        <!-- <image class="logo" src="../../static/logo.png"></image> -->
		<view>
            <text class="title">{{title}}</text>
        </view>
		<view class="uni-btn-v uni-common-mt">
			<button open-type="getUserInfo" @getuserinfo="bindgetuserinfo ">授权登录</button>
			<button type="primary" @click="sendRequest('await')" :loading="loading">发起请求（await）</button>
			
		</view>
	</view>
</template>

<script lang="ts">
    import Vue from 'vue';
	import utils from "../../utils/utils";
	import api from "../../utils/api";
	const requestUrl = 'https://unidemo.dcloud.net.cn/ajax/echo/text?name=uni-app'
	const duration = 2000
	export default Vue.extend({
		data() {
			return {
				title: 'Hello Uni',
				loading: false,
				res: ''
			}
		},
		onLoad() {

		},
		methods: {
			bindgetuserinfo(e:any) {
				console.log(e);
			},
			sendRequest(mode:string) {
				this.loading = true;
				
				uni.login({
							success: logRes => {
								uni.getUserInfo({
									success: (res1: any) => {
										res1.code = logRes.code;
										console.log("uni.getUserInfo:", res1);
										api.client_miniAuth({
											appName:"bookstore",
											code:res1.code, 
											encryptedData:res1.encryptedData, 
											iv:res1.iv,
											}).then( data => {
												console.log("miniAuth Result:",data);
												this.loading = false;
											}).catch( error => {
												console.log(error);
												this.loading = false;
											});
										},
									});
								}
						});
			}
		}
	});
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
