<template>
    <ul>
        <li
            v-for="item of data"
            :key="item.id"
        ></li>
    </ul>
</template>
<script>
export default {
    props: {
        direction: {
            type: String,
            default: 'vertical' // horizontal or vertical
        },
        data: {
            type: Array,
            default: () => {}
        }
    }
}
</script>
<style lang="less" scoped>

</style>