<template>
    <div class="map-container" id="mapContainer"></div>
</template>
<script>
const { AMap } = window
const MARKER_SIZE_SMALL = new AMap.Size(30, 30) // 原始图标大小
const MARKER_SIZE_LARGE = new AMap.Size(40, 40) // 放大图标大小
const MARKER_PIXEL_SMALL = new AMap.Pixel(5, 5) // 原始图标位置
const MARKER_PIXEL_LARGE = new AMap.Pixel(10, 15) // 放大图标位置
// 标记物样式的数组 (包含原始样式和放大的样式)
const MARKER_STYLE = [
    // EMS
    {
        url: require('../assets/icon_1.png'),
        size: MARKER_SIZE_SMALL,
        anchor: MARKER_PIXEL_SMALL
    },
    // 快递柜
    {
        url: require('../assets/icon_2.png'),
        size: MARKER_SIZE_SMALL,
        anchor: MARKER_PIXEL_SMALL
    },
    // 菜鸟
    {
        url: require('../assets/icon_3.png'),
        size: MARKER_SIZE_SMALL,
        anchor: MARKER_PIXEL_SMALL
    },
    // 合作网点
    {
        url: require('../assets/icon_4.png'),
        size: MARKER_SIZE_SMALL,
        anchor: MARKER_PIXEL_SMALL
    },
    // EMS
    {
        url: require('../assets/icon_1.png'),
        size: MARKER_SIZE_LARGE,
        anchor: MARKER_PIXEL_LARGE
    },
    // 快递柜
    {
        url: require('../assets/icon_2.png'),
        size: MARKER_SIZE_LARGE,
        anchor: MARKER_PIXEL_LARGE
    },
    // 菜鸟
    {
        url: require('../assets/icon_3.png'),
        size: MARKER_SIZE_LARGE,
        anchor: MARKER_PIXEL_LARGE
    },
    // 合作网点
    {
        url: require('../assets/icon_4.png'),
        size: MARKER_SIZE_LARGE,
        anchor: MARKER_PIXEL_LARGE
    }
]
const MASS_MARKERS = new AMap.MassMarks(
    null, {
        zIndex: 100, 	// 海量点图层叠加的顺序
        zooms: [3, 19],	 // 在指定地图缩放级别范围内展示海量点图层
        style: MARKER_STYLE 	//多种样式对象的数组
    }
)
let map = null // 地图对象
export default {
    props: {
        // 当前中心点的索引
        value: {
            type: [String, Number],
            default: 0
        },
        data: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {

        }
    },
    computed: {
        // 当前中心网点
        currentCenterPoint() {
            return this.data[this.value]
        }
    },
    mounted() {
        map = new AMap.Map('mapContainer', {
                center: [this.currentCenterPoint.longitude, this.currentCenterPoint.latitude],
                zoom: 15,
                resizeEnable: true,
                // mapStyle: 'amap://styles/macaron' // 马卡龙风格
        });
        this.renderMarkers()
    },
    methods: {
        // 渲染所有的标记点
        renderMarkers() {
            MASS_MARKERS.setData(this.data.map((item, index) => {
                return {
                    lnglat: [item.longitude, item.latitude],
                    style: item.type - 1,
                    id: index,
                    name: 'suzhou'
                }
            }))
            MASS_MARKERS.setMap(map)
            // 添加点击事件
            MASS_MARKERS.on('click', (e) => {
                console.log(e)
                const { lng, lat } = e.data.lnglat
                const index = e.data.id
                this.handleAfterTouchMarker([lng, lat], index)
            })
        },
        handleAfterTouchMarker(lnglat, index) {
            const L = MARKER_STYLE.length
            const M = L / 2
            const T = M - 1
            // 重新设置地图中心点
            map.setCenter(lnglat)
            // 设置点击标记点的大小
            const data = MASS_MARKERS.getData()
            data.forEach(item => {
                item.style = item.style > T ? item.style - M : item.style
            })
            data[index].style += M
            MASS_MARKERS.clear()
            MASS_MARKERS.setData(data)
            this.$emit('input', index)
        }
    }
}
</script>
<style lang="less" scoped>
.map-container{
    width: 100vw;
    height: 100%;
}
</style>