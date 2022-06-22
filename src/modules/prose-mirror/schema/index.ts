import { Schema } from 'prosemirror-model';

import nodes from '@/modules/prose-mirror/nodes/index';
import marks from '@/modules/prose-mirror/marks/index';

import type {
	NodeSpec,
	MarkSpec,
} from 'prosemirror-model';

const schema = new Schema({
	nodes: nodes.reduce((result: Record<string, NodeSpec>, node: NodeSpec) => {
		if (node.type && node.name) {
			result[node.name] = node.type;
		}
		
		return result;
	}, {} as Record<string, NodeSpec>),
	
	marks: marks.reduce((result: Record<string, MarkSpec>, mark: MarkSpec) => {
		if (mark.type && mark.name) {
			result[mark.name] = mark.type;
		}

		return result;
	}, {} as Record<string, MarkSpec>),
});

const getSchemaNodesNames = (): object => {
	return nodes.reduce((result: Record<string, NodeSpec>, node: NodeSpec) => {
		if (node.name) {
			result[node.name] = node.name;
		}
		
		return result;
	}, {});
};

const getSchemaMarksNames = () => {
	return marks.map((mark: MarkSpec) => mark.name);
};

export {
	getSchemaNodesNames,
	getSchemaMarksNames,
}

export default schema;
