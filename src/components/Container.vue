<template>
	<el-container class="fm-container">
		<el-aside width="300px" class="fm-left">
			<draggable
				class="list-group"
				tag="ul"
				v-model="componentList"
				v-bind="{
					animation: 200,
					group: { name: 'people', pull: 'clone', put: false },
					disabled: false,
					ghostClass: 'ghost'
				}"
			>
				<li class="list-group-item" v-for="element in componentList" :key="element.type">{{ element.name }}</li>
			</draggable>
		</el-aside>
		<el-main class="fm-main">
			<!--添加一个按钮区域到设计器头部-->
			<div style="border-bottom: 1px solid #ccc; padding: 5px;"><el-button size="small" @click="handlePreview">预览</el-button></div>
			<widget-form :data.sync="widgetList" :config="formConfig" :select.sync="widgetSelect"></widget-form>
		</el-main>
		<el-aside width="300px" class="fm-right">
			<el-tabs v-model="activeName">
				<el-tab-pane label="字段配置" name="widget"><widget-config :data="widgetSelect" v-if="widgetSelect"></widget-config></el-tab-pane>
				<el-tab-pane label="表单配置" name="form"><form-config :data="formConfig"></form-config></el-tab-pane>
			</el-tabs>
		</el-aside>

		<el-dialog title="表单渲染" :visible.sync="dialogVisible" width="1000px">
			<generate-form v-if="dialogVisible" :data="configData" :remote="remoteFuncs"></generate-form>
		</el-dialog>
	</el-container>
</template>

<script>
import Draggable from 'vuedraggable';
import WidgetForm from '@/components/WidgetForm';
import FormConfig from '@/components/FormConfig';
import WidgetConfig from '@/components/WidgetConfig';
import GenerateForm from '@/components/GenerateForm';

export default {
	components: {
		Draggable,
		WidgetForm,
		FormConfig,
		WidgetConfig,
		GenerateForm
	},
	data() {
		return {
			componentList: [
				{
					type: 'input',
					name: '单行文本',
					options: {
						width: '100%',
						defaultValue: '',
						placeholder: '',
						required: false
					}
				},
				{
					type: 'select',
					name: '下拉选择框',
					options: {
						defaultValue: '',
						placeholder: '',
						required: false,
						remoteOptions: [], // 用于绑定后端返回的数据
						remoteFunc: '' // 设计器获取后端数据方法，下面配置时详细介绍
					}
				}
			],
			widgetList: [],
			formConfig: {
				labelWidth: 100,
				labelPosition: 'top',
				size: 'small'
			},
			widgetSelect: null,
			activeName: 'widget',
			dialogVisible: false,
			configData: {},
			remoteFuncs: {
				func_test(resolve) {
					// 模拟异步请求
					setTimeout(() => {
						const data = [{ value: 'value1', label: '选项1' }, { value: 'value2', label: '选项2' }, { value: 'value3', label: '选项3' }];

						// 将数据添加到回调函数中，在异步返回时进行赋值操作
						resolve(data);
					}, 500);
				}
			}
		};
	},
	methods: {
		handlePreview() {
			// 预览方法，获取表单设计器配置信息
			const config = {
				list: [...this.widgetList],
				config: { ...this.formConfig }
			};
			console.log(config);
			this.configData = config;

			this.dialogVisible = true;
		}
	}
};
</script>

<style lang="scss">
html,
body,
#app {
	height: 100%;
	margin: 0;
	padding: 0;
}
ul,
li {
	margin: 0;
	padding: 0;
	list-style: none;
}
.fm-container {
	height: 100%;
	border: 1px solid #ccc;

	.fm-main {
		padding: 0;
	}

	.fm-left {
		border-right: 1px solid #ccc;
	}
	.fm-right {
		border-left: 1px solid #ccc;
	}
}

.ghost {
	opacity: 0.5;
	background: #c8ebfb;
}
.list-group {
	min-height: 20px;
	list-style: none;
}
.list-group-item {
	cursor: move;
	height: 30px;
	line-height: 30px;
	border: 1px solid #ccc;
}

.list-form-item {
	border: 1px dashed blue;
	padding: 5px 30px 5px 5px;

	&.el-form-item {
		margin: 2px;
	}
}
</style>
