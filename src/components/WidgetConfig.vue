<template>
	<div class="form-config-container">
		<el-form label-position="top">
			<el-form-item label="标题"><el-input v-model="data.name"></el-input></el-form-item>
			<el-form-item label="数据绑定方法名"><el-input v-model="data.options.remoteFunc"></el-input></el-form-item>
			<el-form-item label="数据绑定参数"><el-input v-model="data.model"></el-input></el-form-item>
			<el-form-item label="校验">
				<div><el-checkbox v-model="data.options.required">必填</el-checkbox></div>
				<div><el-input v-model.lazy="data.options.pattern" placeholder="填写正则表达式"></el-input></div>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	props: ['data'],
	data() {
		return {
			validator: {
				required: null,
				pattern: null
			}
		};
	},
	methods: {
		generateRule() {
			this.data.rules = [];
			Object.keys(this.validator).forEach(key => {
				if (this.validator[key]) {
					this.data.rules.push(this.validator[key]);
				}
			});
		}
	},
	watch: {
		'data.options.required': function(val) {
			if (val) {
				this.validator.required = { required: true, message: `${this.data.name}必须填写` };
			} else {
				this.validator.required = null;
			}

			this.generateRule();
		},
		'data.options.pattern': function(val) {
			if (val) {
				this.validator.pattern = { pattern: val, message: this.data.name + '格式不匹配' };
			} else {
				this.validator.pattern = null;
			}

			this.generateRule();
		}
	}
};
</script>
