<template>
  <el-table
    v-if="tableData.length > 0"
    max-height="450"
    border
    :data="tableData"
    style="width:100%"
  >
    <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
    <el-table-column align="center" prop="date" label="创建时间" width="200"></el-table-column>
    <el-table-column align="center" prop="type" label="收支类型" width="100"></el-table-column>
    <el-table-column align="center" prop="describe" label="收支描述" width="150"></el-table-column>
    <el-table-column align="center" prop="income" label="收入" width="80"></el-table-column>
    <el-table-column align="center" prop="expend" label="支出" width="80"></el-table-column>
    <el-table-column align="center" prop="cash" label="账户余额" width="80"></el-table-column>
    <el-table-column align="center" prop="remark" label="备注" width="180"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'fund-list',
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      this.$axios.get('/api/profiles')
        .then(res => {
          this.tableData = res.data;
        })
        .catch(err => {
          throw err;
        })
    }
  }
}
</script>

<style scoped>
</style>
