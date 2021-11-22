<!--
 * @Author: wangkun
 * @Date: 2021-11-22 13:24:47
 * @LastEditTime: 2021-11-22 13:54:47
 * @LastEditors: wangkun
 * @Description: 
-->
<template>
    <div class="tool-tip">
        <div class="flex-column" @click="handleEmitEvents('location')">
            <img src="../assets/img_1.png" />
            <!-- <span>定位</span> -->
        </div>
        <div class="flex-column" @click="handleEmitEvents('list')">
            <img src="../assets/img_2.png" />
            <span>列表</span>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        handleEmitEvents(eventName) {
            this.$emit('touch-tool-tip', eventName)
        }
    }
}
</script>
<style lang="less" scoped>
.tool-tip{
    width: auto;
    height: auto;
    background: #fff;
    box-shadow: 0 0 1rem 0 #f2f2f2;
    border-radius: 0.3rem;
    margin-bottom: 1rem;
    position: absolute;
    right: 5vw;
    top: 0;
    transform: translateY(calc(-100% - 2rem));
    overflow: hidden;
    >div{
        padding: 1rem;
        font-size: 1.2rem;
        img{
            width: 1.8rem;
            height: 1.8rem;
        }
        span{
            margin-top: 0.5rem;
        }
        &:active{
            background: #d9d9d9;
        }
    }
    >div + div{
        border-top: 0.1rem solid #d9d9d9;
    }
}
</style>