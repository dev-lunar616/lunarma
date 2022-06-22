import { bold } from '@/modules/prose-mirror/marks/bold';
import { italic } from '@/modules/prose-mirror/marks/italic';
import { underline } from '@/modules/prose-mirror/marks/underline';
import { stroke } from '@/modules/prose-mirror/marks/stroke';

import type { MarkBuilder } from '@/modules/prose-mirror/services/mark/builder/Mark.builder';

const marks: MarkBuilder[] = [
	bold,
	italic,
	underline,
	stroke,
];

export default marks;
