<template>
	<div class="headers">
		<div class="zhan"><i v-if="back" @click="$router.go(-1)" class="iconfont icon-fanhui"></i></div>
		<div class="title">
			{{title}}
		</div>
		<div class="zhan">

		</div>
	</div>
</template>

<script>
export default {
	name:'headers',
	props:{
		title:String,
		back: Boolean
	}
}
</script>

<style scoped>
	.headers{
		height: 45px;
		width: 100%;
		background: #42b983;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 20px;
		/* font-weight: bold; */
		position: fixed;
		top:0;
		left: 0;
		z-index: 999;
	}
	.title{
		flex:1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.zhan{
		height: 45px;
		width: 35px;
		text-align: center;
		line-height: 45px;
	}
</style>