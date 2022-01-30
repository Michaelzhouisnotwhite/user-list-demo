<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="dialogVisible = true"
      >添加新用户
    </el-button>
    <el-table :data="userList" stripe border>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="头衔" prop="position"></el-table-column>
      <!-- <el-table-column label="创建时间">
        <template v-slot:default="scope">
          {{ scope.row.addtime | dateFormat }}
        </template>
      </el-table-column> -->
      <el-table-column label="操作">
        <template #default="{ row }">
          <div>
            <router-link :to="'/users/' + row.id">详情</router-link>&nbsp;
            <a href="#" @click.prevent="onRemove(row.id)">删除</a>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="添加新用户"
      :visible.sync="dialogVisible"
      width="50%"
      @close="onDlgClose"
    >
      <!-- 添加用户的表单 -->
      <el-form :model="form" label-width="80px" :rules="rules" ref="myaddForm">
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model.trim="form.name"></el-input>
        </el-form-item>
        <el-form-item label="用户年龄" prop="age">
          <el-input v-model.trim.number="form.age"></el-input>
        </el-form-item>
        <el-form-item label="用户头衔" prop="position">
          <el-input v-model.trim="form.position"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onAddUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserList",
  data() {
    let checkAge = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        return callback(new Error("请填写整数！"));
      }
      if (value > 100 || value < 1) {
        return callback(new Error("年龄必须在 1 到 100 之间！"));
      }
      callback();
    };
    return {
      userList: [],
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        position: "",
      },
      // 表单验证规则
      rules: {
        name: [
          { required: true, message: "姓名是必填项", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符之间",
            trigger: "blur",
          },
        ],
        age: [
          { required: true, message: "年龄是必填项", trigger: "blur" },
          { validator: checkAge, trigger: "blur" },
        ],
        position: [
          { required: true, message: "头衔是必填项", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    onAddUser() {
      this.$refs.myaddForm.validate(async (valid) => {
        if (!valid) {
          return;
        }
        // 执行添加的业务处理
        // eslint-disable-next-line no-unused-vars
        const { data: res } = await this.$http.post("/users-demo", this.form);
        this.$message({
          showClose: true,
          message: "添加成功",
          type: "success",
        });
        this.dialogVisible = false;
        await this.getUserList();
      });
    },
    onDlgClose() {
      // 拿到form组件的引用，调用resetFields()
      this.$refs.myaddForm.resetFields();
    },
    async getUserList() {
      const { data: res } = await this.$http.get("/users-demo");
      // if (res.status !== 0) return console.log(res.message);
      this.userList = res;
    },
    async onRemove(id) {
      const confirmRes = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (confirmRes !== "confirm") {
        return this.$message.info("取消了删除");
      }
      await this.$http.delete("/users-demo/" + id);
      this.$message.success("删除成功");
      await this.getUserList();
    },
  },
};
</script>

<style lang="less" scoped>
.el-button {
  margin-bottom: 12px;
}

.el-form-item {
  margin-bottom: 25px;
}
</style>
