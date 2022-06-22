import { toggleMark } from 'prosemirror-commands';

import type { EditorView } from 'prosemirror-view';
import type { EditorState, Transaction } from 'prosemirror-state';
import type { MarkType } from 'prosemirror-model';

class MarkService {
	public static add(
		type: MarkType, 
		attributes: object = {},
	): (state: EditorState) => Transaction {
		return (state: EditorState): Transaction => {
			const resolvedFrom = state.doc.resolve(state.selection.$from.pos);
			const resolvedTo = state.doc.resolve(state.selection.$to.pos);

			const transaction = state.tr;
			transaction.addMark(
				resolvedFrom.pos, 
				resolvedTo.pos, 
				type.create(attributes),
			);

			return transaction;
		};
	}

	public static remove(
		type: MarkType,
	): (state: EditorState) => Transaction {
		return (state: EditorState): Transaction => {
			const resolvedFrom = state.doc.resolve(state.selection.$from.pos);
			const resolvedTo = state.doc.resolve(state.selection.$to.pos);

			const transaction = state.tr;
			transaction.removeMark(
				resolvedFrom.pos, 
				resolvedTo.pos, 
				type,
			);

			return transaction;
		};
	}

	public static toggle(
		type: MarkType,
	): (view: EditorView) => boolean {
		return (view: EditorView): boolean => (
			toggleMark(type)(view.state, view.dispatch)
		);
	}

	public static isEnabled(
		type: MarkType,
	): (view: EditorView) => boolean {
		return (view: EditorView): boolean => (
			toggleMark(type)(view.state)
		);
	}

	public static isMarked(
		type: MarkType,
	): (view: EditorView) => boolean {
		return (view: EditorView): boolean => {
			const { state } = view;
			const resolvedFrom = state.doc.resolve(state.selection.$from.pos);
			const resolvedTo = state.doc.resolve(state.selection.$to.pos);

			return state.selection.empty
				? Boolean(type.isInSet(
						state.storedMarks
						|| resolvedFrom.marks()
					))
				: state.doc.rangeHasMark(
						resolvedFrom.pos, 
						resolvedTo.pos, 
						type,
					);
		};
	}
}

export {
	MarkService,
}
