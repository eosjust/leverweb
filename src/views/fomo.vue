<template>
    <Row>
        <Row>
        </Row>
        <Row>
            <Col span="12">F3D</Col>
            <Col span="12">F3d</Col>
        </Row>
    </Row>

</template>

<script>
    // @ is an alias to /src
    export default {
        name: 'fomo',
        components: {},
        data() {
            return {
                bt1: 'yes',
                buyAmount: '100',
                sellAmount: '100',
            }
        },
        props: {
            msg: 'yes'
        },
        created() {
            console.log("created");
        },
        mounted() {
            console.log("mounted");
        },
        destroyed() {
            console.log("destroyed");
        },
        methods: {
            btnClick() {
                console.log("btnClick");
            }
        }

    }
</script>


<style scoped>


    .count_down_text {
        font-size: 100px;
        line-height: 100px;
        color: #fbc80d;
        text-shadow: 0 0 6px #ff2d2d;
        font-weight: 600;
        font-family: Mercado Sans, PingFang SC, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
    }

    .info_box_out {
        height: 110px;
        padding: 10px;
        background-color: #171d24;
    }

    .info_box_content {
        width: 100%;
        height: 100%;
        background-color: #0e131c;
    }
</style>