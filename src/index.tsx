import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export type CustomCSSProperties = CSSProperties & {
	'--font-family'?: string;
	'--font-size'?: string;
	'--font-color'?: string;
	'--bg-color'?: string;
	'--container-width'?: string;
};

const App = () => {
	const [articleStyles, setArticleStyles] = useState<CustomCSSProperties>({
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	});

	return (
		<main className={clsx(styles.main)} style={articleStyles}>
			<ArticleParamsForm onApply={setArticleStyles} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
