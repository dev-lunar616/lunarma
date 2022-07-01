import { doc } from '@/modules/prose-mirror/nodes/doc';
import { text } from '@/modules/prose-mirror/nodes/text';
import { paragraph } from '@/modules/prose-mirror/nodes/paragraph';
import { h } from '@/modules/prose-mirror/nodes/h';
import { hr } from '@/modules/prose-mirror/nodes/hr';
import { youtube_link } from '@/modules/prose-mirror/nodes/youtube-link';
import { video_player } from '@/modules/prose-mirror/nodes/video-player';
import { ul } from '@/modules/prose-mirror/nodes/ul';
import { ol } from '@/modules/prose-mirror/nodes/ol';
import { li } from '@/modules/prose-mirror/nodes/li';
import { table } from '@/modules/prose-mirror/nodes/table';
import { td } from '@/modules/prose-mirror/nodes/td';
import { tr } from '@/modules/prose-mirror/nodes/tr';
import { file } from '@/modules/prose-mirror/nodes/file';
import { user_link } from '@/modules/prose-mirror/nodes/user-link'

import type { NodeBuilderItem } from '@/modules/prose-mirror/services/node/builder/node.builder.interfaces';

const nodes: NodeBuilderItem[] = [
	doc,
	text,
	paragraph,
	h,
	hr,
	youtube_link,
	video_player,
	ul,
	ol,
	li,
	table,
	td,
	tr,
	file,
	user_link,
];

export default nodes;
