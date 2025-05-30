<template>
	<view class="homeLayout pageBg">
		<custom-nav-bar title="推荐"></custom-nav-bar>
		<!-- 轮播图 -->
		<view class="banner">
			<swiper circular="true" indicator-color="rgba(255,255,255,0.5)" indicator-dots indicator-active-color="#fff"
				autoplay="true">
				<swiper-item v-for="item in bannerList" :key="item._id">
					<navigator v-if="item.target=='miniProgram'" :app-id="item.appid" :url="item.url" class="link"
						target="miniProgram">

						<image :src="item.picurl" mode="widthFix"></image>

					</navigator>

					<navigator v-else :url="`/pages/classlist/classlist?${item.url}`" class="link">
						<image :src="item.picurl" mode="widthFix"></image>

					</navigator>

				</swiper-item>

			</swiper>
		</view>
		<!-- 公告 -->
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20" color="$brand-theme-color"></uni-icons>
				<text class="text">
					公告
				</text>
			</view>
			<view class="center">
				<swiper vertical autoplay interval="1500" duration="300" circular="true">
					<swiper-item v-for="item in noticeList" :key="item._id">
						<!-- 传入页面ID给公告使用 -->
						<navigator :url="'/pages/notice/detail?id='+item._id">
							{{item.title}}
						</navigator>
					</swiper-item>
				</swiper>

			</view>
			<view class="right">
				<uni-icons type="right" size="16" color="#333"></uni-icons>
			</view>
		</view>

		<view class="select">
			<!-- 标题组件 会多次复用 -->
			<common-title>
				<template #name>
					每日推荐
				</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="18" color=$brand-theme-color></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd日">

							</uni-dateformat>
						</view>
					</view>

				</template>
			</common-title>

			<view class="content">
				<scroll-view scroll-x>
					<view class="box" v-for="item in randomList" @click="goPreview(item._id)" :key="item._id">

						<image :src="item.smallPicurl" mode="aspectFill"></image>


					</view>
				</scroll-view>
			</view>
		</view>
		<view class="theme">
			<common-title>
				<template #name>
					专题精选
				</template>
				<template #custom>
					<!-- tabBar的跳转要让open-type="reLaunch" -->
					<navigator url="/pages/classify/classify" class="more" open-type="reLaunch">More+</navigator>
				</template>
			</common-title>
			<view class="content">
				<!-- 接收item给组件 -->
				<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
				<theme-item :isMore="true"></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		apiGetBanner,
		apiGetDayRandom,
		apiGetNotice,
		apiGetClassify
	} from "@/api/apis.js"
	import {
		onShareAppMessage,
		onShareTimeline
	} from '@dcloudio/uni-app'
	const bannerList = ref([])
	const randomList = ref([])
	const noticeList = ref([])
	const classifyList = ref([])
	const getBanner = async () => {
		let res = await apiGetBanner()
		bannerList.value = res.data
	}
	const getDayRand = async () => {
		let res = await apiGetDayRandom()
		randomList.value = res.data
	}

	const getNotice = async () => {
		//需要传递参数select:true
		let res = await apiGetNotice({
			select: true
		})

		noticeList.value = res.data


	}

	const getClassify = async () => {
		let res = await apiGetClassify({
			select: true
		})
		console.log(res);
		classifyList.value = res.data
	}
	const goPreview = (id) => {
		uni.setStorageSync("storgClassList", randomList.value);
		uni.navigateTo({
			url: "/pages/preview/preview?id=" + id
		})
	}




	//分享给好友
	onShareAppMessage((e) => {
		return {
			title: "MyWallPaper",
			path: '/pages/index/index'
		}
	})
	//分享到朋友圈
	onShareTimeline((e) => {
		return {
			title: 'MyWallPaper',

		}
	})
	getBanner()
	getDayRand()
	getNotice()
	getClassify()
</script>

<style lang="scss" scoped>
	.homeLayout {
		.banner {
			width: 750rpx;
			padding: 30rpx 0;

			swiper {
				width: 750rpx;
				height: 340rpx;

				&-item {
					width: 100%;
					height: 100%;
					padding: 0 30rpx;

					.link {
						width: 100%;
						height: 100%;

						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
					}


				}
			}
		}

		.notice {
			width: 690rpx;
			height: 80rpx;
			line-height: 80rpx;
			background-color: #f9f9f9;
			margin: 0 auto;
			border-radius: 40rpx;
			display: flex;

			.left {
				width: 142rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				//设置图标颜色样式
				//小程序端不可行 可以用:deep(){}穿透到组件内部改变组件类名
				:deep() {
					.uni-icons {
						color: $brand-theme-color !important; //原颜色是行内样式 优先级比较高
					}
				}



				.text {
					color: $brand-theme-color;
					font-weight: 600;
					font-size: 28rpx;
				}
			}

			.right {
				width: 70rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.center {
				flex: 1;

				swiper {
					height: 100%;

					&-item {
						height: 100%;
						font-size: 30rpx;
						color: #666;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
		}

		.select {
			padding-top: 50rpx;

			.date {
				color: $brand-theme-color;
				display: flex;
				align-items: center;

				.text {
					margin-left: 5rpx;
				}
			}

			.content {
				width: 720rpx;
				margin-left: 30rpx;
				margin-top: 30rpx;

				scroll-view {
					white-space: nowrap;

					.box {
						width: 200rpx;
						height: 430rpx;
						display: inline-block;
						margin-right: 15rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 12rpx;
						}
					}

					.box:last-child {
						margin-right: 30rpx;
					}
				}
			}
		}

		.theme {
			padding: 50rpx 0;

			.more {
				font-size: 32rpx;
				color: #888;
			}

			.content {
				margin-top: 30rpx;
				padding: 0 30rpx;
				display: grid;
				gap: 15rpx;
				grid-template-columns: repeat(3, 1fr);
			}
		}
	}
</style>