<template>
	<view class="classLayout pageBg">
		<custom-nav-bar title="分类"></custom-nav-bar>
		<view class="classify">
			<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>

		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		apiGetClassify
	} from "@/api/apis.js"
	import {
		onShareAppMessage,
		onShareTimeline
	} from '@dcloudio/uni-app'
	const classifyList = ref([])
	const getClassify = async () => {
		let res = await apiGetClassify({
			pageSize: 20,

		})

		classifyList.value = res.data

	}
	onShareAppMessage((e) => {
		return {
			title: "MyWallPaper",
			path: '/pages/classify/classify'
		}
	})
	//分享到朋友圈
	onShareTimeline((e) => {
		return {
			title: 'MyWallPaper',

		}
	})
	getClassify()
</script>

<style lang="scss" scoped>
	.classify {
		padding: 30rpx;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 15rpx;
	}
</style>