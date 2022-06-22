<template>
	<div class="notes">
		<ProseMirror
			v-if="initialDataInited"
			:initialData="initialData"
			@update="onUpdate" 
		/>
	</div>
</template>

<script lang="ts" setup>
import {
	ref,
	onMounted 
} from 'vue';

import ProseMirror from '@/modules/prose-mirror/ProseMirror.vue';

import { DataBaseService } from '@/services/data-base/DataBase.service';

const initialData = ref();
const initialDataInited = ref(false);

const onUpdate = async (json: any) => {
	const dataBaseNotes = await DataBaseService.getDataBase('notes', 1);
	const transaction = dataBaseNotes.transaction('notes', 'readwrite');
	const store = transaction.objectStore('notes');

	store.put({
		id: 1,
		note: json,
	});
};

onMounted(async () => {
	const dataBaseNotes = await DataBaseService.getDataBase('notes', 1);
	const transaction = dataBaseNotes.transaction('notes');
	const store = transaction.objectStore('notes');

	const request = await store.get(1);
	request.onsuccess = () => {
		initialData.value = request.result;
		initialDataInited.value = true;
	};
});
</script>

<style lang="sass" scoped>
.notes
	box-sizing: border-box
	display: grid
	padding: 10px 10px 46px 10px
	width: 100%
	overflow: hidden
</style>
