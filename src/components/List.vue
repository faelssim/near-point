<template>
    <div :class="`list-container list-container-${direction}`">
        <ul>
            <li
                class="ie-box flex-column"
                v-for="(item, index) of data"
                :key="item.id"
                :ref="`item_${index}`"
            >
                <div class="flex-row list-item-header">
                    <div :style="{'background': item_type[item.type].color}">{{ item_type[item.type].name }}</div>
                    <div>
                        <b>{{ item.packageName }}</b>
                    </div>
                </div?>
                <div class="item-text-gray item-text-2 mt-10">{{ item.packageDeviceAddress }}</div>
                <div class="mt-10">
                    <span>营业时间：</span>
                    <span class="item-text-gray">{{ item.contactMobile }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
const ITEM_STYLE = {
    1: {
        name: 'EMS',
        color: '#07dd07'
    },
    2: {
        name: '快递柜',
        color: '#ff6100'
    },
    3: {
        name: '菜鸟驿站',
        color: '#1c69fb'
    },
    4: {
        name: '合作网点',
        color: '#0cd9f1'
    }
}
export default {
    props: {
        direction: {
            type: String,
            default: 'vertical' // horizontal or vertical
        },
        data: {
            type: Array,
            default: () => {}
        },
        value: {
            type: [String, Number],
            default: 0
        }
    },
    watch: {
        value(nv) {
            const ref = this.$refs[`item_${nv}`]
            if (ref && ref[0]) {
                ref[0].scrollIntoView({
                    behavior: this.data.length < 20 ? 'smooth' : 'auto'
                })
            }
        }
    },
    data() {
        return {
            item_type: ITEM_STYLE
        }
    }
}
</script>
<style lang="less" scoped>
.list-container{
    background: transparent;
    li{
        padding: 1.3rem 1rem;
        border-radius: 0.5rem;
        position: relative;
        background: #fff;
        align-items: flex-start;
        >div{
            width: 100%;
        }
        .list-item-header{
            justify-content: flex-start;
            div:nth-child(1){
                padding: 0.2rem 0.5rem;
                border-radius: 0.3rem;
                font-size: 1.2rem;
                color: #fff;
                flex: 0 0 auto;
            }
            div:nth-child(2){
                flex: 1 1 auto;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-left: 1rem;
            }
            b{
                font-size: 1.4rem;
                font-weight: bold;
            }
        }
        .item-text-gray{
            font-size: 1.2rem;
            color: #938e8e;
        }
        .item-text-2{
            // flex: 1 0 auto;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .mt-10{
            margin-top: 1rem;
        }
    }
}
.list-container-vertical{
    height: 0;
    flex: 1 0 auto;
    overflow: hidden auto;
    ul{
        width: 90vw;
        margin: 0 auto;
    }
    li{
        margin-top: 1rem;
    }
    li:first-child{
        margin-top: 0;
    }
}
.list-container-horizontal{
    height: auto;
    ul{
        width: 100vw;
        overflow-y: hidden;
        white-space: nowrap;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        li{
            display: inline-flex;
            width: 90vw;
            margin-left: 2.5vw;
            scroll-snap-align: center;
        }
        li:first-child{
            margin-left: 5vw;
        }
        li:last-child{
            margin-right: 5vw;
        }
    }
}
</style>