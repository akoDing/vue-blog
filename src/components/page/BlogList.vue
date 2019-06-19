<template>
  <div
    class="table"
    v-loading.fullscreen.lock="loading"
    element-loading-text="Loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> BlogList
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-select v-model="select_author" placeholder="筛选作者" class="handle-select mr10">
          <el-option key="1" label="全部" value></el-option>
          <el-option key="2" label="lisi" value="lisi"></el-option>
          <el-option key="3" label="zhangsan" value="zhangsan"></el-option>
          <el-option key="4" label="xdd" value="xdd"></el-option>
        </el-select>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="date" label="创建日期" sortable width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ dateFormat(scope.row.createtime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者" width="180"></el-table-column>
        <el-table-column prop="title" label="博客标题" width="280"></el-table-column>
        <el-table-column prop="content" label="博客内容"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-lx-search"
              @click="handleDetail(scope.$index, scope.row)"
            >查看</el-button>
            <el-button
              type="text"
              icon="el-icon-lx-edit"
              class="orange"
              @click="handleUpdate(scope.$index, scope.row)"
            >更新</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 编辑弹出框 -->
    <el-dialog title="更新博客" :visible.sync="updateVisible" width="30%">
      <el-form ref="updateForm" :model="updateForm" label-width="50px">
        <el-form-item label="作者">
          <el-input disabled v-model="updateForm.author"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="updateForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" rows="5" v-model="updateForm.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import { getBlogList, getBlogUpdate } from "../../api/blog";
import { ERR_OK } from "../../api/config";

export default {
  name: "bloglist",
  data() {
    return {
      select_author: "",
      select_word: "",
      cur_page: 1,
      loading: "",
      updateVisible: false,
      updateForm: {
        id: "",
        author: "",
        title: "",
        content: ""
      },
      tableData: [
        /* {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        } */
      ]
    };
  },
  created() {
    this._getBlogList(this.cur_page, this.select_author, this.select_word);
  },
  methods: {
    //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
    dateFormat(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },
    handleDetail(index, row) {
      // console.log(index, row.id);
      this.$router.push({
        path: `/blogDetail/${row.id}`
      });
    },
    handleUpdate(index, row) {
      const item = row;
      this.updateForm = {
        id: item.id,
        author: item.author,
        title: item.title,
        content: item.content
      };
      this.updateVisible = true;
    },
    search() {
      this._getBlogList(this.cur_page, this.select_author, this.select_word);
    },
    updateRow() {
      // console.log(this.updateForm);
      this._getBlogUpdate(
        this.updateForm.id,
        this.updateForm.title,
        this.updateForm.content
      );
      this.updateVisible = false;
    },
    _getBlogList(page, author, keyword) {
      this.loading = true;
      getBlogList(page, author, keyword).then(res => {
        if (res.errno === ERR_OK) {
          res.data.forEach(el => {
            el.createtime = new Date(el.createtime);
          });
          setTimeout(() => {
            this.loading = false;
            this.tableData = res.data;
          }, 1000);
        }
      });
    },
    _getBlogUpdate(id, title, content) {
      getBlogUpdate(id, title, content).then(res => {
        if (res.errno === ERR_OK) {
          // console.log(res);
          this._getBlogList(this.cur_page, this.select_author, this.select_word);
        }
      });
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.mr10 {
  margin-right: 10px;
}

.orange {
  color: #ffa700;
}
</style>
