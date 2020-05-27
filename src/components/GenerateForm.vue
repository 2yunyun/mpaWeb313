<template>
  <el-form ref="generateForm" 
    :size="data.config.size"
    :model="models"
    :rules="rules"
    :label-position="data.config.labelPosition" :label-width="data.config.labelWidth + 'px'">
      <el-form-item :label="item.name" v-for="item in data.list" :key="item.key" :prop="item.model">
        <el-input 
          v-if="item.type == 'input'"
          :type="item.options.dataType"
          :placeholder="item.options.placeholder"
          :style="{width: item.options.width}"
          v-model="models[item.model]"
        ></el-input>

        <!--渲染下拉选择框-->
        <el-select
          v-if="item.type == 'select'"
          :placeholder="item.options.placeholder"
          v-model="models[item.model]"
        >
          <el-option v-for="option in item.options.remoteOptions" :key="option.value" :value="option.value" :label="option.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSubmit">提交</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ['data', 'remote'],
  data () {
    return {
      models: {},
      rules: {}
    }
  },
  created () {
    this.generateModle(this.data.list)
  },
  mounted () {
    // 加载动态数据
    for (let i = 0; i < this.data.list.length; i++) {
      const curItem = this.data.list[i]

      curItem.options.remoteOptions = []
      if (curItem.options.remoteFunc && this.remote[curItem.options.remoteFunc]) {
        this.remote[curItem.options.remoteFunc]((data) => {
          curItem.options.remoteOptions = data.map(item => {
            return {
              value: item.value,
              label: item.label
            }
          })
        })
      }
    }
  },
  methods: {
    generateModle (list) {
      for (let i = 0; i < list.length; i++) {
        // 使用配置的默认值初始化表单 model 对象
        this.$set(this.models, list[i].model, list[i].options.defaultValue)

        // 生成rules
        this.rules[list[i].model] = [...list[i].rules.map(item => {
          if (item.pattern) {
            return {...item, pattern: eval(item.pattern)}
          } else {
            return {...item}
          }
        })]
      }
    },

    handleSubmit () {
      this.$refs.generateForm.validate(valid => {
        if (valid) {
          // 验证成功
          alert(JSON.stringify(this.models))
        } else {
          // 验证失败
        }
      })
    }
  },
  watch: {
    // 监听data变化的时候重新设置models值
    data: {
      deep: true,
      handler (val) {
        this.generateModle(val.list)
      }
    }
  }
}
</script>
