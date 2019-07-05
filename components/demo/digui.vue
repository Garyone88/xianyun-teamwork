<template>
    <div>
    <div v-for="(item, index) in data" :key="index">
        {{item.type}}
        <digui :data="item.children" v-if="item.children"></digui>
    </div>
    </div>
</template>

<script>
export default {
    // 递归需要加上name属性
    name:"digui",
    props:{
        data:{
            type:Array,
            default:[]
        }
    }
}
</script>

<style>

</style>
