import doc from '@/modules/prose-mirror/nodes/doc';
import text from '@/modules/prose-mirror/nodes/text';
import paragraph from '@/modules/prose-mirror/nodes/paragraph';
import h from '@/modules/prose-mirror/nodes/h';
import hr from '@/modules/prose-mirror/nodes/hr';
import youtubeLink from '@/modules/prose-mirror/nodes/youtube-link';
import videoPlayer from '@/modules/prose-mirror/nodes/video-player';
import ul from '@/modules/prose-mirror/nodes/ul';
import ol from '@/modules/prose-mirror/nodes/ol';
import li from '@/modules/prose-mirror/nodes/li';
import table from '@/modules/prose-mirror/nodes/table';
import td from '@/modules/prose-mirror/nodes/td';
import tr from '@/modules/prose-mirror/nodes/tr';
import file from '@/modules/prose-mirror/nodes/file';

import type { NodeBuilderItem } from '@/modules/prose-mirror/services/node/builder/node.builder.interfaces';

const nodes: NodeBuilderItem[] = [
	doc,
	text,
	paragraph,
	h,
	hr,
	youtubeLink,
	videoPlayer,
	ul,
	ol,
	li,
	table,
	td,
	tr,
	file,
];

export default nodes;
