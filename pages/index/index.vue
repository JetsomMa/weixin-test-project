<template>
	<view class="content">
		<button @click="getOpenId">获取openid</button>
		<button @click="getAccessToken">获取access_token</button>
	</view>
</template>

<script>
	const WXMP_URL = 'https://www.mashaojie.cn/weixin'
	export default {
		data() {
			return {
				title: '功能测试项目',
				provider: '',
				code: '',
			}
		},
		methods: {
			async getProvider() {
				try{
					const getProviderResp = await uni.getProvider({service: 'oauth'})
					this.provider = getProviderResp.provider[0]
					return this.provider
				}catch(e){
					console.error(e)
				}
			},
			async getCode() {
				try{
					const provider = await this.getProvider()
					const loginRes = await uni.login({provider: provider})
					if(loginRes.errMsg === "login:ok") {
						this.code = loginRes.code
						return this.code
					} else {
						console.error(loginRes)
					}
				}catch(e){
					console.error(e)
				}
			},
			async getOpenId() {
				try{
					await this.getCode()
					const resp = await uni.request({
						url: WXMP_URL + '/wxmpApi/getOpenidAndToken',
						method: 'POST',
						data: {
							code: this.code
						}
					})
					
					console.log(resp)
				}catch(e){
					console.error(e)
				}
			},
			async getAccessToken() {
				try{
					const resp = await uni.request({
						url: WXMP_URL + '/wxmpApi/getAccessToken',
						method: 'GET'
					})
					
					console.log(resp)
				}catch(e){
					console.error(e)
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		button {
			margin: 20rpx;
			width: 70%;
		}
	}
</style>
