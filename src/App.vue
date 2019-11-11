<template>
  <div class="main-wrapper">
    <div class="add">
      <el-button @click="dialogVisible = true" plain size="small">新 增</el-button>
    </div>
    <full-calendar
      :events="monthData"
      class="test-fc"
      first-day="1"
      locale="zh"
      @changeMonth="changeMonth"
      @eventClick="eventClick"
      @dayClick="dayClick"
      @moreClick="moreClick"
    ></full-calendar>
    <el-dialog title="添加事件" :visible.sync="dialogVisible" width="30%">
      <div class="input-group">
        <el-input class="input-field" placeholder="请输入内容" v-model="event.title" clearable></el-input>
        <el-date-picker
          class="input-field"
          v-model="daterange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-select v-model="event.cssClass" placeholder="请选择">
          <el-option
            v-for="item in itemType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
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
      itemType: [
        {
          value: "product",
          label: "产品"
        },
        {
          value: "development",
          label: "开发"
        },
        {
          value: "operation",
          label: "运营"
        },
        {
          value: "others",
          label: "其他"
        }
      ],
      daterange: "",
      event: {
        title: "",
        start: "",
        end: "",
        cssClass: ""
      },
      monthData: []
    };
  },
  methods: {
    async handleSubmit() {
      const [start, end] = this.daterange;
      const Events = AV.Object.extend("events");
      const event = new Events();
      event.set("title", this.event.title);
      event.set("start", start);
      event.set("end", end);
      event.set("cssClass", this.event.cssClass);
      this.dialogVisible = false;
      try {
        const newEvent = await event.save();
        if (newEvent) {
          this.monthData.push(newEvent.attributes);
          this.$message({
            message: "添加成功",
            type: "success"
          });
        }
      } catch (e) {
        this.$message({
          message: "好像出了点问题,添加失败啦!",
          type: "error"
        });
        console.log(error);
      }
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
  async mounted() {
    let query = new AV.Query("events");
    query.descending("createdAt");

    const events = await query.find();
    events.map(event => {
      this.monthData.push(event.attributes);
    });
  },
  components: {
    "full-calendar": FullCalendar
  }
};
</script>
<style>
.main-wrapper {
  max-width: 1000px;
  width: 1000px;
  margin: 0 auto;
}
.add {
  display: flex;
  justify-content: flex-end;
  width: 95%;
  margin-top: 25px;
}
.input-group {
  width: 70%;
}
.input-field {
  width: 330px;
  max-width: 330px;
  margin-bottom: 20px;
}
.product {
  background-color: #f9e3fc !important;
}
.development {
  background-color: #d7f4d7 !important;
}
.operation {
  background-color: #dcf2ff !important;
}
.others {
  background-color: #fcdccc !important;
}
</style>