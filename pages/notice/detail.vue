<template>
	<view class="noticeLayout">
		<view class="title">
			<view class="tag" v-if="detail.select">
				<uni-tag inverted text="置顶" type="error" />
			</view>
			<view class="font">{{myTitle}}</view>
		</view>

		<view class="info">
			<view class="item">忧郁的大白菜</view>
			<view class="item">
				<uni-dateformat :date="new Date()" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
			</view>
		</view>

		<!-- 富文本渲染 -->
		<view class="content">
			<!-- <rich-text :nodes="detail.content"></rich-text> -->
			<mp-html :content="myContent" />
		</view>

		<view class="count">
			阅读 {{detail.view_count}}
		</view>
	</view>
</template>

<script setup>
	import {
		apiGetNoticeDetail
	} from '@/api/apis.js'
	import {
		ref
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	const detail = ref({})
	const myTitle = ref('欢迎关注我 持续学习小程序相关知识......')
	const myContent = ref(
		'<div><div><div><p><img src="https://i.ejiaimg.cn/94/2025/04/29/681088f7cb60b.jpg" style="max-width:100%;" contenteditable="false"/></p><p>扫码关注我，你将获得很多东西</p></div></div></div>'
	)
	const getNoticeDetail = () => {
		apiGetNoticeDetail({
			id: noticeId
		}).then(res => {

			detail.value = res.data
			console.log(res.data.content);

		})
	}
	let noticeId
	//接收ID
	onLoad((e) => {
		let {
			name
		} = e
		noticeId = e.id
		getNoticeDetail()
		uni.setNavigationBarTitle({
			title: name
		})
	})
</script>

<style lang="scss" scoped>
	.noticeLayout {
		padding: 30rpx;

		.title {
			font-size: 40rpx;
			color: #111;
			line-height: 1.6em;
			padding-bottom: 30rpx;
			display: flex;

			.tag {
				transform: scale(0.8);
				transform-origin: left center;
				flex-shrink: 0;
			}

			.font {
				padding-left: 6rpx;
			}
		}

		.info {
			display: flex;
			align-items: center;
			color: #999;
			font-size: 28rpx;

			.item {
				padding-right: 20rpx;
			}
		}

		.content {
			padding: 50rpx 0;
		}

		.count {
			color: #999;
			font-size: 28rpx;
		}
	}
</style>