import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from '../../ui/select/Select';
import clsx from 'clsx';
import { RadioGroup } from '../../ui/radio-group/RadioGroup';
import { CSSProperties } from 'react';
import {
	fontSizeOptions,
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';
import { Separator } from '../../ui/separator/Separator';
import { Text } from '../../ui/text/Text';

import styles from './ArticleParamsForm.module.scss';
import { useClose } from 'src/hooks/useClose';

export const ArticleParamsForm = ({
	onApply,
}: {
	onApply: (styles: CSSProperties) => void;
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement | null>(null);
	const handleToggle = () => {
		setIsMenuOpen((previousState) => !previousState);
	};

	useClose({
		isOpen: isMenuOpen,
		onClose: () => setIsMenuOpen(false),
		rootRef: sidebarRef,
	});

	const [selectedFontFamily, setSelectedFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [selectedColorFont, setSelectedColorFont] = useState(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [selectedWidthContact, setSelectedWidthContact] = useState(
		defaultArticleState.contentWidth
	);

	const handleReset = () => {
		setSelectedFontFamily(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedColorFont(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedWidthContact(defaultArticleState.contentWidth);

		onApply({
			'--font-family': defaultArticleState.fontFamilyOption.value,
			'--font-size': defaultArticleState.fontSizeOption.value,
			'--font-color': defaultArticleState.fontColor.value,
			'--bg-color': defaultArticleState.backgroundColor.value,
			'--container-width': defaultArticleState.contentWidth.value,
		} as CSSProperties);
	};

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		const styles = {
			'--font-family': selectedFontFamily.value,
			'--font-size': selectedFontSize.value,
			'--font-color': selectedColorFont.value,
			'--bg-color': selectedBackgroundColor.value,
			'--container-width': selectedWidthContact.value,
		} as React.CSSProperties;
		onApply(styles);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleToggle} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={handleApply}>
					<div className={styles.optionsContainer}>
						<Text
							as={'h2'}
							size={31}
							weight={800}
							children='Задайте параметры'
						/>
						<Select
							selected={selectedFontFamily}
							options={fontFamilyOptions}
							onChange={(opt) => setSelectedFontFamily(opt)}
							title='шрифт'
						/>
						<RadioGroup
							options={fontSizeOptions}
							selected={selectedFontSize}
							onChange={(opt) => setSelectedFontSize(opt)}
							name='fontSize'
							title='Размер шрифта'
						/>
						<Select
							selected={selectedColorFont}
							options={fontColors}
							onChange={(opt) => setSelectedColorFont(opt)}
							title='цвет шрифта'
						/>
						<Separator />
						<Select
							selected={selectedBackgroundColor}
							options={backgroundColors}
							onChange={(opt) => setSelectedBackgroundColor(opt)}
							title='цвет фона'
						/>
						<Select
							selected={selectedWidthContact}
							options={contentWidthArr}
							onChange={(opt) => setSelectedWidthContact(opt)}
							title='ширина контента'
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
