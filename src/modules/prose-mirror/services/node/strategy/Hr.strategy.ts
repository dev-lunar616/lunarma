import { NodeRange } from 'prosemirror-model';

import { BaseStrategy } from '@/modules/prose-mirror/services/node/strategy/Base.strategy';

import type { EditorView } from 'prosemirror-view';
import type { NodeStrategy } from '@/modules/prose-mirror/services/node/strategy/index.interfaces';

class HrStrategy extends BaseStrategy implements NodeStrategy {
	public isEnabled() {
		return (view: EditorView): boolean => {
			const { state } = view;
			const resolvedFrom = state.doc.resolve(state.selection.$from.pos);
			const resolvedTo = state.doc.resolve(state.selection.$to.pos);
			const range = new NodeRange(
				resolvedFrom, 
				resolvedTo, 
				resolvedFrom.depth,
			);

			return range.$from.pos === range.$to.pos;
		};
	}
}

export {
	HrStrategy,
}
