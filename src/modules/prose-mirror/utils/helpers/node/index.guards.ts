import type { FindedNodeData } from '@/modules/prose-mirror/utils/helpers/node/index.interfaces';

const isFindedNode = (node: any): node is FindedNodeData => {
	return 'node' in node && 'nodeSize' in node.node;
};

export {
	isFindedNode,
}
