import clsx from 'clsx';

import { CSSProperties, useState } from 'react';
import { Article } from './article/Article';
import { ArticleParamsForm } from './article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../constants/articleProps';

import styles from '../styles/index.module.scss';

const defaultStyles = {
	'--font-family': defaultArticleState.fontFamilyOption.value,
	'--font-size': defaultArticleState.fontSizeOption.value,
	'--font-color': defaultArticleState.fontColor.value,
	'--container-width': defaultArticleState.contentWidth.value,
	'--bg-color': defaultArticleState.backgroundColor.value,
} as CSSProperties;

const App = () => {
	const [articleStyles, setArticleStyles] = useState(defaultStyles);

	return (
		<main className={clsx(styles.main)} style={articleStyles}>
			<ArticleParamsForm
				onApply={(newStyles) =>
					setArticleStyles((prev) => ({ ...prev, ...newStyles }))
				}
			/>
			<Article />
		</main>
	);
};

export default App;
