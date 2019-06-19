<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-copy"></i>
          BlogDetail-{{id}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <h1>{{detailData.title}}</h1>
      <p>{{detailData.content}}</p>
    </div>
  </div>
</template>

<script>
import { getBlogDetail } from "../../api/blog";
import { ERR_OK } from "../../api/config";

export default {
  data: function() {
    return {
      id: "",
      detailData: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    // console.log(this.id);
    this._getBlogDetail(this.id);
  },
  methods: {
    _getBlogDetail(id) {
      getBlogDetail(id).then(res => {
        this.detailData = res.data;
      });
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin: 30px 0;
}
p {
  line-height: 30px;
  margin-bottom: 10px;
  text-indent: 2em;
}
.logout {
  color: #409eff;
}
</style>