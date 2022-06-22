import { ref } from 'vue';
import dayjs from 'dayjs';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { undo, redo, history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { InputRule, inputRules } from 'prosemirror-inputrules';

import { plugin } from '../node/strategy/Files.strategy';

import schema from '@/modules/prose-mirror/schema';
import nodes from '@/modules/prose-mirror/nodes';

import type { EditorServiceConstructorProps } from '@/modules/prose-mirror/services/editor/editor.service.d';
import type { NodeBuilderItem } from '@/modules/prose-mirror/services/node/builder/node.builder.interfaces';

dayjs.locale('ru');

class EditorService {
	public view: EditorView;
	public key = ref(0);
	public lastUpdate: any = ref(0);
	
	public constructor(config: EditorServiceConstructorProps) {
		const plugins = [
			history(),
			keymap({
				'Mod-z': undo,
				'Mod-y': redo,
			}),

			...nodes.reduce((result: Plugin[], node: NodeBuilderItem) => {
				if (node.plugin) {
					result.push(node.plugin);
				}

				return result;
			}, [] as Plugin[]),

			keymap(baseKeymap),
			inputRules({
				rules: nodes.reduce((result: InputRule[], node: NodeBuilderItem) => {
					if (node.presets && node.presets instanceof Array) {
						node.presets.forEach(preset => {
							if (!preset.input) {
								return null;
							}

							result.push(preset.input.rule(schema.nodes[node.name]));
						});
					} else if (node.presets?.input) {
						result.push(node.presets.input.rule(schema.nodes[node.name]));
					}
					
					return result;
				}, [] as InputRule[]),
			}),

			plugin,
		];

		const state = config.initialData?.note
			?	EditorState.fromJSON(
					{
						schema,
						plugins,
					},
					config.initialData.note,
				)
			: EditorState.create({
					schema,
					plugins,
				});

		const $this = this;
		this.view = new EditorView(config.target, {
			state: state,
			nodeViews: nodes.reduce((result: Record<string, any>, node: NodeBuilderItem) => {
				if (node.name && node.nodeView) {
					result[node.name] = node.nodeView;
				}

				return result;
			}, {} as Record<string, any>),

			dispatchTransaction(transaction: any): void {
				$this.lastUpdate.value = dayjs().toDate();
				const newState = this.state.apply(transaction);
				// @ts-ignore
				this.updateState(newState);
				$this.key.value += 1;

				if (config.update) {
					config.update(this.state.toJSON());
				} 
			},
		});
		this.view.focus();
	};
}

export {
	EditorService,
}
