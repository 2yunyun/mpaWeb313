<template>
	<el-form :label-width="config.labelWidth + 'px'" :label-position="config.labelPosition" :size="config.size">
		<draggable
			class="list-group"
			tag="ul"
			v-model="widgetList"
			v-bind="{
				animation: 200,
				group: 'people',
				disabled: false,
				ghostClass: 'ghost'
			}"
			@add="onAdd"
		>
			<el-form-item
				v-for="(element, index) in widgetList"
				:key="element.key"
				v-if="element.key"
				:label="element.name"
				class="list-form-item"
				@click.native.stop="handleWidgetSelect(element)"
				:style="{ background: selectWidget && selectWidget.key == element.key ? '#ccc' : '' }"
			>
				<template v-if="element.type == 'input'">
					<el-input :style="{ width: element.options.width }" :placeholder="element.options.placeholder" v-model="element.options.defaultValue"></el-input>
				</template>

				<template v-if="element.type == 'select'">
					<el-select :placeholder="element.options.placeholder" v-model="element.options.defaultValue"></el-select>
				</template>

				<el-button type="text" class="delete-action" @click="onDelete(index)">删除</el-button>
			</el-form-item>
		</draggable>
	</el-form>
</template>

<script>
import Draggable from 'vuedraggable';
export default {
	components: {
		Draggable
	},
	props: ['data', 'config', 'select'],
	data() {
		return {
			widgetList: this.data,
			selectWidget: this.select // 定义当前选中的元素
		};
	},
	methods: {
		onAdd(evt) {
			const newIndex = evt.newIndex;
			const key = new Date().getTime();

			this.$set(this.widgetList, newIndex, {
				...this.widgetList[newIndex],
				options: {
					...this.widgetList[newIndex].options
				},
				key,
				model: this.widgetList[newIndex].type + '_' + key
			});
		},

		onDelete(index) {
			this.widgetList.splice(index, 1);
		},

		// 选中单个元素触发的事件
		handleWidgetSelect(item) {
			this.selectWidget = item;
		}
	},
	watch: {
		// 添加对 select、 slectWidget 的监听
		select(val) {
			this.selectWidget = val;
		},
		selectWidget: {
			handler(val) {
				this.$emit('update:select', val);
			},
			deep: true // 为了发现对象内部值的变化
		},
		// 表单字段更新后同步到父组件
		widgetList(val) {
			this.$emit('update:data', val);
		}
	}
};
</script>

<style lang="scss">
.delete-action {
	position: absolute;
	bottom: 5px;
	right: -30px;
}
</style>
