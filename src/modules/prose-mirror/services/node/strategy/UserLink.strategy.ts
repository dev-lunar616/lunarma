import { BaseStrategy } from '@/modules/prose-mirror/services/node/strategy/Base.strategy';

import type { EditorView } from 'prosemirror-view';
import type { NodeStrategy } from '@/modules/prose-mirror/services/node/strategy/index.interfaces';

class UserLinkStrategy extends BaseStrategy implements NodeStrategy {
	static check() {
		return (view: EditorView) => {
			const { state } = view;
			const resolvedFrom = state.doc.resolve(state.selection.$from.pos);
			const nodeTextBeforeCaret = state.doc
				.slice(
					resolvedFrom.pos - resolvedFrom.parentOffset, 
					resolvedFrom.pos,
				)
				// @ts-ignore
				.content.content.slice(-1)?.[0]?.text;

			if (nodeTextBeforeCaret?.includes('@')) {
				const userLogin = nodeTextBeforeCaret
					.split('@')
					.slice(-1)
					.toString();
				
				return {
					hasTrigger: true,
					login: userLogin,
				};
			}

			return {
				hasTrigger: false,
				login: '',
			};
		}
	}
	
	public isEnabled() {
		return () => true;
	}
}

export {
	UserLinkStrategy,
}
