<template>
  <div class="main-wrapper">
    <el-button type="primary" @click="dialogVisible = true">添加</el-button>
    <full-calendar :events="monthData" class="test-fc" first-day='1' locale="zh" @changeMonth="changeMonth" @eventClick="eventClick" @dayClick="dayClick" @moreClick="moreClick">
    </full-calendar>
    <el-dialog title="添加事件" :visible.sync="dialogVisible" width="30%">
      <div class="input-group">
        <el-input class="input-field" placeholder="请输入内容" v-model="event.title" clearable></el-input>
        <el-date-picker class="input-field" v-model="daterange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FullCalendar from "./assets/vue-fullcalendar/fullCalendar.vue";
export default {
    data() {
        return {
            dialogVisible: false,
            daterange: "",
            event: {
                title: "",
                start: "",
                end: "",
                cssClass: ""
            },
            monthData: [
                {
                    title: "首页开发", // 事件内容
                    start: "2019-11-11", // 事件开始时间
                    end: "2019-11-30", // 事件结束时间
                    cssClass: "red" // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
                },
                {
                    title: "倾诉页开发",
                    start: "2019-11-25",
                    end: "2019-11-30",
                    cssClass: "blue"
                },
                {
                    title: "关于我们开发",
                    start: "2019-11-09",
                    end: "2019-11-11",
                    cssClass: "blue"
                },
                {
                    title: "后台开发",
                    start: "2019-11-20",
                    end: "2019-11-30",
                    cssClass: "red"
                }
            ]
        };
    },
    methods: {
        handleSubmit() {
            console.log("event", this.event);
            console.log("daterange", this.daterange);
            this.dialogVisible = false;
        },
        // 选择月份
        changeMonth(start, end, current) {
            console.log("changeMonth", start, end, current);
        },
        // 点击事件
        eventClick(event, jsEvent, pos) {
            console.log("eventClick", event, jsEvent, pos);
        },
        // 点击当天
        dayClick(day, jsEvent) {
            console.log("dayClick", day, jsEvent);
        },
        // 查看更多
        moreClick(day, events, jsEvent) {
            console.log("moreCLick", day, events, jsEvent);
        }
    },
    components: {
        "full-calendar": FullCalendar
    }
};
</script>
<style>
.main-wrapper {
    max-width: 960px;
    width: 960px;
    margin: 0 auto;
}
.input-group {
  width: 70%;
}
.input-field {
  width: 330px;
  max-width:330px;
  margin-bottom: 20px;
}
.red {
    background-color: pink !important;
    border: 1px solid #ccc;
}
.blue {
    background: blue;
}
</style>